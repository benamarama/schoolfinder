import React, { useState } from 'react';
import { Property, FilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import { FilterModal } from './FilterModal';
import {
  School,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronDown,
  CircleDollarSign,
  Bell,
  User,
  Search as SearchIcon,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { PROPRADIUS_LOGO_URL } from '../data/mockProperties';
import { getSchoolByName, ALL_SINGAPORE_PRIMARY_SCHOOLS } from '../data/singaporeSchools';
import { GoogleMapsAndSearchIntel } from './GoogleMapsAndSearchIntel';
import { Sparkles, MapPin } from 'lucide-react';

interface ListingsViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onNavigateTab: (tab: 'search' | 'listings' | 'favorites' | 'profile') => void;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  filters,
  onUpdateFilters,
  onResetFilters,
  onNavigateTab,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isProximityDropdownOpen, setIsProximityDropdownOpen] = useState(false);
  const [isBedroomsDropdownOpen, setIsBedroomsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showSchoolIntel, setShowSchoolIntel] = useState(false);

  const currentSchoolData = getSchoolByName(filters.selectedSchool) || ALL_SINGAPORE_PRIMARY_SCHOOLS[0];

  // Filter properties logic
  const filteredProperties = properties.filter((prop) => {
    // Property Type
    if (filters.propertyType === 'Private' && prop.propertyType === 'HDB') return false;
    if (filters.propertyType === 'HDB' && prop.propertyType !== 'HDB') return false;

    // Proximity
    if (filters.proximity === 'Within 1km' && prop.distanceKm > 1.0) return false;
    if (filters.proximity === 'Within 2km' && prop.distanceKm > 2.0) return false;

    // Bedrooms
    if (filters.bedrooms === '2+' && prop.bedrooms < 2) return false;
    if (filters.bedrooms === '3+' && prop.bedrooms < 3) return false;
    if (filters.bedrooms === '4+' && prop.bedrooms < 4) return false;

    // Tenure
    if (filters.tenureType === 'Freehold' && !prop.isFreehold) return false;
    if (filters.tenureType === '99-year' && prop.isFreehold) return false;

    // Max Price
    if (filters.maxPrice && prop.price > filters.maxPrice) return false;

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'psf_asc') return a.psf - b.psf;
    if (filters.sortBy === 'psf_desc') return b.psf - a.psf;
    if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return 0; // Default recommended
  });

  const displayedProperties = sortedProperties.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top App Bar with PropRadius Logo */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl pt-safe shadow-[0_1px_4px_rgba(0,0,0,0.05)] border-b border-slate-200/80">
        <div className="h-16 flex items-center justify-between px-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <img
              alt="PropRadius Logo"
              className="h-8 w-auto object-contain"
              src={PROPRADIUS_LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <span className="serif italic text-lg md:text-xl text-[#0F172A] tracking-tight">
              Listings<span className="text-[#0284C7]">.</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Gov API indicator */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>URA & SLA OneMap Active</span>
            </div>

            <button
              id="profile-btn"
              onClick={() => onNavigateTab('profile')}
              className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:border-[#0284C7] transition-all"
              title="My Account"
            >
              <User className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-16 flex-1 max-w-[1200px] w-full mx-auto pb-24">
        {/* Sticky Filter Bar */}
        <div className="px-4 pt-4 pb-2.5 sticky top-16 z-40 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-slate-200/80">
          {/* Proximity Title Banner */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-[#0284C7]" />
              <h1 className="font-medium text-sm md:text-base text-slate-800 tracking-wide">
                Properties near <span className="serif italic font-semibold text-[#0F172A]">{filters.selectedSchool}</span>
              </h1>
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="text-[11px] uppercase tracking-widest text-[#0284C7] hover:text-[#0369A1] font-semibold transition-colors flex items-center gap-1 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200"
            >
              <SearchIcon className="w-3 h-3" />
              Switch School (185+)
            </button>
          </div>

          {/* Horizontal Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5 pt-0.5 items-center">
            {/* Sort Pill & Dropdown */}
            <div className="relative shrink-0">
              <button
                id="sort-pill-btn"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="bg-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0F172A] hover:border-slate-300 transition-colors shadow-sm"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Sort</span>
              </button>

              {isSortDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  {[
                    { label: 'Recommended', value: 'recommended' },
                    { label: 'Price: Low to High', value: 'price_asc' },
                    { label: 'Price: High to Low', value: 'price_desc' },
                    { label: 'PSF: Low to High', value: 'psf_asc' },
                    { label: 'Distance: Closest', value: 'distance' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onUpdateFilters({ sortBy: option.value as any });
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors ${
                        filters.sortBy === option.value ? 'font-bold text-[#0284C7] bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Segmented Private / HDB Toggle */}
            <div className="shrink-0 bg-white px-1 py-1 rounded-full flex items-center border border-slate-200 shadow-sm">
              <button
                id="filter-type-private"
                onClick={() => onUpdateFilters({ propertyType: filters.propertyType === 'Private' ? 'All' : 'Private' })}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  filters.propertyType === 'Private'
                    ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Private
              </button>
              <button
                id="filter-type-hdb"
                onClick={() => onUpdateFilters({ propertyType: filters.propertyType === 'HDB' ? 'All' : 'HDB' })}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  filters.propertyType === 'HDB'
                    ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                HDB
              </button>
            </div>

            {/* Proximity Radius Dropdown */}
            <div className="relative shrink-0">
              <button
                id="proximity-pill-btn"
                onClick={() => setIsProximityDropdownOpen(!isProximityDropdownOpen)}
                className="bg-sky-50 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-sky-200 text-xs font-semibold text-[#0369A1] hover:bg-sky-100 transition-colors shadow-sm"
              >
                <span>{filters.proximity}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isProximityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  {['Within 1km', 'Within 2km', 'All'].map((prox) => (
                    <button
                      key={prox}
                      onClick={() => {
                        onUpdateFilters({ proximity: prox });
                        setIsProximityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors ${
                        filters.proximity === prox ? 'font-bold text-[#0284C7] bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      {prox}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bedrooms Dropdown */}
            <div className="relative shrink-0">
              <button
                id="bedrooms-pill-btn"
                onClick={() => setIsBedroomsDropdownOpen(!isBedroomsDropdownOpen)}
                className="bg-white px-3.5 py-1.5 rounded-full flex items-center gap-1 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0F172A] hover:border-slate-300 transition-colors shadow-sm"
              >
                <span>{filters.bedrooms === 'All' ? 'Bedrooms' : `${filters.bedrooms} Beds`}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isBedroomsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  {['All', '2+', '3+', '4+'].map((bed) => (
                    <button
                      key={bed}
                      onClick={() => {
                        onUpdateFilters({ bedrooms: bed });
                        setIsBedroomsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors ${
                        filters.bedrooms === bed ? 'font-bold text-[#0284C7] bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      {bed === 'All' ? 'Any Bedrooms' : `${bed} Beds`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tenure Pill Toggle */}
            <button
              onClick={() =>
                onUpdateFilters({
                  tenureType: filters.tenureType === 'Freehold' ? 'All' : 'Freehold',
                })
              }
              className={`shrink-0 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm ${
                filters.tenureType === 'Freehold'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:text-[#0F172A]'
              }`}
            >
              Freehold Only
            </button>

            {/* Full Filters Button */}
            <button
              id="open-filters-modal-btn"
              onClick={() => setIsFilterModalOpen(true)}
              className="shrink-0 bg-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0F172A] hover:border-slate-300 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>All Filters</span>
            </button>
          </div>
        </div>

        {/* Live Google Maps & Search Grounding Quick Access Banner */}
        <div className="px-4 pt-3">
          <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-2xl p-3.5 md:p-4 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    Google Maps & Search Intelligence
                  </span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded font-semibold">
                    Live Grounded
                  </span>
                </div>
                <h3 className="serif font-bold text-sm md:text-base text-white">
                  Live Catchment Intel for {filters.selectedSchool}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSchoolIntel(!showSchoolIntel)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm self-start md:self-auto"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-200" />
              <span>{showSchoolIntel ? 'Hide Intel' : 'Explore Maps & P1 Data'}</span>
            </button>
          </div>

          {/* Expandable Google Grounding Intelligence */}
          {showSchoolIntel && (
            <div className="mt-3 animate-fadeIn">
              <GoogleMapsAndSearchIntel
                schoolName={filters.selectedSchool}
                propertyTitle={`Properties near ${filters.selectedSchool}`}
                propertyAddress={`${currentSchoolData.area}, Singapore ${currentSchoolData.postalCode}`}
                coordinates={{
                  lat: currentSchoolData.lat,
                  lng: currentSchoolData.lng,
                }}
                district={currentSchoolData.area || 'Singapore'}
              />
            </div>
          )}
        </div>

        {/* Listings Grid */}
        <div className="p-4">
          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={() => onSelectProperty(property)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto mt-6">
              <School className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="serif font-bold text-lg text-slate-800">No properties matched this filter</h3>
              <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
                Try widening your distance radius to 2km or search for other primary schools across Singapore.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => onUpdateFilters({ proximity: 'All' })}
                  className="px-4 py-2 bg-sky-50 border border-sky-200 text-[#0284C7] rounded-xl text-xs font-bold"
                >
                  Expand to All Radii
                </button>
                <button
                  onClick={onResetFilters}
                  className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {sortedProperties.length > visibleCount && (
            <div className="mt-8 text-center">
              <button
                id="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-full border border-slate-200 shadow-sm transition-colors uppercase tracking-wider"
              >
                Load More Properties ({sortedProperties.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        onResetFilters={onResetFilters}
        totalResults={filteredProperties.length}
      />
    </div>
  );
};
