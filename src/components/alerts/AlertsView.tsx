import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EarlyWarningAlert } from '../../types';
import { 
  BellRing, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  Filter, 
  ExternalLink,
  Send,
  Radio,
  FileCheck
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, markAlertAsReviewed, setSelectedDistrict, setCurrentRoute } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'REVIEWED'>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterStatus !== 'ALL' && a.status !== filterStatus) return false;
    if (selectedSeverity !== 'ALL' && a.severity !== selectedSeverity) return false;
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-950/80 text-red-400 border-red-800';
      case 'HIGH':
        return 'bg-rose-950/80 text-rose-400 border-rose-800';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-400 border-amber-800';
      default:
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-400 animate-pulse" />
              EARLY WARNING SYSTEM (EWS)
            </span>
            <span className="text-xs text-slate-400">
              Active Threat Monitoring & Incident Threshold Traps
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            AI EARLY WARNING & ALERT CENTER
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated intelligence alerts triggered by spatio-temporal anomaly detection and surge patterns.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === 'ALL' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilterStatus('ACTIVE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === 'ACTIVE' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Active ({alerts.filter(a => a.status === 'ACTIVE').length})
            </button>
            <button
              onClick={() => setFilterStatus('REVIEWED')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === 'REVIEWED' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reviewed ({alerts.filter(a => a.status === 'REVIEWED').length})
            </button>
          </div>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">Severity: All</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Active Alerts In This Category</h3>
            <p className="text-xs text-slate-400">All threshold traps in the selected filter range have been reviewed or are within normal bounds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                id={`alert-card-${alert.id}`}
                className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                  alert.status === 'ACTIVE'
                    ? isCritical 
                      ? 'bg-slate-900/95 border-red-900/80 shadow-xl shadow-red-950/40 ring-1 ring-red-900/50'
                      : 'bg-slate-900/95 border-rose-900/60 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-85'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCritical ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      <BellRing className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          AI ALERT • {alert.id}
                        </span>
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity} SEVERITY
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          alert.status === 'ACTIVE' ? 'bg-red-950/60 text-red-300 border-red-800' : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-white mt-1">
                        “{alert.title}”
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono self-start sm:self-center">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {alert.timestamp}
                    </span>
                    <span>•</span>
                    <span className="text-cyan-400 font-semibold">{alert.district}</span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-sm text-slate-200 leading-relaxed font-medium mb-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  {alert.message}
                </p>

                {/* 4 Required Metadata Points: Risk Level, Predicted Incidents, Time Period, Confidence */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                      Risk Level
                    </span>
                    <span className={`text-sm font-extrabold uppercase ${
                      alert.riskLevel === 'CRITICAL' || alert.riskLevel === 'HIGH' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {alert.riskLevel} RISK
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                      Predicted Incidents
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono">
                      {alert.predictedIncidents}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                      Time Period
                    </span>
                    <span className="text-sm font-semibold text-slate-300">
                      {alert.timePeriod}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                      AI Confidence
                    </span>
                    <span className="text-sm font-extrabold text-cyan-400 font-mono">
                      {alert.confidence}%
                    </span>
                  </div>
                </div>

                {/* Section: Recommended Actions */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    Recommended Actions:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {alert.recommendedActions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location: <strong>{alert.location}</strong></span>
                    <span>•</span>
                    <span>Threat: <strong>{alert.crimeCategory}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {alert.status === 'ACTIVE' && (
                      <button
                        type="button"
                        onClick={() => markAlertAsReviewed(alert.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-600/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark as Reviewed
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDistrict(alert.district);
                        setCurrentRoute('risk-map');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
