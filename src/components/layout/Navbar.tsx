import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Bell, 
  LogOut, 
  User, 
  Radio, 
  Menu,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { 
    currentUser, 
    userRole, 
    setUserRole, 
    selectedDistrict, 
    setSelectedDistrict, 
    allDistricts, 
    alerts, 
    setCurrentRoute,
    logout
  } = useApp();

  const unreviewedAlerts = alerts.filter(a => a.status === 'ACTIVE').length;

  return (
    <header className="h-16 bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div 
          onClick={() => setCurrentRoute('command-center')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-950/50 group-hover:border-cyan-500 transition-colors">
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white tracking-wider text-sm font-display">
                CYBERGUARD <span className="text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold">
                EWS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
              Predict • Prevent • Protect
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Statewide Status & District Selector */}
      <div className="hidden md:flex items-center gap-4">
        {/* Real-time system pulse */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>1930 / CCTNS LIVE INGESTION</span>
        </div>

        {/* Global District Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400 text-[11px]">Territory:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer pr-1"
          >
            {Object.keys(allDistricts).map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-white">
                {d} ({allDistricts[d].currentRiskScore}/100)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Notifications, Role & Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={() => setCurrentRoute('alerts')}
          className="relative p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          title="Active Intelligence Alerts"
        >
          <Bell className="w-4 h-4 text-cyan-400" />
          {unreviewedAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold font-mono flex items-center justify-center animate-pulse">
              {unreviewedAlerts}
            </span>
          )}
        </button>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
            {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'CG'}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-white flex items-center gap-1">
              {currentUser?.name || 'Authorized Officer'}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              {currentUser?.role || userRole}
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Logout Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
