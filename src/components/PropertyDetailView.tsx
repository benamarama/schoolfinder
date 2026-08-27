import React, { useState } from 'react';
import { Property } from '../types';
import { PriceTrendChart } from './PriceTrendChart';
import { ContactAgentModal } from './ContactAgentModal';
import { GalleryModal } from './GalleryModal';
import { ShareModal } from './ShareModal';
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

  const displayedTransactions = showAllTransactions
    ? property.recentTransactions
    : property.recentTransactions.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col antialiased">
      {/* Fixed Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#080808]/90 backdrop-blur-xl pt-safe shadow-[0_1px_12px_rgba(0,0,0,0.6)] border-b border-white/10">
        <div className="h-16 flex items-center justify-between px-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <button
              id="detail-back-btn"
              onClick={onBack}
              className="w-10 h-10 -ml-1 flex items-center justify-center text-white/80 hover:text-white rounded-full hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
              aria-label="Back to listings"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="serif italic text-lg text-white tracking-tight truncate">
              Property Detail<span className="text-[#A68A56]">.</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="detail-fav-btn"
              onClick={(e) => onToggleFavorite(property.id, e)}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#E55353] rounded-full hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
              aria-label="Favorite"
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? '#E55353' : 'none'}
                stroke={isFavorite ? '#E55353' : 'currentColor'}
              />
            </button>
            <button
              id="detail-share-btn"
              onClick={() => setIsShareOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white rounded-full hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
              aria-label="Share property"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Detail Content */}
      <main className="pt-16 min-h-screen bg-[#0A0A0A] px-4 py-4 max-w-[1200px] w-full mx-auto pb-32">
        <div className="flex flex-col w-full text-left">
          {/* Hero Banner Image */}
          <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center cursor-pointer transition-transform duration-700 hover:scale-105 brightness-95 hover:brightness-105"
              style={{ backgroundImage: `url('${property.image}')` }}
              onClick={() => setIsGalleryOpen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent pointer-events-none" />

            {/* Bottom floating badge pills and photo gallery icon */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex gap-2">
                {property.isNewLaunch && (
                  <div className="bg-[#A68A56] text-[#0A0A0A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    New Launch
                  </div>
                )}
                {property.isFreehold && (
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md text-[#C8AA74] border border-[#A68A56]/40 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Freehold
                  </div>
                )}
                {!property.isFreehold && (
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md text-white/90 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {property.remainingLeaseYears ? `${property.remainingLeaseYears} Yrs Left` : property.tenure}
                  </div>
                )}
              </div>

              <button
                id="open-photo-gallery-btn"
                onClick={() => setIsGalleryOpen(true)}
                className="w-10 h-10 bg-black/70 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-black/90 transition-all hover:scale-110 active:scale-95"
                title="View Photo Gallery"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Core Pricing Header */}
          <div className="pt-6 flex flex-col gap-1">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
              {property.title}
            </h1>
            <p className="text-sm text-white/50 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-[#A68A56] shrink-0" />
              <span>{property.subtitle}</span>
            </p>

            <div className="flex justify-between items-end mt-4 pb-4 border-b border-white/10">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-white">
                  S$ {property.price.toLocaleString()}
                </p>
                <p className="text-sm text-[#C8AA74] font-mono font-medium mt-0.5">
                  S$ {property.psf.toLocaleString()} PSF
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-base font-semibold text-white">
                  {property.bedrooms} Bed • {property.bathrooms} Bath
                </p>
                <p className="text-sm text-white/50">
                  {property.sqft.toLocaleString()} sqft
                </p>
              </div>
            </div>
          </div>

          {/* Property Highlights Section (2x2 Grid) */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-white mb-3">Property Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#141414] rounded-xl p-4 flex flex-col gap-1 border border-white/10 shadow-sm">
                <Building className="w-5 h-5 text-[#A68A56]" />
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">HDB / District</p>
                <p className="text-sm font-bold text-white">{property.hdbTown || 'Queenstown'}</p>
              </div>

              <div className="bg-[#141414] rounded-xl p-4 flex flex-col gap-1 border border-white/10 shadow-sm">
                <Building2 className="w-5 h-5 text-[#A68A56]" />
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">Flat Type</p>
                <p className="text-sm font-bold text-white">{property.flatType || property.subCategory || '5-Room Premium'}</p>
              </div>

              <div className="bg-[#141414] rounded-xl p-4 flex flex-col gap-1 border border-white/10 shadow-sm">
                <Calendar className="w-5 h-5 text-[#A68A56]" />
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">Lease Start</p>
                <p className="text-sm font-bold text-white">{property.leaseStartYear || 2016}</p>
              </div>

              <div className="bg-[#141414] rounded-xl p-4 flex flex-col gap-1 border border-white/10 shadow-sm">
                <History className="w-5 h-5 text-[#A68A56]" />
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">Remaining Lease</p>
                <p className="text-sm font-bold text-white">
                  {property.remainingLeaseYears ? `${property.remainingLeaseYears} Years` : property.tenure}
                </p>
              </div>
            </div>
          </div>

          {/* Proximity to Schools Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-white">Proximity to Schools</h2>
              <span className="text-xs text-[#C8AA74] font-semibold bg-[#A68A56]/15 border border-[#A68A56]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                MOE Balloting Priority Zone
              </span>
            </div>

            <div className="bg-[#141414] rounded-xl overflow-hidden border border-white/10 shadow-md">
              {property.schoolsProximity.map((schoolItem, idx) => (
                <div
                  key={schoolItem.school}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    idx === 0
                      ? 'bg-[#A68A56]/10 border-b border-[#A68A56]/20'
                      : idx !== property.schoolsProximity.length - 1
                      ? 'border-b border-white/10'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        idx === 0
                          ? 'bg-[#A68A56] text-[#0A0A0A]'
                          : 'bg-[#1E1E1E] text-white/80 border border-white/10'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{schoolItem.school}</p>
                      <p className="text-xs text-[#C8AA74] font-medium">{schoolItem.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-mono text-sm font-bold ${
                        idx === 0 ? 'text-[#C8AA74]' : 'text-white/70'
                      }`}
                    >
                      S$ {schoolItem.psf.toLocaleString()} PSF
                    </p>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Avg Catchment</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-white">Location & Connectivity</h2>
              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={() => setMapLayer('map')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapLayer === 'map' ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-sm' : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  Map
                </button>
                <button
                  onClick={() => setMapLayer('amenities')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapLayer === 'amenities' ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-sm' : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  Transit & Food
                </button>
              </div>
            </div>

            {mapLayer === 'map' ? (
              <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden shadow-xl border border-white/10">
                <img
                  src={
                    property.mapImage ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y'
                  }
                  alt={property.locationName}
                  className="w-full h-full object-cover brightness-90 filter contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl border border-[#A68A56]/40 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A68A56] animate-ping" />
                  <span className="text-xs font-bold text-white">{property.locationName}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white/80 border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-mono backdrop-blur-sm">
                  Lat: {property.coordinates.lat}, Lng: {property.coordinates.lng}
                </div>
              </div>
            ) : (
              <div className="bg-[#141414] rounded-xl p-4 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs shadow-md">
                <div className="bg-[#1E1E1E] p-3.5 rounded-lg border border-white/10">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Compass className="w-4 h-4 text-[#A68A56]" />
                    MRT Stations
                  </div>
                  <ul className="space-y-1 text-white/60">
                    <li>• Queenstown MRT (EW19) - 650m (8 mins walk)</li>
                    <li>• Redhill MRT (EW18) - 950m</li>
                  </ul>
                </div>
                <div className="bg-[#1E1E1E] p-3.5 rounded-lg border border-white/10">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Building className="w-4 h-4 text-[#A68A56]" />
                    Groceries & Malls
                  </div>
                  <ul className="space-y-1 text-white/60">
                    <li>• Dawson Place (NTUC FairPrice) - 150m</li>
                    <li>• Anchorpoint Shopping Centre - 800m</li>
                  </ul>
                </div>
                <div className="bg-[#1E1E1E] p-3.5 rounded-lg border border-white/10">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Trees className="w-4 h-4 text-[#A68A56]" />
                    Parks & PCN
                  </div>
                  <ul className="space-y-1 text-white/60">
                    <li>• Alexandra Canal Linear Park - Direct Access</li>
                    <li>• Southern Ridges Trail - 1.2km</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Recent HDB Transactions Section */}
          <div className="pt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-serif text-lg font-bold text-white">Recent Transactions</h2>
              {property.recentTransactions.length > 2 && (
                <button
                  onClick={() => setShowAllTransactions(!showAllTransactions)}
                  className="text-xs text-[#C8AA74] font-semibold hover:underline flex items-center gap-0.5 uppercase tracking-wider"
                >
                  {showAllTransactions ? 'Show Less' : `View All (${property.recentTransactions.length})`}
                  {showAllTransactions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            <div className="bg-[#141414] rounded-xl overflow-hidden border border-white/10 shadow-md">
              {displayedTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className={`p-4 flex justify-between items-center ${
                    idx !== displayedTransactions.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-white">{tx.block}</p>
                    <p className="text-xs text-white/50">{tx.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-[#C8AA74]">
                      S$ {tx.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/40">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-white mb-3">Market Insights</h2>

            {/* Interactive Price Trend Chart */}
            <PriceTrendChart data={property.marketInsights.historicalTrend} />

            {/* Professional Insights Card */}
            <div className="bg-[#141414] text-white/80 rounded-xl p-5 mb-4 border border-[#A68A56]/30 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Verified className="w-5 h-5 text-[#A68A56]" />
                <h3 className="text-sm font-bold text-white font-serif">Professional Insights</h3>
              </div>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {property.marketInsights.professionalInsight}
              </p>
            </div>

            {/* Asking vs Recent Market Card */}
            <div className="bg-[#141414] rounded-xl overflow-hidden border border-white/10 shadow-md">
              <div className="p-3.5 bg-[#1A1A1A] border-b border-white/10">
                <h3 className="text-sm font-bold text-white font-serif">Asking vs. Recent Market</h3>
              </div>
              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-white/60">Current Asking</span>
                  <span className="font-mono font-bold text-[#C8AA74]">
                    S$ {property.marketInsights.askingPsf.toLocaleString()} PSF
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-white/60">Recent Avg (Blk 91)</span>
                  <span className="font-mono font-medium text-white">
                    S$ {property.marketInsights.recentAvgPsf.toLocaleString()} PSF
                  </span>
                </div>
                <div className="mt-1 pt-2.5 border-t border-white/10">
                  <p className="text-xs text-[#C8AA74] flex items-center gap-1.5 font-medium">
                    <Info className="w-3.5 h-3.5 shrink-0 text-[#A68A56]" />
                    Asking price is {Math.abs(property.marketInsights.diffPercent)}%{' '}
                    {property.marketInsights.diffPercent >= 0 ? 'above' : 'below'} recent block average.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-white mb-2">Description</h2>
            <div className="text-xs md:text-sm text-white/70 leading-relaxed">
              <p className={isDescriptionExpanded ? '' : 'line-clamp-3'}>
                {property.description}
              </p>
            </div>
            <button
              id="read-more-description-btn"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2.5 text-[#C8AA74] text-xs font-bold uppercase tracking-wider hover:underline"
            >
              {isDescriptionExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>

          {/* Facilities Section */}
          <div className="pt-6">
            <h2 className="font-serif text-lg font-bold text-white mb-3">Facilities</h2>
            <div className="flex flex-wrap gap-2">
              {property.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="bg-[#141414] px-3.5 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-sm"
                >
                  {fac.toLowerCase().includes('pool') && <Waves className="w-4 h-4 text-[#A68A56]" />}
                  {fac.toLowerCase().includes('gym') && <Dumbbell className="w-4 h-4 text-[#A68A56]" />}
                  {fac.toLowerCase().includes('garden') && <Trees className="w-4 h-4 text-[#A68A56]" />}
                  {!fac.toLowerCase().includes('pool') &&
                    !fac.toLowerCase().includes('gym') &&
                    !fac.toLowerCase().includes('garden') && (
                      <Sparkles className="w-4 h-4 text-[#A68A56]" />
                    )}
                  <span className="text-xs font-medium text-white/90">{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Sticky Bottom Action Bar with Marcus Tan */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#080808]/95 backdrop-blur-xl pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.8)] z-40 border-t border-white/10">
        <div className="flex items-center gap-3 md:gap-4 max-w-[1200px] mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#181818] overflow-hidden shrink-0 border-2 border-[#A68A56]">
            <img
              className="w-full h-full object-cover"
              src={property.agent.avatar}
              alt={property.agent.name}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-bold text-white truncate">{property.agent.name}</p>
            <p className="text-xs text-[#C8AA74] truncate">{property.agent.title}</p>
          </div>
          <button
            id="contact-agent-main-btn"
            onClick={() => setIsContactOpen(true)}
            className="h-11 px-5 md:px-6 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#0A0A0A]" />
            Contact Agent
          </button>
        </div>
      </div>

      {/* Modals */}
      <ContactAgentModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        agent={property.agent}
        property={property}
      />
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.galleryImages}
        title={property.title}
      />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        property={property}
      />
    </div>
  );
};
