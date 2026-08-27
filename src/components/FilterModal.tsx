import React from 'react';
import { FilterState } from '../types';
import { MOCK_SCHOOLS } from '../data/mockProperties';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-left">
        {/* Header */}
        <div className="p-4 bg-slate-50 text-slate-900 flex justify-between items-center shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#0284C7]" />
            <h3 className="serif font-bold text-base text-slate-900">Search & Proximity Filters</h3>
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
          {/* Target Primary School */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 uppercase tracking-wider text-[11px]">
              Primary School Anchor
            </label>
            <select
              value={filters.selectedSchool}
              onChange={(e) => onUpdateFilters({ selectedSchool: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0284C7]"
            >
              {MOCK_SCHOOLS.map((school) => (
                <option key={school} value={school} className="bg-white text-slate-900">
                  {school}
                </option>
              ))}
            </select>
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
