import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, MapPin, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <div
      id={`property-card-${property.id}`}
      onClick={() => onSelect(property)}
      className="block bg-[#121212] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#A68A56]/60 transition-all duration-300 cursor-pointer border border-white/10 text-left group"
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/3] bg-[#181818] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badges Stack */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {property.isNewLaunch && (
            <div className="bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-[#A68A56]/40">
              <Sparkles className="w-3 h-3 text-[#A68A56]" />
              <span className="text-[10px] text-[#C8AA74] font-bold uppercase tracking-wider">
                New Launch
              </span>
            </div>
          )}

          {property.propertyType === 'HDB' && (
            <div className="bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md border border-white/10">
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                HDB
              </span>
            </div>
          )}

          {property.isFreehold && !property.isNewLaunch && (
            <div className="bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md border border-white/10">
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                Freehold
              </span>
            </div>
          )}

          {property.isProfessionalPick && (
            <div className="bg-[#A68A56] backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3 text-[#0A0A0A]" />
              <span className="text-[10px] text-[#0A0A0A] font-bold uppercase tracking-wider">
                Professional Pick
              </span>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          id={`fav-btn-${property.id}`}
          onClick={(e) => onToggleFavorite(property.id, e)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-md transition-all z-10 hover:scale-110 active:scale-95 border border-white/15 ${
            isFavorite ? 'text-[#E55353]' : 'text-white/70 hover:text-[#E55353]'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorite ? '#E55353' : 'none'}
            stroke={isFavorite ? '#E55353' : 'currentColor'}
          />
        </button>
      </div>

      {/* Card Content Details */}
      <div className="p-4 bg-[#121212]">
        {/* Title & Price Header */}
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <h3 className="font-serif font-semibold text-base md:text-lg text-white leading-tight group-hover:text-[#C8AA74] transition-colors">
              {property.title}
            </h3>
            <p className="text-[13px] text-white/50 mt-0.5">{property.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-serif font-bold text-base md:text-lg text-white leading-tight">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-[12px] text-[#C8AA74] font-mono">${property.psf.toLocaleString()} psf</p>
          </div>
        </div>

        {/* Specs Pill Badges (Bed, Bath, Sqft) */}
        <div className="flex items-center gap-2 mt-3 mb-3">
          <div className="flex items-center gap-1.5 bg-white/[0.04] py-1 px-2.5 rounded-md border border-white/10">
            <Bed className="w-3.5 h-3.5 text-[#A68A56]" />
            <span className="text-[12px] font-medium text-white/90">{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.04] py-1 px-2.5 rounded-md border border-white/10">
            <Bath className="w-3.5 h-3.5 text-[#A68A56]" />
            <span className="text-[12px] font-medium text-white/90">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.04] py-1 px-2.5 rounded-md border border-white/10">
            <Square className="w-3.5 h-3.5 text-[#A68A56]" />
            <span className="text-[12px] font-medium text-white/90">
              {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Footer info: School Distance & Tenure */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[#C8AA74]">
            <MapPin className="w-4 h-4 shrink-0 text-[#A68A56]" />
            <span className="text-[12px] font-semibold">{property.distanceToSchool}</span>
          </div>
          <span className="text-[11px] text-white/60 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded font-medium">
            {property.tenure}
          </span>
        </div>
      </div>
    </div>
  );
};
