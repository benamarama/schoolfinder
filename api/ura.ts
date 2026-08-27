import { Router, Request, Response } from 'express';

const router = Router();

// In-memory daily token cache to prevent spamming insertNewToken
interface TokenCache {
  token: string | null;
  fetchedAt: number;
  dateKey: string;
}

let tokenCache: TokenCache = {
  token: null,
  fetchedAt: 0,
  dateKey: '',
};

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Validates and retrieves the URA AccessKey from process.env inside api/
 */
function getUraAccessKey(): string | null {
  const key = process.env.URA_ACCESS_KEY || process.env.URA_API_KEY;
  if (!key || key.trim() === '') {
    return null;
  }
  return key.trim();
}

/**
 * Exchanges AccessKey for daily Token via URA DataService endpoint:
 * https://eservice.ura.gov.sg/uraDataService/insertNewToken/v1
 */
async function fetchDailyUraToken(accessKey: string): Promise<string> {
  const todayKey = getTodayKey();

  // Return cached token if valid for today (tokens are issued per calendar day)
  if (tokenCache.token && tokenCache.dateKey === todayKey && Date.now() - tokenCache.fetchedAt < 20 * 60 * 60 * 1000) {
    return tokenCache.token;
  }

  const tokenUrl = 'https://eservice.ura.gov.sg/uraDataService/insertNewToken/v1';
  const response = await fetch(tokenUrl, {
    method: 'GET',
    headers: {
      'AccessKey': accessKey,
      'User-Agent': 'PropRadius-Service/1.0',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`URA Token API returned HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.Status !== 'Success' || !data.Result) {
    throw new Error(`Failed to obtain URA Token: ${data.Message || JSON.stringify(data)}`);
  }

  tokenCache = {
    token: data.Result,
    fetchedAt: Date.now(),
    dateKey: todayKey,
  };

  return data.Result;
}

/**
 * GET /api/ura/status
 * Check configuration status without exposing credentials
 */
router.get('/status', (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  res.json({
    configured: Boolean(accessKey),
    hasActiveToken: Boolean(tokenCache.token && tokenCache.dateKey === getTodayKey()),
    serviceEndpoints: {
      token: 'https://eservice.ura.gov.sg/uraDataService/insertNewToken/v1',
      transactions: 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=PMI_Resi_Transaction',
      carparkAvailability: 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Availability',
      carparkDetails: 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Details',
    },
  });
});

/**
 * GET /api/ura/token
 * Obtain or refresh today's active token
 */
router.get('/token', async (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  if (!accessKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await fetchDailyUraToken(accessKey);
    return res.json({
      status: 'Success',
      tokenDate: getTodayKey(),
      tokenActive: true,
      tokenPreview: `${token.slice(0, 4)}...${token.slice(-4)}`,
    });
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to trade AccessKey for URA Token',
      details: err.message,
    });
  }
});

/**
 * GET /api/ura/transactions
 * Fetch Private Residential Transactions (PMI_Resi_Transaction).
 * Supports fetching a single batch (1-4) or automatically fetching and merging all 4 batches.
 */
router.get('/transactions', async (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  if (!accessKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await fetchDailyUraToken(accessKey);
    const requestedBatch = req.query.batch ? Number(req.query.batch) : null;

    if (requestedBatch && requestedBatch >= 1 && requestedBatch <= 4) {
      const url = `https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=PMI_Resi_Transaction&batch=${requestedBatch}`;
      const response = await fetch(url, {
        headers: {
          'AccessKey': accessKey,
          'Token': token,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `URA API error: ${response.statusText}` });
      }

      const data = await response.json();
      return res.json(data);
    }

    // Default: Fetch all 4 batches concurrently and merge
    const batchNumbers = [1, 2, 3, 4];
    const fetchPromises = batchNumbers.map(async (batch) => {
      const url = `https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=PMI_Resi_Transaction&batch=${batch}`;
      const response = await fetch(url, {
        headers: {
          'AccessKey': accessKey,
          'Token': token,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Batch ${batch} request failed with HTTP ${response.status}`);
      }

      return response.json();
    });

    const results = await Promise.allSettled(fetchPromises);
    const mergedResults: any[] = [];
    let successfulBatches = 0;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled') {
        successfulBatches++;
        const batchData = result.value;
        if (Array.isArray(batchData.Result)) {
          mergedResults.push(...batchData.Result);
        }
      }
    }

    return res.json({
      Status: 'Success',
      totalBatches: 4,
      successfulBatches,
      count: mergedResults.length,
      Result: mergedResults,
    });
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to fetch residential transactions from URA DataService',
      details: err.message,
    });
  }
});

/**
 * GET /api/ura/carpark-availability
 * Live Carpark Lot Availability (Car_Park_Availability)
 */
router.get('/carpark-availability', async (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  if (!accessKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await fetchDailyUraToken(accessKey);
    const url = 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Availability';
    const response = await fetch(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `URA API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to fetch carpark availability from URA DataService',
      details: err.message,
    });
  }
});

/**
 * GET /api/ura/carpark-details
 * Carpark Details and Pricing Rates (Car_Park_Details)
 */
router.get('/carpark-details', async (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  if (!accessKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await fetchDailyUraToken(accessKey);
    const url = 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Details';
    const response = await fetch(url, {
      headers: {
        'AccessKey': accessKey,
        'Token': token,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `URA API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to fetch carpark details from URA DataService',
      details: err.message,
    });
  }
});

/**
 * GET /api/ura/carparks
 * Combined endpoint: Fetches both live lots and pricing details, then merges them
 */
router.get('/carparks', async (req: Request, res: Response) => {
  const accessKey = getUraAccessKey();
  if (!accessKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  try {
    const token = await fetchDailyUraToken(accessKey);

    const [availRes, detailsRes] = await Promise.all([
      fetch('https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Availability', {
        headers: { 'AccessKey': accessKey, 'Token': token, 'Accept': 'application/json' },
      }),
      fetch('https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Details', {
        headers: { 'AccessKey': accessKey, 'Token': token, 'Accept': 'application/json' },
      }),
    ]);

    const availData = availRes.ok ? await availRes.json() : { Result: [] };
    const detailsData = detailsRes.ok ? await detailsRes.json() : { Result: [] };

    const availMap = new Map<string, any>();
    if (Array.isArray(availData.Result)) {
      for (const item of availData.Result) {
        const id = item.carparkNo || item.ppCode || item.carpark;
        if (id) availMap.set(String(id).toUpperCase(), item);
      }
    }

    const mergedList: any[] = [];
    if (Array.isArray(detailsData.Result)) {
      for (const detail of detailsData.Result) {
        const id = String(detail.ppCode || detail.carparkNo || '').toUpperCase();
        const liveAvail = availMap.get(id);
        mergedList.push({
          ...detail,
          liveLots: liveAvail ? liveAvail.lotsAvailable : undefined,
          lotType: liveAvail ? liveAvail.lotType : detail.vehCat,
          availabilityUpdated: liveAvail ? liveAvail.timestamp : undefined,
        });
      }
    }

    return res.json({
      Status: 'Success',
      count: mergedList.length,
      Result: mergedList,
    });
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to fetch combined carpark data from URA DataService',
      details: err.message,
    });
  }
});

export default router;
