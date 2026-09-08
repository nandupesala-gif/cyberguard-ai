import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateWhatIfScenario } from '../../utils/mlEngine';
import { Sliders, TrendingUp, AlertOctagon, HelpCircle, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

const SLIDER_STEPS = [-20, -10, 0, 10, 20, 30, 50];

export const WhatIfSimulatorCard: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { activeDistrictData, riskThresholds, selectedDistrict } = useApp();
  const [sliderVal, setSliderVal] = useState<number>(20); // Default +20% as in prompt example

  const scenarioResult = useMemo(() => {
    return calculateWhatIfScenario(activeDistrictData, sliderVal, riskThresholds);
  }, [activeDistrictData, sliderVal, riskThresholds]);

  const isIncreased = sliderVal > 0;
  const isDecreased = sliderVal < 0;

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/50';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                What-If Simulator
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  ML Model
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Simulate impact of report shifts in {selectedDistrict}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Base: <strong className="text-slate-200">{activeDistrictData.currentRiskScore}/100</strong>
          </span>
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scenario Hypothesis:</span>
          </div>
          <div className="text-sm font-semibold text-white">
            “What happens if cybercrime reports change by{' '}
            <span className={`font-mono px-1.5 py-0.5 rounded font-bold ${
              isIncreased ? 'bg-red-950 text-red-400 border border-red-800' : isDecreased ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
            }`}>
              {sliderVal > 0 ? `+${sliderVal}%` : `${sliderVal}%`}
            </span>
            ?”
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Intervention (-20%)</span>
            <span className="text-white font-bold text-sm">
              {sliderVal > 0 ? `+${sliderVal}%` : `${sliderVal}%`}
            </span>
            <span>Surge (+50%)</span>
          </div>

          <input
            type="range"
            min={-20}
            max={50}
            step={10}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          {/* Quick preset chips */}
          <div className="flex justify-between items-center mt-2">
            {SLIDER_STEPS.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setSliderVal(step)}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  sliderVal === step
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {step > 0 ? `+${step}%` : `${step}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Projection Comparison Result */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Current */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              Current Baseline
            </span>
            <div className="text-xl font-bold text-slate-300 font-display">
              {scenarioResult.baseScore}
              <span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Level: <strong className="text-slate-200">{activeDistrictData.riskLevel}</strong>
            </div>
          </div>

          {/* Projected */}
          <div className={`p-3 rounded-xl border ${
            isIncreased ? 'bg-red-950/20 border-red-900/60' : isDecreased ? 'bg-emerald-950/20 border-emerald-900/60' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              Projected Outcome
            </span>
            <div className={`text-xl font-bold font-display ${
              scenarioResult.projectedScore >= 75 ? 'text-red-400' : scenarioResult.projectedScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {scenarioResult.projectedScore}
              <span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${getBadgeColor(scenarioResult.projectedRiskLevel)}`}>
                {scenarioResult.projectedRiskLevel} RISK
              </span>
            </div>
          </div>
        </div>

        {/* Projected Incidents and Key Drivers */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">Predicted Incidents (30d):</span>
            <strong className="text-white font-mono">
              {scenarioResult.projectedIncidentsRange[0]}–{scenarioResult.projectedIncidentsRange[1]} cases
            </strong>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
            "{scenarioResult.mitigationImpactText}"
          </p>
        </div>
      </div>

      {/* Footer ML Transparency Guarantee */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-cyan-400" />
          Poisson-KDE Elasticity Algorithm
        </span>
        <span className="text-cyan-400 font-semibold">91% Conf.</span>
      </div>
    </div>
  );
};
