import React from 'react';
import { Map, Building2, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'search' | 'listings' | 'favorites' | 'profile';
  onSelectTab: (tab: 'search' | 'listings' | 'favorites' | 'profile') => void;
  favoritesCount: number;
}

interface NavItem {
  id: 'search' | 'listings' | 'favorites' | 'profile';
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: number | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
}) => {
  const navItems: NavItem[] = [
    { id: 'search', label: 'Search', icon: Map },
    { id: 'listings', label: 'Listings', icon: Building2 },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: favoritesCount > 0 ? favoritesCount : null },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="main-bottom-navigation"
      className="fixed bottom-0 w-full z-40 bg-[#0A0A0A]/95 backdrop-blur-xl pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.6)] border-t border-white/10"
    >
      <div className="flex justify-between items-center h-16 px-4 max-w-[1200px] mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive
                  ? 'text-[#A68A56] font-bold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A68A56] text-[#0A0A0A] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-wider uppercase ${isActive ? 'text-[#C8AA74]' : 'text-white/40'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
