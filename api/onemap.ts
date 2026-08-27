import { Router, Request, Response } from 'express';

const router = Router();

interface OneMapTokenCache {
  token: string | null;
  expiresAt: number;
}

let tokenCache: OneMapTokenCache = {
  token: null,
  expiresAt: 0,
};

/**
 * Validates whether OneMap credentials are configured via environment variables
 */
function hasOneMapCredentials(): boolean {
  const directToken = process.env.ONEMAP_TOKEN;
  if (directToken && directToken.trim() !== '') {
    return true;
  }

  const email = process.env.ONEMAP_EMAIL;
  const password = process.env.ONEMAP_PASSWORD;
  return Boolean(email && email.trim() !== '' && password && password.trim() !== '');
}

/**
 * Obtains a valid OneMap token (minting via POST /getToken or using cached/direct token)
 */
async function getOneMapToken(): Promise<string> {
  // If a direct token is provided via env, prefer it
  const directToken = process.env.ONEMAP_TOKEN;
  if (directToken && directToken.trim() !== '') {
    return directToken.trim();
  }

  const email = process.env.ONEMAP_EMAIL;
  const password = process.env.ONEMAP_PASSWORD;

  if (!email || email.trim() === '' || !password || password.trim() === '') {
    throw new Error('CREDENTIAL_NOT_CONFIGURED');
  }

  // Check if existing token is valid (lasts 3 days / 72 hours; keep a 2-hour buffer)
  const now = Date.now();
  if (tokenCache.token && tokenCache.expiresAt > now + 2 * 60 * 60 * 1000) {
    return tokenCache.token;
  }

  // Mint new token: POST https://www.onemap.gov.sg/api/auth/post/getToken
  const tokenUrl = 'https://www.onemap.gov.sg/api/auth/post/getToken';
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'PropRadius-Service/1.0',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim(),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`OneMap Token minting returned HTTP ${response.status}: ${errText || response.statusText}`);
  }

  const data = await response.json();
  const accessToken = data.access_token || data.token || data.Result;

  if (!accessToken) {
    throw new Error(`OneMap Token response missing access_token: ${JSON.stringify(data)}`);
  }

  // Default expiry 3 days (72 hours) if not provided by response
  let expiryTime = now + 72 * 60 * 60 * 1000;
  if (data.expiry_timestamp) {
    const parsed = Number(data.expiry_timestamp) * 1000;
    if (!isNaN(parsed) && parsed > now) {
      expiryTime = parsed;
    }
  }

  tokenCache = {
    token: accessToken,
    expiresAt: expiryTime,
  };

  return accessToken;
}

/**
 * GET /api/onemap/status
 * Check configuration status without exposing credentials
 */
router.get('/status', (req: Request, res: Response) => {
  const configured = hasOneMapCredentials();
  res.json({
    configured,
    hasActiveToken: Boolean(tokenCache.token && tokenCache.expiresAt > Date.now()),
    serviceEndpoints: {
      getToken: 'https://www.onemap.gov.sg/api/auth/post/getToken',
      search: 'https://www.onemap.gov.sg/api/common/elastic/search',
      revgeocode: 'https://www.onemap.gov.sg/api/public/revgeocode',
      route: 'https://www.onemap.gov.sg/api/public/routingsvc/route',
    },
  });
});

/**
 * GET /api/onemap/token
 * Obtain or refresh today's active token
 */
router.get('/token', async (req: Request, res: Response) => {
  if (!hasOneMapCredentials()) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await getOneMapToken();
    return res.json({
      status: 'Success',
      tokenActive: true,
      tokenPreview: `${token.slice(0, 6)}...${token.slice(-4)}`,
      expiresAt: new Date(tokenCache.expiresAt).toISOString(),
    });
  } catch (err: any) {
    if (err.message === 'CREDENTIAL_NOT_CONFIGURED') {
      return res.status(500).json({ error: 'credential not configured' });
    }
    return res.status(502).json({
      error: 'Failed to mint token from OneMap API',
      details: err.message,
    });
  }
});

/**
 * GET /api/onemap/search
 * Geocode / search (Authorization header required)
 * Query: searchVal, returnGeom, getAddrDetails, pageNum
 */
router.get('/search', async (req: Request, res: Response) => {
  if (!hasOneMapCredentials()) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  const searchVal = req.query.searchVal as string;
  if (!searchVal || searchVal.trim() === '') {
    return res.status(400).json({ error: 'searchVal query parameter is required' });
  }

  try {
    const token = await getOneMapToken();
    const returnGeom = (req.query.returnGeom as string) || 'Y';
    const getAddrDetails = (req.query.getAddrDetails as string) || 'Y';
    const pageNum = (req.query.pageNum as string) || '1';

    const params = new URLSearchParams({
      searchVal: searchVal.trim(),
      returnGeom,
      getAddrDetails,
      pageNum,
    });

    const url = `https://www.onemap.gov.sg/api/common/elastic/search?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `OneMap Search API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'CREDENTIAL_NOT_CONFIGURED') {
      return res.status(500).json({ error: 'credential not configured' });
    }
    return res.status(502).json({
      error: 'Failed to execute OneMap search request',
      details: err.message,
    });
  }
});

/**
 * GET /api/onemap/revgeocode
 * Reverse geocode (Authorization header required)
 * Query: location (lat,lng), buffer (meters), addressType (All | HDB | etc), otherFeatures
 */
router.get('/revgeocode', async (req: Request, res: Response) => {
  if (!hasOneMapCredentials()) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  const location = req.query.location as string;
  if (!location || location.trim() === '') {
    return res.status(400).json({ error: 'location query parameter (lat,lng) is required' });
  }

  try {
    const token = await getOneMapToken();
    const buffer = (req.query.buffer as string) || '40';
    const addressType = (req.query.addressType as string) || 'All';
    const otherFeatures = (req.query.otherFeatures as string) || 'N';

    const params = new URLSearchParams({
      location: location.trim(),
      buffer,
      addressType,
      otherFeatures,
    });

    const url = `https://www.onemap.gov.sg/api/public/revgeocode?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `OneMap RevGeocode API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'CREDENTIAL_NOT_CONFIGURED') {
      return res.status(500).json({ error: 'credential not configured' });
    }
    return res.status(502).json({
      error: 'Failed to execute OneMap reverse geocode request',
      details: err.message,
    });
  }
});

/**
 * GET /api/onemap/route
 * Routing: walk | drive | cycle | pt (Authorization header required)
 * Query: start (lat,lng), end (lat,lng), routeType (walk | drive | cycle | pt), mode, date, time
 */
router.get('/route', async (req: Request, res: Response) => {
  if (!hasOneMapCredentials()) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  const start = req.query.start as string;
  const end = req.query.end as string;
  const routeType = (req.query.routeType as string) || 'walk';

  if (!start || !end) {
    return res.status(400).json({ error: 'start and end query parameters (lat,lng) are required' });
  }

  const validRouteTypes = ['walk', 'drive', 'cycle', 'pt'];
  if (!validRouteTypes.includes(routeType.toLowerCase())) {
    return res.status(400).json({ error: `routeType must be one of: ${validRouteTypes.join(', ')}` });
  }

  try {
    const token = await getOneMapToken();
    const params = new URLSearchParams({
      start: start.trim(),
      end: end.trim(),
      routeType: routeType.toLowerCase(),
    });

    if (req.query.mode) params.set('mode', req.query.mode as string);
    if (req.query.date) params.set('date', req.query.date as string);
    if (req.query.time) params.set('time', req.query.time as string);
    if (req.query.maxWalkDistance) params.set('maxWalkDistance', req.query.maxWalkDistance as string);

    const url = `https://www.onemap.gov.sg/api/public/routingsvc/route?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `OneMap Routing API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'CREDENTIAL_NOT_CONFIGURED') {
      return res.status(500).json({ error: 'credential not configured' });
    }
    return res.status(502).json({
      error: 'Failed to execute OneMap routing request',
      details: err.message,
    });
  }
});

export default router;
