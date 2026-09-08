import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getRiskLevelFromScore } from '../../data/cybercrimeData';
import { generateExplainableAISummary, CURRENT_ML_METRICS } from '../../utils/mlEngine';
import { 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Smartphone, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  Info, 
  Sliders, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Zap
} from 'lucide-react';

export const RiskPredictionView: React.FC = () => {
  const { 
    activeDistrictData, 
    selectedDistrict, 
    setSelectedDistrict, 
    allDistricts, 
    riskThresholds, 
    setRiskThresholds,
    selectedTimePeriod,
    setSelectedTimePeriod,
    setCurrentRoute
  } = useApp();

  const [showThresholdConfig, setShowThresholdConfig] = useState(false);

  // Dynamic calculation based on configured thresholds
  const currentScore = activeDistrictData.currentRiskScore;
  const currentRiskLevel = getRiskLevelFromScore(currentScore, riskThresholds);
  const explainability = generateExplainableAISummary(activeDistrictData);

  // Circular gauge calculations (SVG dasharray math)
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return '#ef4444';
      case 'HIGH':
        return '#f97316';
      case 'MEDIUM':
        return '#eab308';
      default:
        return '#10b981';
    }
  };

  const currentColor = getRiskColor(currentRiskLevel);

  const getFactorIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'TrendingUp': return TrendingUp;
      case 'Clock': return Clock;
      case 'MapPin': return MapPin;
      case 'Smartphone': return Smartphone;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & District Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              SPATIO-TEMPORAL ML MODEL v2.4
            </span>
            <span className="text-xs text-slate-400">
              Validated on 24,500 Historic Incidents
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display flex items-center gap-2.5">
            CYBERCRIME RISK PREDICTION
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive incident volume, risk scores, and transparent algorithmic factor contributions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* District Selector */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {Object.keys(allDistricts).map((dist) => (
                <option key={dist} value={dist} className="bg-slate-900 text-white">
                  {dist} ({allDistricts[dist].currentRiskScore}/100)
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="Next 14 Days" className="bg-slate-900">Next 14 Days</option>
              <option value="Next 30 Days" className="bg-slate-900">Next 30 Days</option>
              <option value="Next 60 Days" className="bg-slate-900">Next 60 Days</option>
            </select>
          </div>

          {/* Threshold Config Button */}
          <button
            onClick={() => setShowThresholdConfig(!showThresholdConfig)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showThresholdConfig 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
            title="Configure Risk Thresholds"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline text-xs">Thresholds</span>
          </button>
        </div>
      </div>

      {/* Configurable Thresholds Bar (Collapsible) */}
      {showThresholdConfig && (
        <div className="p-4 rounded-2xl bg-slate-900/95 border border-cyan-800/80 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Configure Operational Risk Thresholds (Custom Rule Bounds)</span>
            </div>
            <button
              onClick={() => setRiskThresholds({ lowMax: 25, medMax: 50, highMax: 75 })}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-400 flex justify-between mb-1">
                <span>LOW Max Boundary (0 – {riskThresholds.lowMax})</span>
                <strong className="text-emerald-400">{riskThresholds.lowMax}</strong>
              </label>
              <input
                type="range"
                min={15}
                max={40}
                value={riskThresholds.lowMax}
                onChange={(e) => setRiskThresholds(prev => ({ ...prev, lowMax: Number(e.target.value) }))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 flex justify-between mb-1">
                <span>MEDIUM Max Boundary ({riskThresholds.lowMax + 1} – {riskThresholds.medMax})</span>
                <strong className="text-amber-400">{riskThresholds.medMax}</strong>
              </label>
              <input
                type="range"
                min={riskThresholds.lowMax + 5}
                max={70}
                value={riskThresholds.medMax}
                onChange={(e) => setRiskThresholds(prev => ({ ...prev, medMax: Number(e.target.value) }))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-400 flex justify-between mb-1">
                <span>HIGH Max Boundary ({riskThresholds.medMax + 1} – {riskThresholds.highMax})</span>
                <strong className="text-rose-400">{riskThresholds.highMax}</strong>
              </label>
              <input
                type="range"
                min={riskThresholds.medMax + 5}
                max={90}
                value={riskThresholds.highMax}
                onChange={(e) => setRiskThresholds(prev => ({ ...prev, highMax: Number(e.target.value) }))}
                className="w-full accent-rose-400"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Above {riskThresholds.highMax}: Classified as <strong>CRITICAL</strong> emergency priority.
          </p>
        </div>
      )}

      {/* Main Prediction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Circular Risk Gauge & Operational Metadata (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-between backdrop-blur-md">
          {/* Top Info Header */}
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Territory Target</span>
              <strong className="text-white text-sm">{activeDistrictData.district}, {activeDistrictData.state}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Forecast Horizon</span>
              <strong className="text-cyan-300 font-mono text-xs">{selectedTimePeriod}</strong>
            </div>
          </div>

          {/* Circular Risk Gauge (High-tech command display) */}
          <div className="relative flex items-center justify-center my-4">
            <svg width="220" height="220" className="transform -rotate-90">
              {/* Background ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#1e293b"
                strokeWidth="16"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke={currentColor}
                strokeWidth="16"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
              />
            </svg>

            {/* Centered Gauge Value */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                PREDICTED RISK
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight my-0.5">
                {currentScore}
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </span>
              <div 
                className="text-xs font-extrabold px-3 py-0.5 rounded-full border uppercase tracking-wider mt-1"
                style={{
                  backgroundColor: `${currentColor}20`,
                  color: currentColor,
                  borderColor: `${currentColor}60`
                }}
              >
                {currentRiskLevel} RISK
              </div>
            </div>
          </div>

          {/* Thresholds Level Scale Visualizer */}
          <div className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 mb-4">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
              <span>0–{riskThresholds.lowMax} (LOW)</span>
              <span>{riskThresholds.lowMax + 1}–{riskThresholds.medMax} (MED)</span>
              <span>{riskThresholds.medMax + 1}–{riskThresholds.highMax} (HIGH)</span>
              <span>&gt;{riskThresholds.highMax} (CRIT)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
              <div style={{ width: `${riskThresholds.lowMax}%` }} className="bg-emerald-500" />
              <div style={{ width: `${riskThresholds.medMax - riskThresholds.lowMax}%` }} className="bg-amber-500" />
              <div style={{ width: `${riskThresholds.highMax - riskThresholds.medMax}%` }} className="bg-rose-500" />
              <div style={{ width: `${100 - riskThresholds.highMax}%` }} className="bg-red-600" />
            </div>
          </div>

          {/* Key Metric Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                PREDICTED INCIDENTS
              </span>
              <span className="text-xl font-extrabold text-white font-display">
                {activeDistrictData.predictedIncidentsRange[0]}–{activeDistrictData.predictedIncidentsRange[1]}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                Next 30 Days Forecast
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                AI CONFIDENCE
              </span>
              <span className="text-xl font-extrabold text-cyan-300 font-display">
                {activeDistrictData.aiConfidence}%
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-mono">
                ✓ Cross-Validated
              </span>
            </div>
          </div>

          {/* Action button to view on map */}
          <button
            onClick={() => setCurrentRoute('risk-map')}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Locate {activeDistrictData.district} Hotspots on GIS Map
          </button>
        </div>

        {/* RIGHT: Contributing Factors & Explainable AI (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 9: AI Contributing Factors */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AI Contributing Factors</h3>
                  <p className="text-xs text-slate-400">
                    Feature weights extracted by Spatial-Temporal Random Forest / XGBoost
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Sum: 100% Weight
              </span>
            </div>

            {/* Factors List */}
            <div className="space-y-4">
              {activeDistrictData.factors.map((factor) => {
                const IconComponent = getFactorIcon(factor.iconName);
                const badgeColor = 
                  factor.level === 'HIGH' ? 'text-red-400 bg-red-950/60 border-red-800' :
                  factor.level === 'MEDIUM' ? 'text-amber-400 bg-amber-950/60 border-amber-800' :
                  'text-emerald-400 bg-emerald-950/60 border-emerald-800';

                return (
                  <div key={factor.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-slate-800 text-slate-300">
                          <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span className="font-semibold text-xs text-slate-100">
                          {factor.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${badgeColor}`}>
                          {factor.level}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-white">
                          {factor.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          factor.level === 'HIGH' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                          factor.level === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                          'bg-gradient-to-r from-emerald-500 to-teal-400'
                        }`}
                        style={{ width: `${factor.percentage * 2.5}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal">
                      {factor.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Methodology:</strong> Feature contributions reflect Shapley (SHAP) marginal values calculated across 24,500 historic FIR records and 1930 digital complaint logs.
              </span>
            </div>
          </div>

          {/* Section 10: Explainable AI ("WHY IS THIS AREA HIGH RISK?") */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display">
                    WHY IS THIS AREA {activeDistrictData.riskLevel} RISK?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Explainable AI (XAI) Natural Language Synthesis
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Auditable
              </span>
            </div>

            {/* Primary human-readable narrative card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/30 p-4 rounded-xl border border-slate-800 mb-4">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{activeDistrictData.explanation}"
              </p>
            </div>

            {/* Structured Factor Breakdown */}
            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Key AI Inference Breakdown:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {explainability.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Law Enforcement Actions */}
            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                Recommended Tactical Intervention:
              </h4>
              <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                {explainability.recommendedPriorities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-950/30 border border-cyan-900/50">
                    <span className="w-4 h-4 rounded-full bg-cyan-900/80 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
