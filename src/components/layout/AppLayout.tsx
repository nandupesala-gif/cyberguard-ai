import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { CommandCenter } from '../dashboard/CommandCenter';
import { GisMapView } from '../map/GisMapView';
import { RiskPredictionView } from '../predictions/RiskPredictionView';
import { AnalyticsView } from '../analytics/AnalyticsView';
import { AlertsView } from '../alerts/AlertsView';
import { SimulatorView } from '../simulator/SimulatorView';
import { ReportsView } from '../reports/ReportsView';
import { AwarenessView } from '../awareness/AwarenessView';
import { SettingsView } from '../settings/SettingsView';
import { ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { currentRoute } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'command-center':
        return <CommandCenter />;
      case 'risk-map':
        return <GisMapView />;
      case 'predictions':
        return <RiskPredictionView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'alerts':
        return <AlertsView />;
      case 'simulator':
        return <SimulatorView />;
      case 'reports':
        return <ReportsView />;
      case 'awareness':
        return <AwarenessView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </div>

          {/* Institutional Footer */}
          <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-xs text-slate-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">CYBERGUARD AI</span>
                <span>• State Cyber Crime Command Center, Andhra Pradesh</span>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  <PhoneCall className="w-3 h-3" /> 1930
                </span>
                <span className="text-slate-400">
                  CCTNS API: <strong className="text-emerald-400">ONLINE</strong>
                </span>
                <span className="text-slate-400">
                  © {new Date().getFullYear()} AP Police
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
