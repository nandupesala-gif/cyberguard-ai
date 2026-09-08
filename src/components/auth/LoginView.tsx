import React, { useState } from 'react';
import { useApp, DEFAULT_USERS } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  ShieldAlert, 
  Building2, 
  LineChart, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  KeyRound,
  Fingerprint,
  Info
} from 'lucide-react';

interface RoleOption {
  role: UserRole;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  privileges: string[];
  clearanceLevel: string;
}

const ROLES: RoleOption[] = [
  {
    role: 'police_officer',
    title: 'Police / Cybercrime Officer',
    badge: 'LEO Command',
    icon: ShieldAlert,
    description: 'Direct field operational access, 1930 incident escalations, suspect bank VPA tracing, and high-risk zone patrols.',
    privileges: ['Dispatch Patrols', 'Freeze Mules (1930)', 'Live Incident Triage', 'Direct FIR Intercepts'],
    clearanceLevel: 'LEVEL 4 - OPERATIONAL DIRECT'
  },
  {
    role: 'govt_admin',
    title: 'Government Administrator',
    badge: 'Executive Oversight',
    icon: Building2,
    description: 'Strategic district risk allocation, telecom carrier warnings, statewide legislative reporting, and resource budget mobilization.',
    privileges: ['Sanction Cyber Cells', 'Issue Telecom Directives', 'Cabinet Briefings', 'Statewide Analytics'],
    clearanceLevel: 'LEVEL 5 - EXECUTIVE MINISTERIAL'
  },
  {
    role: 'analyst',
    title: 'Security & Threat Analyst',
    badge: 'Intelligence & ML',
    icon: LineChart,
    description: 'Spatio-temporal model configuration, feature correlation, Getis-Ord Gi* hotspot analysis, and what-if simulation engineering.',
    privileges: ['Model Tuning', 'Feature Engineering', 'What-If Simulation', 'Spatial Cluster Audits'],
    clearanceLevel: 'LEVEL 3 - TECHNICAL ANALYTICAL'
  },
  {
    role: 'public_user',
    title: 'Public / Citizen Defender',
    badge: 'Citizen Access',
    icon: UserCheck,
    description: 'Community risk awareness, local hotspot caution advisories, cybercrime helpline guidelines, and reporting portals.',
    privileges: ['View District Risk', 'Cyber Safety Guides', '1930 Golden Hour Steps', 'Report Frauds'],
    clearanceLevel: 'LEVEL 1 - PUBLIC CLEARANCE'
  }
];

export const LoginView: React.FC = () => {
  const { loginAsRole, selectedRole, setSelectedRole } = useApp();
  const [activeTabRole, setActiveTabRole] = useState<UserRole>(selectedRole || 'police_officer');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const selectedRoleData = ROLES.find(r => r.role === activeTabRole) || ROLES[0];
  const demoProfile = DEFAULT_USERS[activeTabRole];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      loginAsRole(activeTabRole);
      setIsAuthenticating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-wider text-white">CYBERGUARD</span>
              <span className="font-display font-extrabold text-xl tracking-widest text-cyan-400">AI</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold tracking-wider">
                V2.4 INTEL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Predict • Prevent • Protect
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GEO-NODE: AP-HYD-01 (ONLINE)</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEMO MODE ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-semibold mb-4 tracking-wide shadow-sm">
            <span>STATE CYBER CRIME INTELLIGENCE COMMAND</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            “Together for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Safer Digital Tomorrow</span>”
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI-driven insights. Geo-intelligence. Proactive cybercrime prevention.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Empowering law enforcement with spatio-temporal risk modeling, predictive early warnings, and automated intervention workflows.
          </p>
        </div>

        {/* Role Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = activeTabRole === r.role;
            return (
              <div
                key={r.role}
                id={`role-card-${r.role}`}
                onClick={() => {
                  setActiveTabRole(r.role);
                  setSelectedRole(r.role);
                }}
                className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 text-left border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-500/80 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-500/50 -translate-y-1'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700 hover:-translate-y-0.5'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Fingerprint className="w-3 h-3" /> Selected Role
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-cyan-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-cyan-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 font-medium">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {r.description}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Clearances:
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {r.privileges.map((p, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/40">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{r.clearanceLevel}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secure Quick Login Bar for Selected Role */}
        <div className="max-w-xl mx-auto w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Authenticate as {selectedRoleData.title}
                </h4>
                <p className="text-xs text-slate-400">
                  Officer: <strong className="text-slate-200">{demoProfile.name}</strong> ({demoProfile.email})
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-800 text-[11px] font-mono text-cyan-300 border border-slate-700">
              Demo Preset Ready
            </span>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Assigned Identity
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={demoProfile.email}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Passcode / Security Token
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-3.5 h-3.5 absolute left-3 text-slate-500" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MFA Pre-Verified for Simulation
              </span>
              <span>Kurnool & State GIS Range</span>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              id="login-submit-btn"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>INITIALIZING COMMAND CENTER...</span>
                </>
              ) : (
                <>
                  <span>ENTER CYBERGUARD COMMAND CENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            State Cybercrime Operations & GIS Intelligence Platform • Smart India Hackathon Prototype
          </span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Helpline: 1930</span>
            <span>•</span>
            <span>cybercrime.gov.in</span>
            <span>•</span>
            <span>Kurnool Zone Pilot</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
