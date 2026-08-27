export interface OneMapStatusResponse {
  configured: boolean;
  hasActiveToken: boolean;
  serviceEndpoints: {
    getToken: string;
    search: string;
    revgeocode: string;
    route: string;
  };
}

export interface OneMapSearchResultItem {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface OneMapSearchResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: OneMapSearchResultItem[];
}

export interface OneMapRevGeocodeResponse {
  GeocodeInfo?: Array<{
    BUILDINGNAME?: string;
    BLOCK?: string;
    ROAD?: string;
    POSTALCODE?: string;
    X?: string;
    Y?: string;
    LATITUDE?: string;
    LONGITUDE?: string;
  }>;
}

export interface OneMapRouteResponse {
  status_message?: string;
  route_summary?: {
    total_time?: number;
    total_distance?: number;
    start_point?: string;
    end_point?: string;
  };
  route_geometry?: string;
  route_instructions?: any[];
  [key: string]: any;
}

/**
 * Checks backend status for OneMap API integration
 */
export async function getOneMapBackendStatus(): Promise<OneMapStatusResponse | null> {
  try {
    const res = await fetch('/api/onemap/status');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Executes a location/address search via OneMap API
 */
export async function searchOneMap(
  searchVal: string,
  options?: { returnGeom?: 'Y' | 'N'; getAddrDetails?: 'Y' | 'N'; pageNum?: number }
): Promise<OneMapSearchResponse | null> {
  try {
    const params = new URLSearchParams({
      searchVal: searchVal.trim(),
      returnGeom: options?.returnGeom || 'Y',
      getAddrDetails: options?.getAddrDetails || 'Y',
      pageNum: String(options?.pageNum || 1),
    });

    const res = await fetch(`/api/onemap/search?${params.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('OneMap Search API notice:', errData.error || res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to call OneMap search endpoint:', e);
    return null;
  }
}

/**
 * Executes reverse geocoding via OneMap API
 */
export async function revGeocodeOneMap(
  lat: number | string,
  lng: number | string,
  buffer = 40
): Promise<OneMapRevGeocodeResponse | null> {
  try {
    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      buffer: String(buffer),
      addressType: 'All',
    });

    const res = await fetch(`/api/onemap/revgeocode?${params.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('OneMap RevGeocode API notice:', errData.error || res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to call OneMap revgeocode endpoint:', e);
    return null;
  }
}

/**
 * Calculates routing via OneMap public routing service
 */
export async function calculateOneMapRoute(
  startLat: number | string,
  startLng: number | string,
  endLat: number | string,
  endLng: number | string,
  routeType: 'walk' | 'drive' | 'cycle' | 'pt' = 'walk'
): Promise<OneMapRouteResponse | null> {
  try {
    const params = new URLSearchParams({
      start: `${startLat},${startLng}`,
      end: `${endLat},${endLng}`,
      routeType,
    });

    const res = await fetch(`/api/onemap/route?${params.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('OneMap Route API notice:', errData.error || res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to call OneMap route endpoint:', e);
    return null;
  }
}
