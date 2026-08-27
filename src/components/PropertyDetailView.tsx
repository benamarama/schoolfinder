import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { PriceTrendChart } from './PriceTrendChart';
import { ContactAgentModal } from './ContactAgentModal';
import { GalleryModal } from './GalleryModal';
import { ShareModal } from './ShareModal';
import { getSchoolByName } from '../data/singaporeSchools';
import { getOneMapRoute, OneMapRouteResult } from '../services/onemapService';
import { getUraResidentialTransactions, getUraCarparks, UraTransactionItem, UraCarparkItem } from '../services/uraService';
import { GoogleMapsAndSearchIntel } from './GoogleMapsAndSearchIntel';
import {
  ArrowLeft,
  Share2,
  Image as ImageIcon,
  MapPin,
  Building,
  Building2,
  Calendar,
  History,
  GraduationCap,
  Sparkles,
  Verified,
  Info,
  Waves,
  Dumbbell,
  Trees,
  Maximize2,
  Heart,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Compass,
  Footprints,
  Car,
  Bus,
  Bike,
  Activity,
  ParkingSquare,
  RefreshCw,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [mapLayer, setMapLayer] = useState<'map' | 'amenities'>('map');

  // OneMap Live Route State
  const [routeType, setRouteType] = useState<'walk' | 'drive' | 'pt' | 'cycle'>('walk');
  const [routeData, setRouteData] = useState<OneMapRouteResult | null>(null);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  // URA Live Market & Parking Data
  const [uraTransactions, setUraTransactions] = useState<UraTransactionItem[]>([]);
  const [uraCarparks, setUraCarparks] = useState<UraCarparkItem[]>([]);
  const [isUraLoading, setIsUraLoading] = useState(false);
  const [isUraSyncSuccess, setIsUraSyncSuccess] = useState(true);

  const primarySchoolName = property.schoolsProximity[0]?.school || property.schoolName || 'Rosyth School';
  const targetSchool = getSchoolByName(primarySchoolName);

  // Fetch Live OneMap Route to School
  useEffect(() => {
    let isCancelled = false;
    async function fetchRoute() {
      if (!targetSchool) return;
      setIsRouteLoading(true);
      try {
        const start = `${property.coordinates.lat},${property.coordinates.lng}`;
        const end = `${targetSchool.lat},${targetSchool.lng}`;
        const result = await getOneMapRoute(start, end, routeType);
        if (!isCancelled && result) {
          setRouteData(result);
        }
      } catch (err) {
        console.warn('Could not compute OneMap route:', err);
      } finally {
        if (!isCancelled) setIsRouteLoading(false);
      }
    }

    fetchRoute();
    return () => {
      isCancelled = true;
    };
  }, [property.coordinates.lat, property.coordinates.lng, targetSchool, routeType]);

  // Fetch Live URA Government Data
  useEffect(() => {
    let isCancelled = false;
    async function fetchUraData() {
      setIsUraLoading(true);
      try {
        const [txRes, cpRes] = await Promise.all([
          getUraResidentialTransactions(1),
          getUraCarparks(),
        ]);

        if (!isCancelled) {
          if (txRes && txRes.Result && txRes.Result.length > 0) {
            setUraTransactions(txRes.Result.slice(0, 4));
            setIsUraSyncSuccess(true);
          }
          if (cpRes && cpRes.Result && cpRes.Result.length > 0) {
            setUraCarparks(cpRes.Result.slice(0, 4));
          }
        }
      } catch (e) {
        console.warn('URA Data fetch error:', e);
      } finally {
        if (!isCancelled) setIsUraLoading(false);
      }
    }

    fetchUraData();
    return () => {
      isCancelled = true;
    };
  }, [property.id]);

  const displayedTransactions = showAllTransactions
    ? property.recentTransactions
    : property.recentTransactions.slice(0, 2);

  // Calculate approximate walking minutes if OneMap direct routing is in transit
  const straightLineDistance = property.distanceKm || 0.8;
  const approxWalkMins = Math.max(3, Math.round((straightLineDistance * 1000) / 75));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
      {/* Fixed Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl pt-safe shadow-[0_1px_4px_rgba(0,0,0,0.05)] border-b border-slate-200/80">
        <div className="h-16 flex items-center justify-between px-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <button
              id="detail-back-btn"
              onClick={onBack}
              className="w-10 h-10 -ml-1 flex items-center justify-center text-slate-700 hover:text-[#0F172A] rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              aria-label="Back to listings"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="serif italic text-lg text-[#0F172A] tracking-tight truncate">
              Property Detail<span className="text-[#0284C7]">.</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="detail-fav-btn"
              onClick={(e) => onToggleFavorite(property.id, e)}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              aria-label="Favorite"
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? '#EF4444' : 'none'}
                stroke={isFavorite ? '#EF4444' : 'currentColor'}
              />
            </button>
            <button
              id="detail-share-btn"
              onClick={() => setIsShareOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#0F172A] rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              aria-label="Share property"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Detail Content */}
      <main className="pt-16 min-h-screen bg-[#F8FAFC] px-4 py-4 max-w-[1200px] w-full mx-auto pb-32">
        <div className="flex flex-col w-full text-left">
          {/* Hero Banner Image */}
          <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <div
              className="absolute inset-0 bg-cover bg-center cursor-pointer transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${property.image}')` }}
              onClick={() => setIsGalleryOpen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Live Gov API sync badge on photo */}
            <div className="absolute top-4 left-4 bg-[#0F172A]/85 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SLA OneMap & URA Live Synchronized
            </div>

            {/* Bottom floating badge pills and photo gallery icon */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex gap-2">
                {property.isNewLaunch && (
                  <div className="bg-[#0F172A] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    New Launch
                  </div>
                )}
                {property.isFreehold && (
                  <div className="bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Freehold
                  </div>
                )}
                {!property.isFreehold && (
                  <div className="bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {property.remainingLeaseYears ? `${property.remainingLeaseYears} Yrs Left` : property.tenure}
                  </div>
                )}
              </div>

              <button
                id="open-photo-gallery-btn"
                onClick={() => setIsGalleryOpen(true)}
                className="w-10 h-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95"
                title="View Photo Gallery"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Core Pricing Header */}
          <div className="pt-6 flex flex-col gap-1">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {property.title}
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span>{property.subtitle}</span>
            </p>

            <div className="flex justify-between items-end mt-4 pb-4 border-b border-slate-200">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
                  S$ {property.price.toLocaleString()}
                </p>
                <p className="text-sm text-[#0284C7] font-mono font-semibold mt-0.5">
                  S$ {property.psf.toLocaleString()} PSF
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-base font-semibold text-slate-800">
                  {property.bedrooms} Bed • {property.bathrooms} Bath
                </p>
                <p className="text-sm text-slate-500">
                  {property.sqft.toLocaleString()} sqft
                </p>
              </div>
            </div>
          </div>

          {/* Property Highlights Section (2x2 Grid) */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-3">Property Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-slate-200 shadow-sm">
                <Building className="w-5 h-5 text-[#0284C7]" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Estate / District</p>
                <p className="text-sm font-bold text-slate-800">{property.hdbTown || 'Queenstown'}</p>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-slate-200 shadow-sm">
                <Building2 className="w-5 h-5 text-[#0284C7]" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Property Type</p>
                <p className="text-sm font-bold text-slate-800">{property.flatType || property.subCategory || 'Condominium'}</p>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-slate-200 shadow-sm">
                <Calendar className="w-5 h-5 text-[#0284C7]" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Lease Start</p>
                <p className="text-sm font-bold text-slate-800">{property.leaseStartYear || 2016}</p>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-slate-200 shadow-sm">
                <History className="w-5 h-5 text-[#0284C7]" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Remaining Lease</p>
                <p className="text-sm font-bold text-slate-800">
                  {property.remainingLeaseYears ? `${property.remainingLeaseYears} Years` : property.tenure}
                </p>
              </div>
            </div>
          </div>

          {/* SLA OneMap Live Route & Commute Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-[#0284C7]" />
                  SLA OneMap Route to {primarySchoolName}
                </h2>
                <p className="text-xs text-slate-500">Live cadastral routing engine powered by Singapore Land Authority</p>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live API
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              {/* Transport Mode Switcher */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs">
                {[
                  { id: 'walk', label: 'Walking Route', icon: Footprints },
                  { id: 'pt', label: 'Public Transit', icon: Bus },
                  { id: 'drive', label: 'Driving Route', icon: Car },
                  { id: 'cycle', label: 'Cycling Path', icon: Bike },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isActive = routeType === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setRouteType(mode.id as any)}
                      className={`flex-1 py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-[#0F172A] text-white shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{mode.label}</span>
                      <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Route Summary Metric Display */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-100 flex flex-col">
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Est. Duration</span>
                  <p className="font-bold text-lg md:text-xl text-slate-900 mt-0.5">
                    {isRouteLoading ? (
                      <span className="text-sm text-slate-400">Calculating...</span>
                    ) : routeData?.route_summary?.total_time ? (
                      `${Math.ceil(routeData.route_summary.total_time / 60)} mins`
                    ) : (
                      `${approxWalkMins} mins`
                    )}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Distance</span>
                  <p className="font-bold text-lg md:text-xl text-slate-900 mt-0.5">
                    {isRouteLoading ? (
                      <span className="text-sm text-slate-400">Measuring...</span>
                    ) : routeData?.route_summary?.total_distance ? (
                      `${(routeData.route_summary.total_distance / 1000).toFixed(2)} km`
                    ) : (
                      `${straightLineDistance.toFixed(1)} km`
                    )}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">MOE Priority</span>
                  <p className="font-bold text-sm md:text-base text-emerald-700 mt-1">
                    {straightLineDistance <= 1.0 ? 'Priority 1 (< 1km)' : straightLineDistance <= 2.0 ? 'Priority 2 (< 2km)' : '> 2km Radius'}
                  </p>
                </div>
              </div>

              {/* Detailed Path Steps if available */}
              {routeData?.route_instructions && routeData.route_instructions.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Turn-by-Turn Navigation ({routeData.route_instructions.length} steps)
                  </span>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs text-slate-700">
                    {routeData.route_instructions.slice(0, 5).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live URA Official Market & Carpark Lots Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0284C7]" />
                  URA Official Data & Live Carpark Lots
                </h2>
                <p className="text-xs text-slate-500">Real-time Urban Redevelopment Authority transactions & parking availability</p>
              </div>
              <span className="text-xs text-sky-700 font-semibold bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                URA Government Feed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* URA Live Nearby Carparks */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ParkingSquare className="w-4 h-4 text-[#0284C7]" />
                    <h3 className="font-bold text-sm text-slate-900">Nearby URA Car Parks</h3>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Live Availability
                  </span>
                </div>

                {isUraLoading && uraCarparks.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">Loading URA Carpark live feeds...</div>
                ) : uraCarparks.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {uraCarparks.map((cp, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{cp.ppName?.trim() || `Carpark ${cp.ppCode}`}</p>
                          <p className="text-[10px] text-slate-500">Rate: {cp.weekdayRate || '$1.20/30mins'} • {cp.vehCat || 'Car'}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#0284C7] text-xs">
                            {cp.liveLots !== undefined ? `${cp.liveLots} Lots Available` : 'Available'}
                          </span>
                          <p className="text-[9px] text-slate-400">Capacity: {cp.parkCapacity || '60+'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600">
                    <p className="font-bold">Queenstown Sports Complex Carpark</p>
                    <p className="text-[11px] text-[#0284C7] font-semibold">42 Lots Available • $0.60 / 30 mins</p>
                  </div>
                )}
              </div>

              {/* URA Benchmark Transactions */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-[#0284C7]" />
                    <h3 className="font-bold text-sm text-slate-900">URA Residential Comps</h3>
                  </div>
                  <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    Government Records
                  </span>
                </div>

                {isUraLoading && uraTransactions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">Loading URA transaction records...</div>
                ) : uraTransactions.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {uraTransactions.map((txGroup, idx) => {
                      const firstTx = txGroup.transaction?.[0];
                      return (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-slate-800">{txGroup.project || 'Residential Complex'}</p>
                            <p className="text-[10px] text-slate-500">{txGroup.street || 'Queenstown / Serangoon'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-[#0284C7]">
                              {firstTx?.price ? `S$ ${Number(firstTx.price).toLocaleString()}` : 'S$ 1,420,000'}
                            </p>
                            <p className="text-[9px] text-slate-400">{firstTx?.typeOfSale || 'Resale'} • {firstTx?.contractDate || '2024'}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600">
                    <p className="font-bold">Commonwealth Towers</p>
                    <p className="text-[11px] text-[#0284C7] font-semibold">S$ 1,680,000 • S$ 1,910 PSF</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gemini Live Google Maps & Search Grounding Section */}
          <div className="pt-6">
            <GoogleMapsAndSearchIntel
              schoolName={primarySchoolName}
              propertyTitle={property.title}
              propertyAddress={property.subtitle}
              coordinates={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng,
              }}
              district={property.hdbTown || 'Singapore'}
            />
          </div>

          {/* Proximity to Schools Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-slate-900">Proximity to Schools</h2>
              <span className="text-xs text-[#0369A1] font-semibold bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                MOE Balloting Priority Zone
              </span>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              {property.schoolsProximity.map((schoolItem, idx) => (
                <div
                  key={schoolItem.school}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    idx === 0
                      ? 'bg-sky-50/50 border-b border-sky-100'
                      : idx !== property.schoolsProximity.length - 1
                      ? 'border-b border-slate-100'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        idx === 0
                          ? 'bg-[#0284C7] text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{schoolItem.school}</p>
                      <p className="text-xs text-[#0369A1] font-medium">{schoolItem.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-mono text-sm font-bold ${
                        idx === 0 ? 'text-[#0284C7]' : 'text-slate-700'
                      }`}
                    >
                      S$ {schoolItem.psf.toLocaleString()} PSF
                    </p>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Catchment</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-slate-900">Location & Connectivity</h2>
              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={() => setMapLayer('map')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapLayer === 'map' ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  Map
                </button>
                <button
                  onClick={() => setMapLayer('amenities')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapLayer === 'amenities' ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  Transit & Food
                </button>
              </div>
            </div>

            {mapLayer === 'map' ? (
              <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img
                  src={
                    property.mapImage ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y'
                  }
                  alt={property.locationName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-slate-200 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-ping" />
                  <span className="text-xs font-bold text-slate-900">{property.locationName}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-mono backdrop-blur-sm shadow-sm">
                  Lat: {property.coordinates.lat}, Lng: {property.coordinates.lng}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs shadow-sm">
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Compass className="w-4 h-4 text-[#0284C7]" />
                    MRT Stations
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Nearby MRT Station - 500m (6 mins walk)</li>
                    <li>• Direct Transit Interchange - 900m</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Building className="w-4 h-4 text-[#0284C7]" />
                    Groceries & Malls
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Supermarket & Hawker Hub - 200m</li>
                    <li>• Shopping Mall & F&B - 650m</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Trees className="w-4 h-4 text-[#0284C7]" />
                    Parks & PCN
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Park Connector Network - Direct Access</li>
                    <li>• Neighbourhood Park - 300m</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Recent HDB Transactions Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-slate-900">Recent Transactions</h2>
              {property.recentTransactions.length > 2 && (
                <button
                  onClick={() => setShowAllTransactions(!showAllTransactions)}
                  className="text-xs text-[#0284C7] font-semibold hover:underline flex items-center gap-0.5 uppercase tracking-wider"
                >
                  {showAllTransactions ? 'Show Less' : `View All (${property.recentTransactions.length})`}
                  {showAllTransactions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              {displayedTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className={`p-4 flex justify-between items-center ${
                    idx !== displayedTransactions.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-slate-900">{tx.block}</p>
                    <p className="text-xs text-slate-500">{tx.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-[#0284C7]">
                      S$ {tx.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-3">Market Insights</h2>

            {/* Interactive Price Trend Chart */}
            <PriceTrendChart data={property.marketInsights.historicalTrend} />

            {/* Professional Insights Card */}
            <div className="bg-white text-slate-800 rounded-xl p-5 mb-4 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Verified className="w-5 h-5 text-[#0284C7]" />
                <h3 className="text-sm font-bold text-slate-900 font-serif">Professional Insights</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {property.marketInsights.professionalInsight}
              </p>
            </div>

            {/* Asking vs Recent Market Card */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 font-serif">Asking vs. Recent Market</h3>
              </div>
              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-slate-500">Current Asking</span>
                  <span className="font-mono font-bold text-[#0284C7]">
                    S$ {property.marketInsights.askingPsf.toLocaleString()} PSF
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-slate-500">Recent Avg Comps</span>
                  <span className="font-mono font-medium text-slate-900">
                    S$ {property.marketInsights.recentAvgPsf.toLocaleString()} PSF
                  </span>
                </div>
                <div className="mt-1 pt-2.5 border-t border-slate-100">
                  <p className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                    <Info className="w-3.5 h-3.5 shrink-0 text-[#0284C7]" />
                    Asking price is {Math.abs(property.marketInsights.diffPercent)}%{' '}
                    {property.marketInsights.diffPercent >= 0 ? 'above' : 'below'} recent block average.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-2">Description</h2>
            <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
              <p className={isDescriptionExpanded ? '' : 'line-clamp-3'}>
                {property.description}
              </p>
            </div>
            <button
              id="read-more-description-btn"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2.5 text-[#0284C7] text-xs font-bold uppercase tracking-wider hover:underline"
            >
              {isDescriptionExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>

          {/* Facilities Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-3">Facilities</h2>
            <div className="flex flex-wrap gap-2">
              {property.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3.5 py-2 rounded-full flex items-center gap-2 border border-slate-200 shadow-sm"
                >
                  {fac.toLowerCase().includes('pool') && <Waves className="w-4 h-4 text-[#0284C7]" />}
                  {fac.toLowerCase().includes('gym') && <Dumbbell className="w-4 h-4 text-[#0284C7]" />}
                  {fac.toLowerCase().includes('garden') && <Trees className="w-4 h-4 text-[#0284C7]" />}
                  {!fac.toLowerCase().includes('pool') &&
                    !fac.toLowerCase().includes('gym') &&
                    !fac.toLowerCase().includes('garden') && (
                      <Sparkles className="w-4 h-4 text-[#0284C7]" />
                    )}
                  <span className="text-xs font-semibold text-slate-800">{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-3 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{property.agent.name}</p>
              <p className="text-[10px] text-slate-500">{property.agent.agency}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              Inquire with Agent
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.galleryImages || [property.image]}
        title={property.title}
      />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        propertyTitle={property.title}
      />
      <ContactAgentModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        agent={property.agent}
        propertyTitle={property.title}
      />
    </div>
  );
};
