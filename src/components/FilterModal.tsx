import React, { useState, useMemo } from 'react';
import { FilterState } from '../types';
import { ALL_SINGAPORE_PRIMARY_SCHOOLS, SingaporeSchool } from '../data/singaporeSchools';
import { X, SlidersHorizontal, RotateCcw, Check, Search, GraduationCap, Sparkles } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
}) => {
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const filteredSchools = useMemo(() => {
    return ALL_SINGAPORE_PRIMARY_SCHOOLS.filter((school) => {
      const matchesQuery =
        schoolSearchQuery.trim() === '' ||
        school.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
        school.area.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
        school.postalCode.includes(schoolSearchQuery);

      const matchesZone = selectedZone === 'All' || school.zone === selectedZone;

      return matchesQuery && matchesZone;
    });
  }, [schoolSearchQuery, selectedZone]);

  if (!isOpen) return null;

  const zones = ['All', 'Central', 'North', 'South', 'East', 'West', 'North-East'];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-left">
        {/* Header */}
        <div className="p-4 bg-slate-50 text-slate-900 flex justify-between items-center shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#0284C7]" />
            <h3 className="serif font-bold text-base text-slate-900">Search & School Radius Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs md:text-sm text-slate-700">
          {/* Target Primary School with Instant Search */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
                Target Primary School ({ALL_SINGAPORE_PRIMARY_SCHOOLS.length} MOE Schools)
              </label>
              <span className="text-[10px] text-[#0284C7] font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                Singapore Wide
              </span>
            </div>

            {/* Currently Selected Banner */}
            <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Active School Anchor</span>
                <p className="font-bold text-slate-900 text-xs md:text-sm">{filters.selectedSchool}</p>
              </div>
              <span className="bg-[#0284C7] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                Selected
              </span>
            </div>

            {/* School Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={schoolSearchQuery}
                onChange={(e) => setSchoolSearchQuery(e.target.value)}
                placeholder="Search any school (e.g. Rosyth, Tao Nan, Nanyang, Sengkang, Raffles...)"
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white"
              />
              {schoolSearchQuery && (
                <button
                  onClick={() => setSchoolSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Zone Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {zones.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                    selectedZone === zone
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* School List Picker Box */}
            <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/50">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => {
                  const isSelected = filters.selectedSchool === school.name;
                  return (
                    <button
                      key={school.name}
                      type="button"
                      onClick={() => onUpdateFilters({ selectedSchool: school.name })}
                      className={`w-full p-2.5 text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'bg-sky-100/70 text-slate-900 font-bold'
                          : 'hover:bg-slate-100/80 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{school.name}</span>
                          {school.isPopularGep && (
                            <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-bold">
                              GEP
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {school.area} • {school.zone} Zone • S({school.postalCode})
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#0284C7] shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No schools found matching &quot;{schoolSearchQuery}&quot;
                </div>
              )}
            </div>
          </div>

          {/* School Distance Radius */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 uppercase tracking-wider text-[11px]">
              School Distance Radius
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Within 1km', 'Within 2km', 'All'].map((prox) => (
                <button
                  key={prox}
                  type="button"
                  onClick={() => onUpdateFilters({ proximity: prox })}
                  className={`py-2 px-3 rounded-xl font-medium transition-all text-xs border ${
                    filters.proximity === prox
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {prox}
                </button>
              ))}
            </div>
          </div>

          {/* Property Category (Private vs HDB vs All) */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 uppercase tracking-wider text-[11px]">
              Property Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'All Types', value: 'All' },
                { label: 'Private Condo', value: 'Private' },
                { label: 'HDB Flats', value: 'HDB' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onUpdateFilters({ propertyType: item.value as any })}
                  className={`py-2 px-3 rounded-xl font-medium transition-all text-xs border ${
                    filters.propertyType === item.value
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 uppercase tracking-wider text-[11px]">
              Bedrooms
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['All', '2+', '3+', '4+'].map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={() => onUpdateFilters({ bedrooms: bed })}
                  className={`py-2 px-3 rounded-xl font-medium transition-all text-xs border ${
                    filters.bedrooms === bed
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {bed === 'All' ? 'Any Bed' : `${bed} Beds`}
                </button>
              ))}
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 uppercase tracking-wider text-[11px]">
              Tenure Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'All Tenures', value: 'All' },
                { label: 'Freehold', value: 'Freehold' },
                { label: '99-Yr Lease', value: '99-year' },
              ].map((ten) => (
                <button
                  key={ten.value}
                  type="button"
                  onClick={() => onUpdateFilters({ tenureType: ten.value as any })}
                  className={`py-2 px-3 rounded-xl font-medium transition-all text-xs border ${
                    filters.tenureType === ten.value
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {ten.label}
                </button>
              ))}
            </div>
          </div>

          {/* Maximum Price Range */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">Max Budget</label>
              <span className="font-bold text-[#0284C7] font-mono">
                S$ {filters.maxPrice >= 5000000 ? 'Any Budget' : (filters.maxPrice / 1000000).toFixed(2) + 'M'}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="5000000"
              step="100000"
              value={filters.maxPrice}
              onChange={(e) => onUpdateFilters({ maxPrice: Number(e.target.value) })}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>$500K</span>
              <span>$2.5M</span>
              <span>$5M+</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3 shrink-0">
          <button
            type="button"
            onClick={onResetFilters}
            className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Check className="w-4 h-4 text-white" />
            Apply Filters ({totalResults} Results)
          </button>
        </div>
      </div>
    </div>
  );
};
