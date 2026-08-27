export interface MapsGroundingLink {
  title: string;
  uri: string;
  address?: string;
  rating?: number;
  reviewSnippets?: string[];
}

export interface SearchGroundingLink {
  title: string;
  uri: string;
}

export interface MapsGroundingResult {
  text: string;
  mapsGrounding: MapsGroundingLink[];
  searchQueries?: string[];
  timestamp: string;
  error?: string;
}

export interface SearchGroundingResult {
  text: string;
  webGrounding: SearchGroundingLink[];
  searchQueries?: string[];
  timestamp: string;
  error?: string;
}

/**
 * Calls the backend Gemini Maps Grounding service to get live Google Maps places & amenities
 */
export async function getMapsGroundingIntelligence(params: {
  prompt: string;
  location?: { latitude: number; longitude: number };
  schoolName?: string;
  propertyTitle?: string;
}): Promise<MapsGroundingResult> {
  try {
    const res = await fetch('/api/gemini/maps-grounding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.warn('Maps Grounding service error:', error);
    return {
      text: 'Could not fetch live Google Maps data at this time.',
      mapsGrounding: [],
      timestamp: new Date().toISOString(),
      error: error.message || 'Service unavailable',
    };
  }
}

/**
 * Calls the backend Gemini Search Grounding service to get live Google Search MOE P1 & market news data
 */
export async function getSearchGroundingIntelligence(params: {
  prompt: string;
  schoolName?: string;
  district?: string;
  topic?: 'p1_balloting' | 'market_trends' | 'master_plan' | 'general';
}): Promise<SearchGroundingResult> {
  try {
    const res = await fetch('/api/gemini/search-grounding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.warn('Search Grounding service error:', error);
    return {
      text: 'Could not fetch live Google Search data at this time.',
      webGrounding: [],
      timestamp: new Date().toISOString(),
      error: error.message || 'Service unavailable',
    };
  }
}
