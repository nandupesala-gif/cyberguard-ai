import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { CrimeType } from '../../types';
import { 
  HOTSPOT_ZONES, 
  DISTRICT_RISK_PROFILES 
} from '../../data/cybercrimeData';
import { 
  Layers, 
  Search, 
  Maximize2, 
  RotateCcw, 
  MapPin, 
  Crosshair,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface GisRiskMapProps {
  heightClass?: string;
  isCompactDashboard?: boolean;
}

export const GisRiskMap: React.FC<GisRiskMapProps> = ({ 
  heightClass = "h-[540px]",
  isCompactDashboard = false
}) => {
  const { 
    selectedDistrict, 
    setSelectedDistrict, 
    selectedCrimeType, 
    setSelectedCrimeType,
    selectedTimePeriod, 
    setSelectedTimePeriod,
    setCurrentRoute,
    incidents
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{
    heatLayerGroup: L.LayerGroup;
    hotspotLayerGroup: L.LayerGroup;
    incidentLayerGroup: L.LayerGroup;
    cyberCellLayerGroup: L.LayerGroup;
  } | null>(null);

  // Layer toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showCyberCells, setShowCyberCells] = useState(false);
  const [mapStyle, setMapStyle] = useState<'dark' | 'streets'>('dark');
  const [localSearch, setLocalSearch] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(!isCompactDashboard);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center on Kurnool, Andhra Pradesh
    const initialLat = 15.8281;
    const initialLng = 78.0373;
    const initialZoom = isCompactDashboard ? 9 : 10;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: initialZoom,
      zoomControl: false, // custom placed
      attributionControl: false
    });

    // Dark Matter CartoDB tiles
    const tileUrl = mapStyle === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const baseTileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Zoom control in bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer groups
    const heatLayerGroup = L.layerGroup().addTo(map);
    const hotspotLayerGroup = L.layerGroup().addTo(map);
    const incidentLayerGroup = L.layerGroup().addTo(map);
    const cyberCellLayerGroup = L.layerGroup();

    layersGroupRef.current = {
      heatLayerGroup,
      hotspotLayerGroup,
      incidentLayerGroup,
      cyberCellLayerGroup
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layersGroupRef.current = null;
    };
  }, []);

  // Update Base Tile Layer if mapStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    
    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = mapStyle === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
  }, [mapStyle]);

  // Update Markers, Heat Circles, and Hotspots
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const { heatLayerGroup, hotspotLayerGroup, incidentLayerGroup, cyberCellLayerGroup } = layersGroupRef.current;

    heatLayerGroup.clearLayers();
    hotspotLayerGroup.clearLayers();
    incidentLayerGroup.clearLayers();
    cyberCellLayerGroup.clearLayers();

    // 1. Heatmap layer (Visual graduated density circles with soft blurred opacity)
    if (showHeatmap) {
      Object.values(DISTRICT_RISK_PROFILES).forEach((district) => {
        const isHigh = district.currentRiskScore >= 75;
        const isMed = district.currentRiskScore >= 50 && district.currentRiskScore < 75;
        const color = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981';

        // Outer heat corona
        const outerCircle = L.circle([district.lat, district.lng], {
          radius: 22000,
          color: 'transparent',
          fillColor: color,
          fillOpacity: 0.16,
          weight: 0
        });
        heatLayerGroup.addLayer(outerCircle);

        // Middle heat core
        const middleCircle = L.circle([district.lat, district.lng], {
          radius: 12000,
          color: 'transparent',
          fillColor: color,
          fillOpacity: 0.28,
          weight: 0
        });
        heatLayerGroup.addLayer(middleCircle);

        // Inner dense core
        const innerCircle = L.circle([district.lat, district.lng], {
          radius: 5500,
          color: color,
          fillColor: color,
          fillOpacity: 0.55,
          weight: 1.5
        });

        // Popup with exact required specs
        const popupContent = `
          <div style="font-family: inherit; min-width: 210px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-bottom: 8px;">
              <div style="font-size: 14px; font-weight: 700; color: #fff;">${district.district}</div>
              <span style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: ${color}25; color: ${color}; border: 1px solid ${color}60;">
                ${district.riskLevel} RISK
              </span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; margin-bottom: 8px;">
              <div>
                <div style="color: #94a3b8; font-size: 10px;">Risk Score</div>
                <div style="font-size: 16px; font-weight: 800; color: ${color};">${district.currentRiskScore}/100</div>
              </div>
              <div>
                <div style="color: #94a3b8; font-size: 10px;">Predicted Incidents</div>
                <div style="font-size: 14px; font-weight: 700; color: #e2e8f0;">${district.predictedIncidentsRange[0]}–${district.predictedIncidentsRange[1]}</div>
              </div>
            </div>

            <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 10px; line-height: 1.4;">
              <span style="color: #94a3b8;">Top Threat:</span> <strong style="color: #38bdf8;">${district.topCrimeType}</strong>
            </div>

            <button 
              id="view-pred-${district.district}" 
              style="width: 100%; padding: 6px 10px; border-radius: 6px; background: #0284c7; color: #fff; font-size: 11px; font-weight: 600; border: none; cursor: pointer; text-align: center;"
            >
              View Deep AI Prediction →
            </button>
          </div>
        `;

        innerCircle.bindPopup(popupContent);
        innerCircle.on('popupopen', () => {
          const btn = document.getElementById(`view-pred-${district.district}`);
          if (btn) {
            btn.onclick = () => {
              setSelectedDistrict(district.district);
              setCurrentRoute('predictions');
            };
          }
        });

        heatLayerGroup.addLayer(innerCircle);
      });
    }

    // 2. Hotspots Layer (Clusters)
    if (showHotspots) {
      HOTSPOT_ZONES.forEach((hs) => {
        const isSelectedDistrict = hs.district.toLowerCase() === selectedDistrict.toLowerCase();
        const strokeColor = hs.riskLevel === 'HIGH' || hs.riskLevel === 'CRITICAL' ? '#f43f5e' : '#eab308';

        const hotspotCircle = L.circle([hs.lat, hs.lng], {
          radius: hs.radiusMeters,
          color: strokeColor,
          dashArray: '4, 4',
          fillColor: strokeColor,
          fillOpacity: 0.22,
          weight: isSelectedDistrict ? 2.5 : 1.5
        });

        const hsContent = `
          <div style="font-family: inherit; min-width: 200px;">
            <div style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 2px;">
              ${hs.name}
            </div>
            <div style="font-size: 10px; color: #94a3b8; margin-bottom: 6px;">
              District: ${hs.district} • Density: ${hs.crimeDensity}/km²
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; background: #090d16; padding: 6px 8px; border-radius: 6px; margin-bottom: 6px; border: 1px solid #1e293b;">
              <span style="color: #94a3b8;">Hotspot Score:</span>
              <strong style="color: ${strokeColor}; font-weight: 800;">${hs.hotspotScore}/100</strong>
            </div>
            <div style="font-size: 10px; color: #cbd5e1;">
              Primary Threat: <span style="color: #38bdf8; font-weight: 600;">${hs.primaryThreat}</span>
            </div>
          </div>
        `;
        hotspotCircle.bindPopup(hsContent);
        hotspotLayerGroup.addLayer(hotspotCircle);
      });
    }

    // 3. Live Incidents Layer (Markers)
    if (showIncidents) {
      let filteredIncidents = incidents;
      if (selectedCrimeType !== 'All Types') {
        filteredIncidents = filteredIncidents.filter(i => i.crimeType === selectedCrimeType);
      }

      filteredIncidents.forEach((inc) => {
        const markerColor = inc.severity === 'CRITICAL' 
          ? '#ef4444' 
          : inc.severity === 'HIGH' 
          ? '#f97316' 
          : inc.severity === 'MEDIUM' 
          ? '#eab308' 
          : '#06b6d4';

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background-color: ${markerColor};
              border: 2px solid #ffffff;
              box-shadow: 0 0 10px ${markerColor};
              cursor: pointer;
            "></div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([inc.lat, inc.lng], { icon: customIcon });
        const incPopup = `
          <div style="font-family: inherit; min-width: 220px;">
            <div style="font-size: 10px; font-weight: 800; color: ${markerColor}; text-transform: uppercase; margin-bottom: 2px;">
              [${inc.severity}] ${inc.status}
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 4px;">
              ${inc.crimeType}
            </div>
            <div style="font-size: 11px; color: #cbd5e1; line-height: 1.4; margin-bottom: 6px;">
              ${inc.description}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; border-top: 1px solid #334155; padding-top: 4px;">
              <span>${inc.district}</span>
              <span>${inc.timestamp}</span>
            </div>
          </div>
        `;
        marker.bindPopup(incPopup);
        incidentLayerGroup.addLayer(marker);
      });
    }

    // 4. Cyber Cells
    if (showCyberCells) {
      const cyberOffices = [
        { name: 'Kurnool Range Cyber Crime Police Station', lat: 15.8281, lng: 78.0373, phone: '08518-220100' },
        { name: 'State Cyber Crime CID Headquarters, AP', lat: 16.5062, lng: 80.6480, phone: '0866-2424100' },
        { name: 'Visakhapatnam City Cyber Police Station', lat: 17.7042, lng: 83.2982, phone: '0891-2565455' }
      ];

      cyberOffices.forEach(office => {
        const policeIcon = L.divIcon({
          className: 'police-station-marker',
          html: `
            <div style="
              background: #0284c7;
              color: white;
              padding: 4px 6px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
              border: 1px solid #38bdf8;
              white-space: nowrap;
              box-shadow: 0 4px 6px rgba(0,0,0,0.4);
            ">
              🛡️ CYBER CELL
            </div>
          `,
          iconAnchor: [30, 15]
        });

        const marker = L.marker([office.lat, office.lng], { icon: policeIcon });
        marker.bindPopup(`
          <div style="font-size: 12px; font-weight: bold; color: #fff;">${office.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Nodal Contact: <strong>${office.phone}</strong></div>
          <div style="font-size: 10px; color: #10b981; margin-top: 4px;">✓ 24x7 1930 Integration Active</div>
        `);
        cyberCellLayerGroup.addLayer(marker);
      });

      if (!mapInstanceRef.current.hasLayer(cyberCellLayerGroup)) {
        cyberCellLayerGroup.addTo(mapInstanceRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(cyberCellLayerGroup)) {
        mapInstanceRef.current.removeLayer(cyberCellLayerGroup);
      }
    }
  }, [showHeatmap, showHotspots, showIncidents, showCyberCells, selectedDistrict, selectedCrimeType, incidents]);

  // Center on selected district when district changes
  const handleFlyToDistrict = (distName: string) => {
    setSelectedDistrict(distName);
    const target = DISTRICT_RISK_PROFILES[distName];
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], 11, {
        duration: 1.2
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    const match = Object.keys(DISTRICT_RISK_PROFILES).find(d => 
      d.toLowerCase().includes(localSearch.toLowerCase())
    );
    if (match) {
      handleFlyToDistrict(match);
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([15.8281, 78.0373], isCompactDashboard ? 9 : 10, { duration: 1 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col shadow-xl">
      {/* Top Filter & Control Toolbar */}
      <div className="bg-slate-900/90 border-b border-slate-800/90 p-3 px-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex flex-wrap items-center gap-2">
          {/* Location / State */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white">Andhra Pradesh</span>
          </div>

          {/* District Selector */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedDistrict}
              onChange={(e) => handleFlyToDistrict(e.target.value)}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer"
            >
              {Object.keys(DISTRICT_RISK_PROFILES).map((dist) => (
                <option key={dist} value={dist} className="bg-slate-900 text-white">
                  District: {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Crime Type Selector */}
          <div className="hidden sm:flex items-center gap-1.5">
            <select
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value as CrimeType)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer"
            >
              <option value="All Types">Crime: All Types</option>
              <option value="Online Financial Fraud">Online Financial Fraud</option>
              <option value="Phishing">Phishing</option>
              <option value="Identity Theft">Identity Theft</option>
              <option value="UPI / Payment Gateway Scams">UPI / Payment Scams</option>
              <option value="Social Media Scams">Social Media Scams</option>
              <option value="Cyberstalking">Cyberstalking</option>
            </select>
          </div>

          {/* Time Period */}
          <div className="hidden md:flex items-center gap-1.5">
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer"
            >
              <option value="Next 7 Days">Horizon: Next 7 Days</option>
              <option value="Next 30 Days">Horizon: Next 30 Days</option>
              <option value="Next 60 Days">Horizon: Next 60 Days</option>
            </select>
          </div>

          {/* Action Button: SHOW RISK */}
          <button
            onClick={() => handleFlyToDistrict(selectedDistrict)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>SHOW RISK</span>
          </button>
        </div>

        {/* Search and Layer Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search district (e.g. Kurnool)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-36 sm:w-48 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyan-500 font-mono"
            />
          </form>

          {/* Layer toggles dropdown trigger */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              isFilterPanelOpen 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
            }`}
            title="Toggle GIS Layers"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline text-[11px] font-semibold">Layers</span>
          </button>

          {/* Recenter */}
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Body Canvas */}
      <div className={`relative w-full ${heightClass}`}>
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating GIS Layers Panel (Collapsible) */}
        {isFilterPanelOpen && (
          <div className="absolute top-3 left-3 z-[400] bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md w-56 text-xs text-slate-200">
            <div className="flex items-center justify-between font-bold text-slate-100 pb-2 mb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                GIS Map Layers
              </span>
              <button 
                onClick={() => setIsFilterPanelOpen(false)}
                className="text-slate-400 hover:text-white text-[10px]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/50 p-1 rounded">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  Heatmap Density
                </span>
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/50 p-1 rounded">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-dashed border-rose-400" />
                  Risk Zones (Getis-Ord)
                </span>
                <input
                  type="checkbox"
                  checked={showHotspots}
                  onChange={(e) => setShowHotspots(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/50 p-1 rounded">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Live Incidents
                </span>
                <input
                  type="checkbox"
                  checked={showIncidents}
                  onChange={(e) => setShowIncidents(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/50 p-1 rounded">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Cyber Crime Cells
                </span>
                <input
                  type="checkbox"
                  checked={showCyberCells}
                  onChange={(e) => setShowCyberCells(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="pt-2.5 mt-2.5 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">Tile Style:</span>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setMapStyle('dark')}
                  className={`py-1 px-2 rounded text-[10px] font-semibold cursor-pointer ${
                    mapStyle === 'dark' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Carto Dark
                </button>
                <button
                  type="button"
                  onClick={() => setMapStyle('streets')}
                  className={`py-1 px-2 rounded text-[10px] font-semibold cursor-pointer ${
                    mapStyle === 'streets' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  OpenStreet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating High/Med/Low Legend (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 border border-slate-800/90 rounded-xl p-2.5 px-3 shadow-xl backdrop-blur-md text-[11px]">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1 tracking-wider">
            Risk Intensity Legend
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
              <span className="text-slate-200 font-medium">High (76–100)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-slate-200 font-medium">Med (51–75)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="text-slate-200 font-medium">Low (0–50)</span>
            </div>
          </div>
        </div>

        {/* Focus Banner (Top Right) */}
        <div className="absolute top-3 right-3 z-[400] bg-slate-900/90 border border-slate-800 rounded-xl p-2 px-3 shadow-lg backdrop-blur-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono text-slate-300">
            Focused: <strong className="text-cyan-300">{selectedDistrict}</strong> ({DISTRICT_RISK_PROFILES[selectedDistrict]?.riskLevel} Risk)
          </span>
        </div>
      </div>
    </div>
  );
};
