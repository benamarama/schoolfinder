import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Heart, Scale, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  allProperties: Property[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onNavigateToBrowse: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  allProperties,
  onToggleFavorite,
  onSelectProperty,
  onNavigateToBrowse,
}) => {
  const favoriteProperties = allProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col pt-16 pb-24 max-w-[1200px] mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center my-4 text-left">
        <div>
          <h1 className="serif text-xl md:text-2xl font-bold text-white">Saved Properties</h1>
          <p className="text-xs text-white/50 mt-0.5">
            {favoriteProperties.length} properties shortlisted for comparison
          </p>
        </div>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="bg-[#141414] rounded-2xl p-12 text-center border border-white/10 shadow-2xl my-6">
          <div className="w-16 h-16 bg-[#ba1a1a]/15 border border-[#ba1a1a]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff8080]">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="serif text-lg font-bold text-white">No Favorites Saved Yet</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto mt-1 mb-6">
            Tap the heart icon on any listing card while browsing properties near Rosyth or Nanyang Primary to save and compare them side by side.
          </p>
          <button
            onClick={onNavigateToBrowse}
            className="px-6 py-3 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
          >
            Explore Active Listings
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Side-by-side Institutional Comparison Matrix if 2 or more items */}
          {favoriteProperties.length >= 2 && (
            <div className="bg-[#141414] rounded-2xl p-4 shadow-xl border border-white/10 text-left overflow-x-auto">
              <div className="flex items-center gap-2 mb-3 text-[#A68A56]">
                <Scale className="w-4 h-4" />
                <h3 className="serif font-bold text-sm text-white">Direct Investment Comparison</h3>
              </div>

              <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#1A1A1A]">
                    <th className="p-2.5 font-semibold text-white/60 uppercase tracking-wider text-[11px]">Metric</th>
                    {favoriteProperties.map((p) => (
                      <th key={p.id} className="p-2.5 font-bold text-white">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-2.5 font-medium text-white/50">Price</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 font-bold text-[#C8AA74]">
                        S$ {p.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white/50">PSF</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 font-mono text-white/90">
                        S$ {p.psf} PSF
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white/50">Bedrooms / Bath</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-white/80">
                        {p.bedrooms} Bed • {p.bathrooms} Bath ({p.sqft} sqft)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white/50">School Distance</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-[#C8AA74] font-semibold">
                        {p.distanceToSchool}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white/50">Tenure</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-white/80">
                        {p.tenure}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
