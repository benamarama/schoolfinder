export interface UraStatusResponse {
  configured: boolean;
  hasActiveToken: boolean;
  serviceEndpoints: {
    token: string;
    transactions: string;
    carparkAvailability: string;
    carparkDetails: string;
  };
}

export interface UraTransactionItem {
  project?: string;
  street?: string;
  x?: string;
  y?: string;
  transaction?: Array<{
    area: string;
    floorRange: string;
    noOfUnits: string;
    contractDate: string;
    typeOfSale: string;
    price: string;
    propertyType: string;
    district: string;
    typeOfArea: string;
    tenure: string;
    nettPrice?: string;
  }>;
}

export interface UraCarparkItem {
  ppCode?: string;
  carparkNo?: string;
  ppName?: string;
  geometries?: Array<{ coordinates: string }>;
  vehCat?: string;
  min?: string;
  startTime?: string;
  endTime?: string;
  weekdayRate?: string;
  satdayRate?: string;
  sunPHRate?: string;
  parkingSystem?: string;
  parkCapacity?: number;
  liveLots?: string | number;
  lotType?: string;
  availabilityUpdated?: string;
}

/**
 * Checks backend status for URA API integration
 */
export async function getUraBackendStatus(): Promise<UraStatusResponse | null> {
  try {
    const res = await fetch('/api/ura/status');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetches residential transactions from URA DataService (PMI_Resi_Transaction)
 */
export async function getUraResidentialTransactions(batch?: number): Promise<{
  Status: string;
  count: number;
  Result: UraTransactionItem[];
} | null> {
  try {
    const url = batch ? `/api/ura/transactions?batch=${batch}` : '/api/ura/transactions';
    const res = await fetch(url);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('URA Transactions API notice:', errData.error || res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to call URA transactions endpoint:', e);
    return null;
  }
}

/**
 * Fetches combined Carpark lot availability & rate details from URA DataService
 */
export async function getUraCarparks(): Promise<{
  Status: string;
  count: number;
  Result: UraCarparkItem[];
} | null> {
  try {
    const res = await fetch('/api/ura/carparks');
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('URA Carparks API notice:', errData.error || res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('Failed to call URA carparks endpoint:', e);
    return null;
  }
}
