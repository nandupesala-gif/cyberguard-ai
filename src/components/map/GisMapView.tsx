import React from 'react';
import { useApp } from '../../context/AppContext';
import { GisRiskMap } from './GisRiskMap';
import { 
  Map, 
  Layers, 
  MapPin, 
  ShieldAlert, 
  Activity, 
  Compass, 
  Filter, 
  Radio, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const GisMapView: React.FC = () => {
  const { selectedDistrict, setSelectedDistrict, allDistricts, activeDistrictData, setCurrentRoute } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              GIS SPATIO-TEMPORAL INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400">
              OpenStreetMap + Leaflet GIS Heatmap Engine
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            GIS CYBERCRIME RISK & HEATMAP LAB
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Spatial density analysis, predictive hot-spot cluster mapping, and territorial risk radii.
          </p>
        </div>

        {/* Territory Jump Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Pan to District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {Object.keys(allDistricts).map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-white">
                  {d} ({allDistricts[d].currentRiskScore}/100)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setCurrentRoute('predictions')}
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Risk Breakdown</span>
          </button>
        </div>
      </div>

      {/* Main Full-Size Map Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <GisRiskMap heightClass="h-[640px]" isCompactDashboard={false} />
      </div>

      {/* Territorial Quick Intelligence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(allDistricts).slice(0, 4).map((distName) => {
          const dist = allDistricts[distName];
          const isSelected = distName === selectedDistrict;

          return (
            <div
              key={distName}
              onClick={() => setSelectedDistrict(distName)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">{dist.district}</span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${
                  dist.currentRiskScore >= 75 ? 'bg-red-950 text-red-400 border-red-800' :
                  dist.currentRiskScore >= 50 ? 'bg-amber-950 text-amber-400 border-amber-800' :
                  'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}>
                  {dist.riskLevel}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-white font-display">
                  {dist.currentRiskScore}
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </span>
                <span className="text-xs text-cyan-300 font-mono">
                  {dist.predictedIncidentsRange[0]}–{dist.predictedIncidentsRange[1]} cases
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 truncate font-mono">
                Top: {dist.topCrimeType}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
