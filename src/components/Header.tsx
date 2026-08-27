import React from 'react';
import {
  Compass,
  Building2,
  Heart,
  User,
  School,
  Sparkles,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { PROPRADIUS_LOGO_URL } from '../data/mockProperties';

interface HeaderProps {
  activeTab: 'search' | 'listings' | 'favorites' | 'profile';
  onSelectTab: (tab: 'search' | 'listings' | 'favorites' | 'profile') => void;
  selectedSchool?: string;
  favoritesCount?: number;
  onOpenSchoolFilter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  selectedSchool = 'Rosyth School',
  favoritesCount = 0,
  onOpenSchoolFilter,
}) => {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => onSelectTab('listings')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="relative">
                <img
                  alt="Prop Radius Logo"
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                  src={PROPRADIUS_LOGO_URL}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="serif font-bold text-lg md:text-xl text-slate-900 tracking-tight leading-none">
                    Prop Radius
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    SG
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide hidden md:block">
                  MOE School Catchment & Property Intelligence
                </span>
              </div>
            </button>

            {/* School Filter quick chip (Desktop) */}
            {selectedSchool && (
              <div className="hidden lg:flex items-center">
                <div className="h-5 w-px bg-slate-200 mx-2" />
                <button
                  type="button"
                  onClick={onOpenSchoolFilter}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-xs transition-colors"
                  title="Change Focus School"
                >
                  <School className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-slate-600">Focus:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[160px]">
                    {selectedSchool}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onSelectTab('listings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'listings'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Listings</span>
            </button>

            <button
              onClick={() => onSelectTab('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>1km Radar Map</span>
            </button>

            <button
              onClick={() => onSelectTab('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'favorites'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'
                }`}
              />
              <span>Shortlist</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Actions & Live Status */}
          <div className="flex items-center gap-2">
            {/* Live Data Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Gov Data Live</span>
            </div>

            {/* Profile & Tools Button */}
            <button
              id="header-profile-btn"
              onClick={() => onSelectTab('profile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-sky-500 hover:bg-sky-50/50'
              }`}
              title="Profile & Mortgage Calculator"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Tools</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
