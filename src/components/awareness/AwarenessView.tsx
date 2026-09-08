import React, { useState } from 'react';
import { AWARENESS_MODULES } from '../../data/cybercrimeData';
import { 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Search, 
  ExternalLink,
  Lock,
  Smartphone,
  CreditCard,
  UserX,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const AwarenessView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredModules = AWARENESS_MODULES.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & 1930 Emergency Protocol */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                PUBLIC DIGITAL DEFENSE INITIATIVE
              </span>
              <span className="text-xs text-slate-400">
                Citizen Awareness & Cybercrime Prevention
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              CYBER SAFETY & FRAUD PREVENTION DESK
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Clear, practical advisories to protect yourself, your family, and your business against online financial scams, phishing lures, and identity extortion.
            </p>
          </div>

          {/* 1930 Helpline Callout */}
          <div className="p-4 rounded-2xl bg-red-950/80 border border-red-800/80 text-white shrink-0 shadow-xl shadow-red-950/40 text-center sm:text-left flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 animate-bounce">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-red-200 font-bold tracking-wider">
                NATIONAL HELPLINE (TOLL-FREE)
              </div>
              <div className="text-3xl font-black font-display text-white tracking-tight">
                1930
              </div>
              <div className="text-[11px] text-red-200">
                Citizen Financial Cyber Fraud Reporting
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Golden Hour 3-Step Protocol */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-bold text-base text-white">
              The "Golden Hour" Protocol (First 2 Hours After a Financial Fraud)
            </h3>
            <p className="text-xs text-slate-400">
              Immediate actions maximize the chance of freezing stolen funds before they leave the banking system.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-900/60 text-red-300 font-bold flex items-center justify-center shrink-0 text-sm font-mono">
              1
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-1">
                Dial 1930 Instantly
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with the state cyber nodal desk. Have your bank account number, victim phone number, and transaction UTR ready.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm font-mono">
              2
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-1">
                Freeze Bank & Card Access
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use your bank mobile app or customer care to immediately lock UPI payments, freeze compromised debit/credit cards, and change netbanking passwords.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900/60 text-blue-300 font-bold flex items-center justify-center shrink-0 text-sm font-mono">
              3
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-1">
                Register on cybercrime.gov.in
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                File an official e-complaint on the National Cyber Crime Reporting Portal and save your acknowledgment slip for police follow-up.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Topic Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic (e.g. Phishing, UPI, OTP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredModules.length} Cyber Awareness Modules
        </span>
      </div>

      {/* Educational Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                  {module.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {module.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {module.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {module.summary}
              </p>

              {/* Warning Signs */}
              <div className="mb-4 bg-red-950/30 p-3.5 rounded-xl border border-red-900/50">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Red Flag Warning Signs:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {module.warningSigns.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold shrink-0">✕</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Rules */}
              <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-900/50">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Protection Guidelines:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {module.preventionTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> Verified Police Advisory
              </span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                Official Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
