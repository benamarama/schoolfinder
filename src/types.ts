export type PropertyType = 'All' | 'Private' | 'HDB' | 'Landed' | 'Executive Condo';

export interface SchoolProximity {
  school: string;
  distance: string;
  psf: number;
}

export interface RecentTransaction {
  block: string;
  type: string;
  price: number;
  date: string;
  psf?: number;
}

export interface HistoricalDataPoint {
  year: string;
  psf: number;
  volume: number;
  avgRent?: number;
}

export interface AgentInfo {
  name: string;
  title: string;
  agency: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  dealsClosed: number;
  ceaRegNo?: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  price: number;
  psf: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'HDB' | 'Private' | 'Landed' | 'Executive Condo';
  subCategory?: string; // e.g. "5-Room Premium", "3-Bedroom Condo"
  tenure: string; // e.g. "Freehold", "99-year Leasehold", "72 years left"
  isNewLaunch?: boolean;
  isProfessionalPick?: boolean;
  isFreehold?: boolean;
  
  // School filter info
  schoolName: string;
  distanceToSchool: string;
  distanceKm: number;
  
  // Detailed metadata
  image: string;
  galleryImages: string[];
  hdbTown?: string;
  flatType?: string;
  leaseStartYear?: number;
  remainingLeaseYears?: number;
  
  // Proximity to Top Schools
  schoolsProximity: SchoolProximity[];
  
  // Location
  locationName: string;
  mapImage?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Transactions
  recentTransactions: RecentTransaction[];
  
  // Market intelligence
  marketInsights: {
    professionalInsight: string;
    askingPsf: number;
    recentAvgPsf: number;
    diffPercent: number;
    historicalTrend: HistoricalDataPoint[];
  };
  
  // Description & Features
  description: string;
  facilities: string[];
  
  // Agent
  agent: AgentInfo;
}

export interface FilterState {
  propertyType: 'All' | 'Private' | 'HDB';
  proximity: string; // 'All' | 'Within 1km' | 'Within 2km'
  bedrooms: string; // 'All' | '2+' | '3+' | '4+'
  minPrice: number;
  maxPrice: number;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'psf_asc' | 'psf_desc' | 'distance';
  selectedSchool: string;
  tenureType: 'All' | 'Freehold' | '99-year';
}
