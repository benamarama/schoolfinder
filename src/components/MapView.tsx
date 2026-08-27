import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, School, Navigation, Layers, Check, Sparkles, Bed, Bath, ArrowRight } from 'lucide-react';
import { MOCK_SCHOOLS } from '../data/mockProperties';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, onSelectProperty }) => {
  const [selectedSchool, setSelectedSchool] = useState('Rosyth School');
  const [activePropertyId, setActivePropertyId] = useState<string>(properties[0]?.id || '');
  const [radiusKm, setRadiusKm] = useState<1 | 2>(1);

  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col pt-16 pb-24 max-w-[1200px] mx-auto px-4">
      {/* Top Search / Radius Bar */}
      <div className="bg-[#141414] rounded-2xl p-4 shadow-xl border border-white/10 mb-4 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[#A68A56]">
              <Navigation className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8AA74]">Spatial Radius Explorer</span>
            </div>
            <h2 className="serif text-lg md:text-xl font-bold text-white mt-0.5">Singapore School Catchment Map</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#1A1A1A] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <School className="w-4 h-4 text-[#A68A56]" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer"
              >
                {MOCK_SCHOOLS.map((s) => (
                  <option key={s} value={s} className="bg-[#141414] text-white">{s}</option>
                ))}
              </select>
            </div>

            <div className="flex bg-[#0A0A0A] p-1 rounded-xl text-xs border border-white/10">
              <button
                onClick={() => setRadiusKm(1)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  radiusKm === 1 ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                1 km Boundary
              </button>
              <button
                onClick={() => setRadiusKm(2)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  radiusKm === 2 ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                2 km Radius
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="relative w-full h-[380px] md:h-[450px] bg-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-4">
        {/* Background Map Graphic */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y"
          alt="Singapore Property Map"
          className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-75 invert-[0.9] hue-rotate-180"
          referrerPolicy="no-referrer"
        />

        {/* 1km/2km Radius Circle Representation */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#A68A56] bg-[#A68A56]/10 pointer-events-none transition-all duration-500 ${
            radiusKm === 1 ? 'w-64 h-64' : 'w-80 h-80'
          }`}
        >
          <div className="absolute top-2 right-4 bg-[#A68A56] text-[#0A0A0A] text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md uppercase tracking-wider">
            {radiusKm}km MOE Zone
          </div>
        </div>

        {/* Center School Anchor Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
          <div className="w-10 h-10 rounded-full bg-[#A68A56] text-[#0A0A0A] flex items-center justify-center shadow-2xl border-2 border-white animate-bounce font-bold">
            <School className="w-5 h-5" />
          </div>
          <span className="mt-1 bg-[#0A0A0A]/90 text-white border border-white/20 text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-md whitespace-nowrap">
            {selectedSchool}
          </span>
        </div>

        {/* Property Pins scattered around */}
        {properties.map((prop, idx) => {
          const isSelected = prop.id === activePropertyId;
          const positions = [
            { top: '32%', left: '38%' },
            { top: '65%', left: '60%' },
            { top: '40%', left: '68%' },
            { top: '60%', left: '35%' },
            { top: '25%', left: '55%' },
          ];
          const pos = positions[idx % positions.length];

          return (
            <button
              key={prop.id}
              onClick={() => setActivePropertyId(prop.id)}
              style={pos}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 hover:scale-125 focus:outline-none ${
                isSelected ? 'scale-110 z-40' : 'scale-100 opacity-90'
              }`}
            >
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-xl flex items-center gap-1 border transition-all ${
                  isSelected
                    ? 'bg-[#A68A56] text-[#0A0A0A] border-white ring-4 ring-[#A68A56]/40'
                    : 'bg-[#141414] text-white border-white/20 hover:border-[#A68A56]'
                }`}
              >
                <span className="font-mono">${(prop.price / 1000000).toFixed(2)}M</span>
              </div>
            </button>
          );
        })}

        {/* Floating Controls */}
        <div className="absolute bottom-3 left-3 bg-[#141414]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white/70 shadow-md">
          Showing <strong className="text-white">{properties.length}</strong> verified properties in radar
        </div>
      </div>

      {/* Selected Property Preview Drawer */}
      {activeProperty && (
        <div
          onClick={() => onSelectProperty(activeProperty)}
          className="bg-[#141414] rounded-2xl p-4 shadow-xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between cursor-pointer hover:border-[#A68A56]/60 transition-all text-left group"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 relative bg-[#1A1A1A] border border-white/10">
              <img
                src={activeProperty.image}
                alt={activeProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 left-1 bg-[#0A0A0A]/85 text-white/90 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {activeProperty.propertyType}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="serif font-bold text-base md:text-lg text-white group-hover:text-[#C8AA74] transition-colors">
                  {activeProperty.title}
                </h3>
                {activeProperty.isProfessionalPick && (
                  <span className="bg-[#A68A56]/20 border border-[#A68A56]/40 text-[#C8AA74] text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Pro Pick
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50">{activeProperty.subtitle}</p>
              <div className="flex items-center gap-2 text-xs text-white/60 mt-1.5">
                <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-[#A68A56]" /> {activeProperty.bedrooms} Bed</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#A68A56]" /> {activeProperty.bathrooms} Bath</span>
                <span>•</span>
                <span className="text-[#C8AA74] font-medium">{activeProperty.distanceToSchool}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
            <div className="text-left md:text-right">
              <p className="serif font-bold text-lg text-white">S$ {activeProperty.price.toLocaleString()}</p>
              <p className="font-mono text-xs text-[#C8AA74]">S$ {activeProperty.psf} PSF</p>
            </div>
            <button
              onClick={() => onSelectProperty(activeProperty)}
              className="px-4 py-2.5 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-colors"
            >
              View Analysis
              <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
