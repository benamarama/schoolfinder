import React, { useState, useEffect, useMemo } from 'react';
import { Property } from '../types';
import {
  School,
  Navigation,
  Check,
  Sparkles,
  Bed,
  Bath,
  ArrowRight,
  Search,
  MapPin,
  Compass,
  Layers,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
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
  const [activePropertyId, setActivePropertyId] = useState<string>('');
  const [radiusKm, setRadiusKm] = useState<1 | 2>(1);
  const [mapMode, setMapMode] = useState<'radar' | 'osm'>('radar');

  // Synchronize internal state with incoming prop
  useEffect(() => {
    if (initialSchool && initialSchool !== selectedSchool) {
      setSelectedSchool(initialSchool);
    }
  }, [initialSchool]);

  // Set default active property when properties change
  useEffect(() => {
    if (properties && properties.length > 0) {
      // If current active property is not in the new list, pick the first one
      if (!properties.some((p) => p.id === activePropertyId)) {
        setActivePropertyId(properties[0].id);
      }
    } else {
      setActivePropertyId('');
    }
  }, [properties]);

  const activeSchool = useMemo(() => {
    return getSchoolByName(selectedSchool) || ALL_SINGAPORE_PRIMARY_SCHOOLS[0];
  }, [selectedSchool]);

  const filteredSchoolOptions = useMemo(() => {
    if (!schoolSearchQuery.trim()) return ALL_SINGAPORE_PRIMARY_SCHOOLS.slice(0, 35);
    const q = schoolSearchQuery.toLowerCase();
    return ALL_SINGAPORE_PRIMARY_SCHOOLS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.zone.toLowerCase().includes(q) ||
        s.postalCode.includes(q)
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

  // Filter properties by currently selected radius on the map
  const visibleMapProperties = useMemo(() => {
    return properties.filter((p) => radiusKm === 2 || p.distanceKm <= 1.05);
  }, [properties, radiusKm]);

  const activeProperty = useMemo(() => {
    return (
      visibleMapProperties.find((p) => p.id === activePropertyId) ||
      visibleMapProperties[0] ||
      properties[0]
    );
  }, [visibleMapProperties, activePropertyId, properties]);

  // Calculate dynamic GPS pin positions on the 2D radar plane
  const getPinRadarStyle = (prop: Property) => {
    const dLatKm = (prop.coordinates.lat - activeSchool.lat) * 110.574;
    const dLngKm =
      (prop.coordinates.lng - activeSchool.lng) *
      (111.32 * Math.cos((activeSchool.lat * Math.PI) / 180));

    // Dynamic viewport boundary: 1.3km radius for 1km view, 2.4km radius for 2km view
    const spanKm = radiusKm === 1 ? 1.35 : 2.45;

    // Convert to percentage with clamping inside map bounds
    const left = Math.max(10, Math.min(90, 50 + (dLngKm / spanKm) * 40));
    const top = Math.max(10, Math.min(90, 50 - (dLatKm / spanKm) * 40));

    return {
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col pt-16 pb-24 max-w-[1200px] mx-auto px-4">
      {/* Top Search / Radius Control Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4 text-left relative z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[#0284C7]">
              <Compass className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                MOE Primary 1 Radius Engine
              </span>
            </div>
            <h2 className="serif text-lg md:text-xl font-bold text-slate-900 mt-0.5">
              School Catchment & Verified Properties Map
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* School Selector Dropdown / Search Trigger */}
            <div className="relative">
              <button
                type="button"
                id="map-school-selector-btn"
                onClick={() => setIsSchoolPickerOpen(!isSchoolPickerOpen)}
                className="flex items-center gap-2 bg-sky-50/70 hover:bg-sky-100/70 px-3.5 py-2 rounded-xl border border-sky-200 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
              >
                <School className="w-4 h-4 text-[#0284C7]" />
                <span className="max-w-[210px] truncate">{selectedSchool}</span>
                <span className="text-[10px] text-slate-500">▼</span>
              </button>

              {/* School Picker Popover */}
              {isSchoolPickerOpen && (
                <div className="absolute top-full mt-1.5 right-0 md:left-0 w-84 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 text-left animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Select Primary School (185+)
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      Live Geo-Anchored
                    </span>
                  </div>

                  <div className="relative mb-2.5">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={schoolSearchQuery}
                      onChange={(e) => setSchoolSearchQuery(e.target.value)}
                      placeholder="Search school name, estate (e.g. Tao Nan, Bishan, Nanyang)..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1">
                    {filteredSchoolOptions.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No school found matching &quot;{schoolSearchQuery}&quot;
                      </div>
                    ) : (
                      filteredSchoolOptions.map((s) => (
                        <button
                          key={s.name}
                          onClick={() => handleSchoolChange(s.name)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors my-0.5 ${
                            selectedSchool === s.name
                              ? 'bg-sky-50 text-[#0284C7] font-bold border border-sky-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{s.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {s.area} • {s.zone} Zone • S({s.postalCode})
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {s.isPopularGep && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-bold">
                                GEP
                              </span>
                            )}
                            {selectedSchool === s.name && (
                              <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Radius Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
              <button
                type="button"
                onClick={() => setRadiusKm(1)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  radiusKm === 1
                    ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1 km Priority 1
              </button>
              <button
                type="button"
                onClick={() => setRadiusKm(2)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  radiusKm === 2
                    ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2 km Priority 2
              </button>
            </div>

            {/* Map Mode Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
              <button
                type="button"
                onClick={() => setMapMode('radar')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                  mapMode === 'radar'
                    ? 'bg-white text-[#0F172A] font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3 h-3 text-[#0284C7]" />
                Radar
              </button>
              <button
                type="button"
                onClick={() => setMapMode('osm')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                  mapMode === 'osm'
                    ? 'bg-white text-[#0F172A] font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3 h-3 text-[#0284C7]" />
                Street Tiles
              </button>
            </div>
          </div>
        </div>

        {/* Active School Geolocation Bar */}
        <div className="mt-2 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <School className="w-3.5 h-3.5 text-[#0284C7]" />
            Target School:{' '}
            <strong className="text-slate-900 font-semibold">{activeSchool.name}</strong>
          </span>
          <span>•</span>
          <span>
            Planning Area:{' '}
            <strong className="text-slate-800 font-semibold">{activeSchool.area}</strong>
          </span>
          <span>•</span>
          <span>
            Postal Code:{' '}
            <strong className="text-slate-800 font-mono font-semibold">
              S({activeSchool.postalCode})
            </strong>
          </span>
          <span>•</span>
          <span>
            GPS Anchor:{' '}
            <strong className="font-mono text-slate-700">
              {activeSchool.lat.toFixed(4)}°N, {activeSchool.lng.toFixed(4)}°E
            </strong>
          </span>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="relative w-full h-[400px] md:h-[480px] bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 mb-4 z-10 select-none">
        {mapMode === 'osm' ? (
          /* Live Interactive Mapnik/OSM Tiles Centered on School Coordinates */
          <iframe
            title="School Catchment OpenStreetMap"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${(
              activeSchool.lng - 0.018
            ).toFixed(4)}%2C${(activeSchool.lat - 0.015).toFixed(4)}%2C${(
              activeSchool.lng + 0.018
            ).toFixed(4)}%2C${(activeSchool.lat + 0.015).toFixed(
              4
            )}&layer=mapnik&marker=${activeSchool.lat}%2C${activeSchool.lng}`}
            className="w-full h-full border-0"
          />
        ) : (
          /* High-Precision Interactive Radar Engine */
          <div className="relative w-full h-full bg-[#0F172A] overflow-hidden">
            {/* Background Map Grid & Satellite Style Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* Singapore stylized satellite imagery backdrop */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y"
              alt="Singapore Property Satellite Map"
              className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
              referrerPolicy="no-referrer"
            />

            {/* Radar Circular Grid Lines */}
            {/* 2km Zone Circle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/30 bg-sky-500/5 pointer-events-none transition-all duration-500 ${
                radiusKm === 1 ? 'w-[440px] h-[440px]' : 'w-[360px] h-[360px]'
              }`}
            >
              <div className="absolute top-2 right-6 bg-slate-800/80 text-sky-300 border border-sky-400/40 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider">
                2.0 KM CATCHMENT
              </div>
            </div>

            {/* 1km Priority Circle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#0284C7] bg-[#0284C7]/20 pointer-events-none transition-all duration-500 ${
                radiusKm === 1 ? 'w-[280px] h-[280px]' : 'w-[200px] h-[200px]'
              }`}
            >
              <div className="absolute top-2 left-6 bg-[#0284C7] text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-md uppercase tracking-wider">
                1.0 KM PRIORITY 1 ZONE
              </div>
            </div>

            {/* Center School Anchor Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-30">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-2xl border-2 border-white font-bold ring-4 ring-sky-400/50 animate-pulse">
                  <School className="w-5 h-5" />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900" />
              </div>
              <div className="mt-1.5 bg-slate-900/90 text-white border border-sky-400/40 text-[11px] font-bold px-3 py-1 rounded-full shadow-xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{selectedSchool}</span>
              </div>
            </div>

            {/* Dynamic Verified Property Pins */}
            {visibleMapProperties.map((prop) => {
              const isSelected = prop.id === activePropertyId;
              const posStyle = getPinRadarStyle(prop);
              const isWithin1Km = prop.distanceKm <= 1.0;

              return (
                <button
                  key={prop.id}
                  type="button"
                  onClick={() => setActivePropertyId(prop.id)}
                  style={posStyle}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 hover:scale-125 focus:outline-none ${
                    isSelected ? 'scale-115 z-40' : 'scale-100 opacity-95'
                  }`}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-300/80 scale-105'
                        : isWithin1Km
                        ? 'bg-white text-slate-900 border-sky-400 hover:border-sky-600'
                        : 'bg-slate-800 text-slate-100 border-slate-600 hover:border-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px]">
                      ${(prop.price / 1000000).toFixed(2)}M
                    </span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                        isWithin1Km
                          ? 'bg-sky-100 text-[#0284C7]'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {prop.distanceKm}km
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Radar Coordinates Overlay & Info Badge */}
            <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-300 shadow-md flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                Verified SLA Distance: <strong className="text-white">{visibleMapProperties.length} Properties</strong>
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[10px] text-slate-400 shadow-md font-mono">
              Center: {activeSchool.lat.toFixed(4)}, {activeSchool.lng.toFixed(4)}
            </div>
          </div>
        )}
      </div>

      {/* Verified Properties Selector Chips & Stats */}
      <div className="flex items-center justify-between mb-3 text-left">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-slate-800">
            Verified Properties for {selectedSchool} ({visibleMapProperties.length})
          </h3>
        </div>
        <span className="text-xs text-slate-500">
          Showing {radiusKm === 1 ? '≤ 1.0 km Priority 1' : '≤ 2.0 km Catchment'}
        </span>
      </div>

      {/* Selected Property Preview Detail Card */}
      {activeProperty ? (
        <div
          onClick={() => onSelectProperty(activeProperty)}
          className="bg-white rounded-2xl p-4 shadow-sm border-2 border-sky-200 hover:border-[#0284C7] flex flex-col md:flex-row gap-4 items-center justify-between cursor-pointer transition-all text-left group"
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
              <p className="text-xs text-slate-500 mt-0.5">{activeProperty.subtitle}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-2">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#0284C7]" /> {activeProperty.bedrooms} Bed
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#0284C7]" /> {activeProperty.bathrooms} Bath
                </span>
                <span>•</span>
                <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                  {activeProperty.distanceToSchool}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div className="text-left md:text-right">
              <p className="serif font-bold text-lg text-slate-900">
                S$ {activeProperty.price.toLocaleString()}
              </p>
              <p className="font-mono text-xs text-[#0284C7] font-semibold">
                S$ {activeProperty.psf} PSF
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectProperty(activeProperty)}
              className="px-4 py-2.5 bg-[#0F172A] group-hover:bg-[#0284C7] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
            >
              Full Analysis
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 text-center text-slate-500 border border-slate-200">
          No verified properties in this immediate radius. Switch to 2 km Zone above to explore.
        </div>
      )}
    </div>
  );
};
