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
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer border border-slate-200 text-left group"
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badges Stack */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {property.isNewLaunch && (
            <div className="bg-[#0F172A]/90 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                New Launch
              </span>
            </div>
          )}

          {property.propertyType === 'HDB' && (
            <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-slate-200">
              <span className="text-[10px] text-slate-800 font-bold uppercase tracking-wider">
                HDB
              </span>
            </div>
          )}

          {property.isFreehold && !property.isNewLaunch && (
            <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-slate-200">
              <span className="text-[10px] text-slate-800 font-bold uppercase tracking-wider">
                Freehold
              </span>
            </div>
          )}

          {property.isProfessionalPick && (
            <div className="bg-sky-600 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-white" />
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                Professional Pick
              </span>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          id={`fav-btn-${property.id}`}
          onClick={(e) => onToggleFavorite(property.id, e)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md transition-all z-10 hover:scale-110 active:scale-95 border border-slate-200 ${
            isFavorite ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorite ? '#EF4444' : 'none'}
            stroke={isFavorite ? '#EF4444' : 'currentColor'}
          />
        </button>
      </div>

      {/* Card Content Details */}
      <div className="p-4 bg-white">
        {/* Title & Price Header */}
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <h3 className="font-serif font-semibold text-base md:text-lg text-slate-900 leading-tight group-hover:text-[#0284C7] transition-colors">
              {property.title}
            </h3>
            <p className="text-[13px] text-slate-500 mt-0.5">{property.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-serif font-bold text-base md:text-lg text-slate-900 leading-tight">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-[12px] text-[#0284C7] font-mono font-medium">${property.psf.toLocaleString()} psf</p>
          </div>
        </div>

        {/* Specs Pill Badges (Bed, Bath, Sqft) */}
        <div className="flex items-center gap-2 mt-3 mb-3">
          <div className="flex items-center gap-1.5 bg-slate-50 py-1 px-2.5 rounded-md border border-slate-200/80">
            <Bed className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[12px] font-medium text-slate-700">{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 py-1 px-2.5 rounded-md border border-slate-200/80">
            <Bath className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[12px] font-medium text-slate-700">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 py-1 px-2.5 rounded-md border border-slate-200/80">
            <Square className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[12px] font-medium text-slate-700">
              {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Footer info: School Distance & Tenure */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[#0369A1]">
            <MapPin className="w-4 h-4 shrink-0 text-[#0284C7]" />
            <span className="text-[12px] font-semibold">{property.distanceToSchool}</span>
          </div>
          <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-medium">
            {property.tenure}
          </span>
        </div>
      </div>
    </div>
  );
};
