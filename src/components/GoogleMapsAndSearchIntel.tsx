import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Sparkles,
  School,
  Building,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
  Send,
  Navigation,
  Compass,
  Store,
  HeartPulse,
  Baby,
  BookOpen,
  Train
} from 'lucide-react';
import {
  getMapsGroundingIntelligence,
  getSearchGroundingIntelligence,
  MapsGroundingLink,
  SearchGroundingLink,
} from '../services/geminiService';

interface GoogleMapsAndSearchIntelProps {
  schoolName: string;
  propertyTitle?: string;
  propertyAddress?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  district?: string;
  defaultTab?: 'maps' | 'search';
}

export const GoogleMapsAndSearchIntel: React.FC<GoogleMapsAndSearchIntelProps> = ({
  schoolName,
  propertyTitle,
  propertyAddress,
  coordinates,
  district = 'Singapore',
  defaultTab = 'maps',
}) => {
  const [activeTab, setActiveTab] = useState<'maps' | 'search'>(defaultTab);

  // Maps Grounding State
  const [mapsCategory, setMapsCategory] = useState<string>('enrichment');
  const [mapsPrompt, setMapsPrompt] = useState<string>('');
  const [mapsResult, setMapsResult] = useState<string>('');
  const [mapsLinks, setMapsLinks] = useState<MapsGroundingLink[]>([]);
  const [isMapsLoading, setIsMapsLoading] = useState<boolean>(false);

  // Search Grounding State
  const [searchTopic, setSearchTopic] = useState<'p1_balloting' | 'master_plan' | 'market_trends' | 'general'>('p1_balloting');
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string>('');
  const [searchLinks, setSearchLinks] = useState<SearchGroundingLink[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  // Pre-configured Maps queries for quick exploration
  const MAPS_QUICK_PRESETS = [
    {
      id: 'enrichment',
      label: 'Tuition & Enrichment Hubs',
      icon: BookOpen,
      prompt: `Find top reputable student tuition centers, music/art academies, and enrichment hubs within 1.5km of ${propertyTitle || 'this location'} and ${schoolName}. Include exact addresses and walking proximity.`,
    },
    {
      id: 'childcare',
      label: 'Childcare & Preschools',
      icon: Baby,
      prompt: `List verified licensed preschools, childcare centres (e.g. Sparkletots, My First Skool, premium private preschools) near ${propertyTitle || 'this development'}. Mention walking distance and facilities.`,
    },
    {
      id: 'transit',
      label: 'MRT & Transit Links',
      icon: Train,
      prompt: `Identify the nearest MRT stations, bus interchanges, and sheltered commuter links connecting ${propertyTitle || 'this residence'} to ${schoolName}.`,
    },
    {
      id: 'healthcare',
      label: 'Clinics & Healthcare',
      icon: HeartPulse,
      prompt: `Locate 24-hour medical clinics, pediatricians, dental centres, and polyclinics closest to ${propertyTitle || 'this residence'}.`,
    },
    {
      id: 'groceries',
      label: 'Supermarkets & Dining',
      icon: Store,
      prompt: `Find the nearest supermarkets (FairPrice, Cold Storage, Sheng Siong), food centres, and family-friendly malls around ${propertyTitle || 'this address'}.`,
    },
  ];

  // Pre-configured Search queries for quick exploration
  const SEARCH_QUICK_PRESETS = [
    {
      id: 'p1_balloting',
      label: 'MOE P1 Balloting Stats',
      icon: School,
      topic: 'p1_balloting' as const,
      prompt: `What are the latest MOE Primary 1 registration balloting statistics for ${schoolName}? Detail the Phase 2A, Phase 2B, and Phase 2C applicant-to-vacancy ratios for Singapore Citizens within 1km vs 1-2km.`,
    },
    {
      id: 'master_plan',
      label: 'URA Master Plan & MRT News',
      icon: Building,
      topic: 'master_plan' as const,
      prompt: `Search recent URA Master Plan zoning updates, upcoming Land Transport Authority (LTA) MRT expansions (e.g., Cross Island Line, TEL), and regional infrastructure upgrades in ${district}.`,
    },
    {
      id: 'market_trends',
      label: 'Estate Price & Rental Comps',
      icon: Compass,
      topic: 'market_trends' as const,
      prompt: `Search current real estate price trends, average PSF transactions, and rental yields for Condominiums and HDB flats in ${district} near ${schoolName}.`,
    },
    {
      id: 'school_achievements',
      label: 'School Programs & Affiliations',
      icon: GraduationCap,
      topic: 'general' as const,
      prompt: `What are the signature programs, CCA achievements, secondary school affiliations, and GEP/DSA opportunities for ${schoolName}?`,
    },
  ];

  // Initial fetch for Maps Grounding
  const fetchMapsData = async (queryPrompt: string) => {
    setIsMapsLoading(true);
    setMapsResult('');
    setMapsLinks([]);

    try {
      const res = await getMapsGroundingIntelligence({
        prompt: queryPrompt,
        location: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
        schoolName,
        propertyTitle: propertyTitle || 'Singapore Property',
      });

      setMapsResult(res.text);
      setMapsLinks(res.mapsGrounding || []);
    } catch (err) {
      console.warn('Maps fetch error:', err);
    } finally {
      setIsMapsLoading(false);
    }
  };

  // Initial fetch for Search Grounding
  const fetchSearchData = async (queryPrompt: string, topic: 'p1_balloting' | 'master_plan' | 'market_trends' | 'general') => {
    setIsSearchLoading(true);
    setSearchResult('');
    setSearchLinks([]);
    setSearchQueries([]);

    try {
      const res = await getSearchGroundingIntelligence({
        prompt: queryPrompt,
        schoolName,
        district,
        topic,
      });

      setSearchResult(res.text);
      setSearchLinks(res.webGrounding || []);
      setSearchQueries(res.searchQueries || []);
    } catch (err) {
      console.warn('Search fetch error:', err);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // Load default preset when category changes or on mount
  useEffect(() => {
    const preset = MAPS_QUICK_PRESETS.find((p) => p.id === mapsCategory) || MAPS_QUICK_PRESETS[0];
    fetchMapsData(preset.prompt);
  }, [mapsCategory, schoolName, propertyTitle, coordinates.lat, coordinates.lng]);

  useEffect(() => {
    const preset = SEARCH_QUICK_PRESETS.find((p) => p.id === searchTopic) || SEARCH_QUICK_PRESETS[0];
    fetchSearchData(preset.prompt, preset.topic);
  }, [searchTopic, schoolName, district]);

  const handleCustomMapsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsPrompt.trim()) return;
    fetchMapsData(mapsPrompt);
  };

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPrompt.trim()) return;
    fetchSearchData(searchPrompt, 'general');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left">
      {/* Top Banner Header with Google Grounding Branding */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 text-white p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Gemini 2.5 Live Grounding
              </span>
              <span className="text-[11px] text-slate-400">
                Grounded with Google Maps & Google Search
              </span>
            </div>
            <h2 className="serif text-xl md:text-2xl font-bold text-white mt-1">
              Live School & Neighborhood Intelligence
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Real-time spatial place citations, verified amenities, and MOE Primary 1 registration data for{' '}
              <strong className="text-sky-300 font-semibold">{schoolName}</strong>
            </p>
          </div>

          {/* Main Tab Toggle */}
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('maps')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'maps'
                  ? 'bg-[#0284C7] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-200" />
              Google Maps Data
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-[#0284C7] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-sky-200" />
              Google Search Data
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: GOOGLE MAPS GROUNDING */}
      {activeTab === 'maps' && (
        <div className="p-5 space-y-5">
          {/* Category Preset Badges */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Explore Neighborhood Amenities (Live Google Maps Grounding)
            </span>
            <div className="flex flex-wrap gap-2">
              {MAPS_QUICK_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = mapsCategory === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setMapsCategory(preset.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-[#0284C7] text-[#0284C7] shadow-sm font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0284C7]' : 'text-slate-500'}`} />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Maps Query Bar */}
          <form onSubmit={handleCustomMapsSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mapsPrompt}
                onChange={(e) => setMapsPrompt(e.target.value)}
                placeholder="Ask Maps (e.g., 'Best piano schools within 1km', '24h pediatric clinics')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isMapsLoading || !mapsPrompt.trim()}
              className="px-4 py-2.5 bg-[#0F172A] hover:bg-[#0284C7] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isMapsLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Query Maps</span>
            </button>
          </form>

          {/* Results Container */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  Google Maps Spatial Grounding Output
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Anchored to {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}°E
              </span>
            </div>

            {isMapsLoading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs">
                <RefreshCw className="w-6 h-6 animate-spin text-[#0284C7]" />
                <p>Retrieving live Google Maps places, reviews, and verified distances...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* AI Markdown Analysis */}
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {mapsResult || 'Select a category above or enter a custom query to view real-time Google Maps insights.'}
                </div>

                {/* Grounded Google Maps Links & Verified Places (REQUIRED BY GEMINI MAPS GROUNDING GUIDELINES) */}
                {mapsLinks.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2">
                      Verified Google Maps Places ({mapsLinks.length} Links)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mapsLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.uri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(link.title + ' ' + (propertyAddress || 'Singapore'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 bg-white hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 rounded-xl text-xs text-slate-800 transition-all shadow-xs group"
                        >
                          <div className="flex items-start gap-2 overflow-hidden">
                            <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                            <div className="truncate">
                              <p className="font-semibold text-slate-900 group-hover:text-[#0284C7] transition-colors truncate">
                                {link.title}
                              </p>
                              {link.address && (
                                <p className="text-[10px] text-slate-500 truncate">{link.address}</p>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284C7] shrink-0 ml-1.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE SEARCH GROUNDING */}
      {activeTab === 'search' && (
        <div className="p-5 space-y-5">
          {/* Category Preset Badges */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              MOE Primary 1 & Real Estate Search Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {SEARCH_QUICK_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = searchTopic === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSearchTopic(preset.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-[#0284C7] text-[#0284C7] shadow-sm font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0284C7]' : 'text-slate-500'}`} />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Search Query Bar */}
          <form onSubmit={handleCustomSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Ask Google Search (e.g. '2024 P1 Phase 2C balloting cutoff for Rosyth', 'Upcoming CRL MRT stations')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchLoading || !searchPrompt.trim()}
              className="px-4 py-2.5 bg-[#0F172A] hover:bg-[#0284C7] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isSearchLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Search Web</span>
            </button>
          </form>

          {/* Results Container */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  Google Search Live Web Grounding Output
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                Verified Web Data
              </span>
            </div>

            {isSearchLoading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs">
                <RefreshCw className="w-6 h-6 animate-spin text-[#0284C7]" />
                <p>Querying Google Search live web index for MOE & government data...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* AI Markdown Analysis */}
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {searchResult || 'Select a topic above or search anything to get up-to-date MOE registration facts.'}
                </div>

                {/* Search Queries Used */}
                {searchQueries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] text-slate-500 font-semibold">Grounded Queries:</span>
                    {searchQueries.map((q, idx) => (
                      <span key={idx} className="bg-slate-200/80 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-mono">
                        {q}
                      </span>
                    ))}
                  </div>
                )}

                {/* Grounded Web Citation Links */}
                {searchLinks.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2">
                      Verified Web Sources ({searchLinks.length} Citations)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 bg-white hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 rounded-xl text-xs text-slate-800 transition-all shadow-xs group"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Search className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                            <span className="font-semibold text-slate-900 group-hover:text-[#0284C7] transition-colors truncate">
                              {link.title || 'Official Source'}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284C7] shrink-0 ml-1.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
