import React, { useState, useEffect } from 'react';
import { Property, FilterState } from './types';
import { MOCK_PROPERTIES } from './data/mockProperties';
import { ListingsView } from './components/ListingsView';
import { PropertyDetailView } from './components/PropertyDetailView';
import { MapView } from './components/MapView';
import { FavoritesView } from './components/FavoritesView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'listings' | 'favorites' | 'profile'>('listings');
  
  // Persistent Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('propradius_favorites');
      return saved ? JSON.parse(saved) : ['prop-affinity-at-serangoon'];
    } catch {
      return ['prop-affinity-at-serangoon'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('propradius_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Global Filter State
  const [filters, setFilters] = useState<FilterState>({
    propertyType: 'All',
    proximity: 'Within 1km',
    bedrooms: 'All',
    minPrice: 0,
    maxPrice: 5000000,
    sortBy: 'recommended',
    selectedSchool: 'Rosyth School',
    tenureType: 'All',
  });

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      propertyType: 'All',
      proximity: 'Within 1km',
      bedrooms: 'All',
      minPrice: 0,
      maxPrice: 5000000,
      sortBy: 'recommended',
      selectedSchool: 'Rosyth School',
      tenureType: 'All',
    });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToListings = () => {
    setSelectedProperty(null);
  };

  const handleSelectTab = (tab: 'search' | 'listings' | 'favorites' | 'profile') => {
    setSelectedProperty(null); // Return to main view when switching tabs
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0284C7]/20 selection:text-[#0F172A]">
      {/* If a property is selected, show Screen 1: Property Detail View */}
      {selectedProperty ? (
        <PropertyDetailView
          property={selectedProperty}
          onBack={handleBackToListings}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <>
          {/* Otherwise render the active tab */}
          {activeTab === 'listings' && (
            <ListingsView
              properties={MOCK_PROPERTIES}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              onNavigateTab={handleSelectTab}
            />
          )}

          {activeTab === 'search' && (
            <MapView
              properties={MOCK_PROPERTIES}
              onSelectProperty={handleSelectProperty}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              favorites={favorites}
              allProperties={MOCK_PROPERTIES}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              onNavigateToBrowse={() => setActiveTab('listings')}
            />
          )}

          {activeTab === 'profile' && <ProfileView />}

          {/* Bottom Nav Bar */}
          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            favoritesCount={favorites.length}
          />
        </>
      )}
    </div>
  );
}
