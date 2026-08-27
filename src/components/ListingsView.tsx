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
} from 'lucide-react';
import { PROPRADIUS_LOGO_URL } from '../data/mockProperties';

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
  const [visibleCount, setVisibleCount] = useState(4);

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
            <button
              id="notifications-btn"
              onClick={() => alert("Notification: New listing alert! Blk 92 Dawson Rd just published at $1,020 PSF.")}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#0F172A] transition-colors rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
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
              className="text-[11px] uppercase tracking-widest text-[#0284C7] hover:text-[#0369A1] font-semibold transition-colors flex items-center gap-1"
            >
              Change Anchor
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

            {/* Filter Dialog Modal trigger */}
            <button
              id="open-filters-modal-btn"
              onClick={() => setIsFilterModalOpen(true)}
              className="shrink-0 bg-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0F172A] hover:border-slate-300 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Filters</span>
            </button>

            {/* Budget Pill */}
            <button
              id="budget-pill-btn"
              onClick={() => setIsFilterModalOpen(true)}
              className="shrink-0 bg-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0F172A] hover:border-slate-300 transition-colors shadow-sm"
            >
              <span>Budget</span>
              <CircleDollarSign className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-[11px] uppercase tracking-widest text-slate-500">
              Showing <strong className="text-[#0F172A] font-semibold">{sortedProperties.length}</strong> verified properties
            </span>
            {(filters.propertyType !== 'All' || filters.proximity !== 'Within 1km' || filters.bedrooms !== 'All' || filters.tenureType !== 'All') && (
              <button
                onClick={onResetFilters}
                className="text-[11px] uppercase tracking-widest text-[#0284C7] hover:text-[#0369A1] transition-colors font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="px-4 pt-4 flex flex-col gap-4">
          {displayedProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <SearchIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="serif text-xl font-bold text-slate-900 italic">No Matching Properties Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 mb-6 leading-relaxed">
                Try widening your distance radius to 2km or adjusting the bedroom and price filters.
              </p>
              <button
                onClick={onResetFilters}
                className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            displayedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProperty}
              />
            ))
          )}

          {/* Load More Button */}
          {visibleCount < sortedProperties.length && (
            <button
              id="load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="w-full py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-xs md:text-sm hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm mt-2 uppercase tracking-widest"
            >
              Load More Properties ({sortedProperties.length - visibleCount} remaining)
            </button>
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
        totalResults={sortedProperties.length}
      />
    </div>
  );
};
