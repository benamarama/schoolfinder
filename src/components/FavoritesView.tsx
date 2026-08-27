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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col pt-4 pb-24 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-center my-4 text-left">
        <div>
          <h1 className="serif text-xl md:text-2xl font-bold text-slate-900">Saved Properties</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {favoriteProperties.length} properties shortlisted for comparison
          </p>
        </div>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm my-6">
          <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="serif text-lg font-bold text-slate-900">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Tap the heart icon on any listing card while browsing properties near Rosyth or Nanyang Primary to save and compare them side by side.
          </p>
          <button
            onClick={onNavigateToBrowse}
            className="px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Explore Active Listings
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Side-by-side Institutional Comparison Matrix if 2 or more items */}
          {favoriteProperties.length >= 2 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-left overflow-x-auto">
              <div className="flex items-center gap-2 mb-3 text-[#0284C7]">
                <Scale className="w-4 h-4" />
                <h3 className="serif font-bold text-sm text-slate-900">Direct Investment Comparison</h3>
              </div>

              <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-2.5 font-semibold text-slate-600 uppercase tracking-wider text-[11px]">Metric</th>
                    {favoriteProperties.map((p) => (
                      <th key={p.id} className="p-2.5 font-bold text-slate-900">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-500">Price</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 font-bold text-[#0284C7]">
                        S$ {p.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-500">PSF</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 font-mono text-slate-800 font-medium">
                        S$ {p.psf} PSF
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-500">Bedrooms / Bath</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-slate-700">
                        {p.bedrooms} Bed • {p.bathrooms} Bath ({p.sqft} sqft)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-500">School Distance</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-[#0369A1] font-semibold">
                        {p.distanceToSchool}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-500">Tenure</td>
                    {favoriteProperties.map((p) => (
                      <td key={p.id} className="p-2.5 text-slate-700">
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
