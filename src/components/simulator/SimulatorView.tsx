import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatIfSimulatorCard } from './WhatIfSimulatorCard';
import { 
  Sliders, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle, 
  Activity, 
  MapPin,
  RefreshCw,
  Sparkles,
  Layers
} from 'lucide-react';

export const SimulatorView: React.FC = () => {
  const { activeDistrictData, selectedDistrict, setSelectedDistrict, allDistricts, setCurrentRoute } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-bold">
              DYNAMIC POISSON-KDE SIMULATION
            </span>
            <span className="text-xs text-slate-400">
              Interactive Scenario Modeling & Resource Planning
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            WHAT-IF SCENARIO SIMULATOR
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Model the outcome of changing crime rates, preventative patrols, or awareness campaign surges on projected risk scores.
          </p>
        </div>

        {/* Territory Selector */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Territory:</span>
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
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: What-If Simulator Card (7 cols) */}
        <div className="lg:col-span-7">
          <WhatIfSimulatorCard />
        </div>

        {/* Right: Explanatory & Scenario Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Policy Scenario Presets */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Pre-Configured Policy Scenarios
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Inspect typical law-enforcement scenarios modeled from historical AP cyber interventions:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-white font-semibold mb-1">
                  <span>Scenario A: Strict Bank Mule Freeze</span>
                  <span className="font-mono text-emerald-400">-20% Reports</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Aggressive 1-hour freeze on flagged mule accounts drops financial scam throughput by an estimated 20%, easing district risk tier.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-white font-semibold mb-1">
                  <span>Scenario B: Festival Digital Shopping Surge</span>
                  <span className="font-mono text-red-400">+30% Reports</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Seasonal spike in counterfeit e-commerce links and fake delivery SMS pushes risk into CRITICAL tier without extra cyber patrols.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-white font-semibold mb-1">
                  <span>Scenario C: Targeted Media Awareness Push</span>
                  <span className="font-mono text-emerald-400">-10% Reports</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Vernacular radio and WhatsApp warnings inoculate senior citizens and first-time digital payment users against lottery scams.
                </p>
              </div>
            </div>
          </div>

          {/* Model Transparency Note */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md text-xs text-slate-300">
            <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 font-mono uppercase text-xs">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Mathematical Integrity Statement
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              This simulator calculates projected risk using transparent, non-linear elasticity curves calibrated against historical district baseline variances. Projected risk scores cap at 100 and floor at 10, maintaining realistic Poisson distribution bounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
