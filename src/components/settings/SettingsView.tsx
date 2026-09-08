import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Database, 
  Cpu, 
  Bell, 
  User, 
  Lock, 
  Check, 
  RotateCcw,
  Server,
  Activity,
  KeyRound
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser, riskThresholds, setRiskThresholds, userRole, setUserRole } = useApp();

  const [bandwidthKm, setBandwidthKm] = useState<number>(12);
  const [decayFactor, setDecayFactor] = useState<number>(0.85);
  const [autoAlerts, setAutoAlerts] = useState<boolean>(true);
  const [minConfidenceThreshold, setMinConfidenceThreshold] = useState<number>(85);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
              PLATFORM SYSTEM PREFERENCES
            </span>
            <span className="text-xs text-slate-400">
              Machine Learning Pipeline & Interface Control
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            COMMAND CENTER SETTINGS
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage ML inference parameters, spatial radius bandwidths, user authorization, and system telemetry.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/40 flex items-center gap-2 transition-all cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Settings className="w-4 h-4" />}
          <span>{savedSuccess ? 'Settings Saved' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ML Hyperparameters & Spatial Sensitivity (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Spatio-Temporal ML Calibration
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kernel Density Estimation (KDE) and Poisson Regression Hyperparameters
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Model: AP-XGB-2.4
              </span>
            </div>

            <div className="space-y-5 text-xs">
              {/* Spatial Bandwidth */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">
                    Spatial Kernel Bandwidth (Cluster Radius)
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{bandwidthKm} km</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  value={bandwidthKm}
                  onChange={(e) => setBandwidthKm(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Defines the spatial convolution window for aggregating crime incidence across district boundaries.
                </p>
              </div>

              {/* Temporal Decay Factor */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">
                    Temporal Half-Life Decay Factor (Alpha)
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{decayFactor}</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={0.99}
                  step={0.01}
                  value={decayFactor}
                  onChange={(e) => setDecayFactor(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Determines how quickly past complaints discount in weight compared to recent 14-day surges.
                </p>
              </div>

              {/* Confidence Floor */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">
                    Minimum EWS Confidence Filter
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{minConfidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={95}
                  value={minConfidenceThreshold}
                  onChange={(e) => setMinConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Suppress tactical early warnings if the predictive ensemble falls below this confidence boundary.
                </p>
              </div>
            </div>
          </div>

          {/* Operational Risk Tier Thresholds */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Operational Risk Thresholds
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define classification cutoff boundaries for color indicators
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRiskThresholds({ lowMax: 25, medMax: 50, highMax: 75 })}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">LOW Max (0–{riskThresholds.lowMax})</span>
                <input
                  type="number"
                  min={10}
                  max={35}
                  value={riskThresholds.lowMax}
                  onChange={(e) => setRiskThresholds(prev => ({ ...prev, lowMax: Number(e.target.value) }))}
                  className="w-full bg-slate-900 border border-slate-800 text-white font-mono p-1.5 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">MEDIUM Max ({riskThresholds.lowMax + 1}–{riskThresholds.medMax})</span>
                <input
                  type="number"
                  min={36}
                  max={65}
                  value={riskThresholds.medMax}
                  onChange={(e) => setRiskThresholds(prev => ({ ...prev, medMax: Number(e.target.value) }))}
                  className="w-full bg-slate-900 border border-slate-800 text-white font-mono p-1.5 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">HIGH Max ({riskThresholds.medMax + 1}–{riskThresholds.highMax})</span>
                <input
                  type="number"
                  min={66}
                  max={85}
                  value={riskThresholds.highMax}
                  onChange={(e) => setRiskThresholds(prev => ({ ...prev, highMax: Number(e.target.value) }))}
                  className="w-full bg-slate-900 border border-slate-800 text-white font-mono p-1.5 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Identity & System Architecture Connections (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Session & Role Switcher */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{currentUser?.name}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {currentUser?.badgeNumber} • {currentUser?.department}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Active Access Clearance Role:
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-cyan-300 font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="POLICE">Police Officer (Intervention & Dispatch)</option>
                  <option value="GOVERNMENT_ADMIN">Government Administrator (Full Authority)</option>
                  <option value="ANALYST">Cybersecurity Analyst (Research & ML)</option>
                  <option value="PUBLIC_USER">Public User (Awareness & Verification)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Authorized District:</span>
                  <strong className="text-slate-200">{currentUser?.districtScope || 'Statewide'}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Session Encryption:</span>
                  <strong className="text-emerald-400 font-mono">TLS 1.3 / AES-256-GCM</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure & Pipeline Status */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">System Connectors</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                All Systems Operational
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">PostgreSQL / PostGIS Engine</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">1930 / CCTNS Real-Time Gateway</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">SYNC (15s)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">Explainable AI (SHAP Interpreter)</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
