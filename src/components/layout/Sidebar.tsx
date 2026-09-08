import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Map, 
  Sparkles, 
  BarChart3, 
  BellRing, 
  Sliders, 
  FileText, 
  BookOpen, 
  Settings, 
  ShieldAlert, 
  Info,
  ChevronRight,
  ExternalLink,
  Lock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRoute, setCurrentRoute, alerts, userRole } = useApp();

  const activeAlertsCount = alerts.filter(a => a.status === 'ACTIVE').length;

  const navItems: { id: AppRoute; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'risk-map', label: 'GIS Risk Heatmap', icon: Map },
    { id: 'predictions', label: 'AI Risk Prediction', icon: Sparkles },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'alerts', label: 'AI Alert Center', icon: BellRing, badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders },
    { id: 'reports', label: 'Intelligence Reports', icon: FileText },
    { id: 'awareness', label: 'Public Awareness', icon: BookOpen },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out backdrop-blur-md lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
            OPERATIONAL MODULES
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 shadow-md shadow-cyan-950/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                  }`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer State Clearance & Helpline Card */}
        <div className="p-4 border-t border-slate-900 space-y-3">
          {/* Quick 1930 Helpline Reminder */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/60 to-slate-900 border border-red-900/50 text-xs">
            <div className="flex items-center justify-between font-mono text-[10px] text-red-300 mb-1">
              <span>EMERGENCY HELPLINE</span>
              <span className="font-bold">24x7</span>
            </div>
            <div className="text-lg font-black text-white font-display">
              DIAL 1930
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Instant financial cyber-fraud reporting & nodal bank freeze.
            </p>
          </div>

          <div className="text-[10px] text-slate-400 font-mono text-center flex items-center justify-between px-1">
            <span>Andhra Pradesh Police</span>
            <span className="text-cyan-400">v2.4.0-PROD</span>
          </div>
        </div>
      </aside>
    </>
  );
};
