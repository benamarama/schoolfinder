import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { MapPin, School, Navigation, Layers, Check, Sparkles, Bed, Bath, ArrowRight, Search, GraduationCap } from 'lucide-react';
import { ALL_SINGAPORE_PRIMARY_SCHOOLS, getSchoolByName } from '../data/singaporeSchools';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  selectedSchool?: string;
  onSelectSchool?: (schoolName: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  onSelectProperty,
  selectedSchool: initialSchool = 'Rosyth School',
  onSelectSchool,
}) => {
  const [selectedSchool, setSelectedSchool] = useState(initialSchool);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [isSchoolPickerOpen, setIsSchoolPickerOpen] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState<string>(properties[0]?.id || '');
  const [radiusKm, setRadiusKm] = useState<1 | 2>(1);

  const activeSchool = useMemo(() => {
    return getSchoolByName(selectedSchool) || ALL_SINGAPORE_PRIMARY_SCHOOLS[0];
  }, [selectedSchool]);

  const filteredSchoolOptions = useMemo(() => {
    if (!schoolSearchQuery.trim()) return ALL_SINGAPORE_PRIMARY_SCHOOLS.slice(0, 30);
    const q = schoolSearchQuery.toLowerCase();
    return ALL_SINGAPORE_PRIMARY_SCHOOLS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.zone.toLowerCase().includes(q)
    );
  }, [schoolSearchQuery]);

  const handleSchoolChange = (schoolName: string) => {
    setSelectedSchool(schoolName);
    setIsSchoolPickerOpen(false);
    setSchoolSearchQuery('');
    if (onSelectSchool) {
      onSelectSchool(schoolName);
    }
  };

  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col pt-16 pb-24 max-w-[1200px] mx-auto px-4">
      {/* Top Search / Radius Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4 text-left relative z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[#0284C7]">
              <Navigation className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">Spatial Radius Explorer</span>
            </div>
            <h2 className="serif text-lg md:text-xl font-bold text-slate-900 mt-0.5">Singapore School Catchment Map</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* School Selector Dropdown / Search Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSchoolPickerOpen(!isSchoolPickerOpen)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 transition-colors"
              >
                <School className="w-4 h-4 text-[#0284C7]" />
                <span className="max-w-[200px] truncate">{selectedSchool}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {/* School Picker Popover */}
              {isSchoolPickerOpen && (
                <div className="absolute top-full mt-1 right-0 md:left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-left animate-fadeIn">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={schoolSearchQuery}
                      onChange={(e) => setSchoolSearchQuery(e.target.value)}
                      placeholder="Search any primary school..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#0284C7]"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                    {filteredSchoolOptions.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => handleSchoolChange(s.name)}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          selectedSchool === s.name
                            ? 'bg-sky-50 text-[#0284C7] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.area} • {s.zone} Zone</p>
                        </div>
                        {s.isPopularGep && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] px-1 py-0.2 rounded font-bold">
                            GEP
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Radius Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
              <button
                onClick={() => setRadiusKm(1)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  radiusKm === 1 ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1 km Priority
              </button>
              <button
                onClick={() => setRadiusKm(2)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  radiusKm === 2 ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2 km Zone
              </button>
            </div>
          </div>
        </div>

        {/* Active School Badge details */}
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-500">
          <span>Target: <strong className="text-slate-800">{activeSchool.name}</strong></span>
          <span>•</span>
          <span>Area: <strong className="text-slate-800">{activeSchool.area}</strong></span>
          <span>•</span>
          <span>Postal: <strong className="text-slate-800">S({activeSchool.postalCode})</strong></span>
          <span>•</span>
          <span>GPS: <strong className="font-mono text-slate-700">{activeSchool.lat.toFixed(4)}, {activeSchool.lng.toFixed(4)}</strong></span>
        </div>
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="relative w-full h-[380px] md:h-[450px] bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200 mb-4 z-10">
        {/* Background Map Graphic */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y"
          alt="Singapore Property Map"
          className="w-full h-full object-cover opacity-85 filter contrast-105 brightness-100"
          referrerPolicy="no-referrer"
        />

        {/* 1km/2km Radius Circle Representation */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#0284C7] bg-[#0284C7]/15 pointer-events-none transition-all duration-500 ${
            radiusKm === 1 ? 'w-64 h-64' : 'w-80 h-80'
          }`}
        >
          <div className="absolute top-2 right-4 bg-[#0284C7] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm uppercase tracking-wider">
            {radiusKm}km MOE Zone
          </div>
        </div>

        {/* Center School Anchor Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
          <div className="w-10 h-10 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xl border-2 border-white animate-bounce font-bold">
            <School className="w-5 h-5" />
          </div>
          <span className="mt-1 bg-white/95 text-slate-900 border border-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-md whitespace-nowrap">
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
            { top: '70%', left: '42%' },
            { top: '30%', left: '65%' },
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
                className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border transition-all ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-white ring-4 ring-sky-300/60'
                    : 'bg-white text-slate-900 border-slate-300 hover:border-[#0284C7]'
                }`}
              >
                <span className="font-mono">${(prop.price / 1000000).toFixed(2)}M</span>
              </div>
            </button>
          );
        })}

        {/* Floating Controls */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 shadow-sm">
          Showing <strong className="text-slate-900">{properties.length}</strong> verified properties in radar
        </div>
      </div>

      {/* Selected Property Preview Drawer */}
      {activeProperty && (
        <div
          onClick={() => onSelectProperty(activeProperty)}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between cursor-pointer hover:border-slate-300 transition-all text-left group"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200">
              <img
                src={activeProperty.image}
                alt={activeProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {activeProperty.propertyType}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="serif font-bold text-base md:text-lg text-slate-900 group-hover:text-[#0284C7] transition-colors">
                  {activeProperty.title}
                </h3>
                {activeProperty.isProfessionalPick && (
                  <span className="bg-sky-50 border border-sky-200 text-[#0284C7] text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Pro Pick
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{activeProperty.subtitle}</p>
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1.5">
                <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-[#0284C7]" /> {activeProperty.bedrooms} Bed</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#0284C7]" /> {activeProperty.bathrooms} Bath</span>
                <span>•</span>
                <span className="text-[#0369A1] font-medium">{activeProperty.distanceToSchool}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div className="text-left md:text-right">
              <p className="serif font-bold text-lg text-slate-900">S$ {activeProperty.price.toLocaleString()}</p>
              <p className="font-mono text-xs text-[#0284C7] font-semibold">S$ {activeProperty.psf} PSF</p>
            </div>
            <button
              onClick={() => onSelectProperty(activeProperty)}
              className="px-4 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
            >
              View Analysis
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
