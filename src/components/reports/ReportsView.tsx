import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISTRICT_ANALYTICS_DATA, CRIME_TYPE_DISTRIBUTION } from '../../data/cybercrimeData';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Building2, 
  FileCheck2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { activeDistrictData, selectedDistrict, setSelectedDistrict, allDistricts, currentUser } = useApp();
  
  const [reportType, setReportType] = useState<string>('District Risk Intelligence Dossier');
  const [timeframe, setTimeframe] = useState<string>('September 2026 (Operational Cycle)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedReportId, setGeneratedReportId] = useState<string>('REP-AP-CYBER-2026-0941');

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReportId(`REP-AP-CYBER-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsGenerating(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      reportId: generatedReportId,
      reportType,
      district: activeDistrictData.district,
      state: activeDistrictData.state,
      riskScore: activeDistrictData.currentRiskScore,
      riskLevel: activeDistrictData.riskLevel,
      predictedIncidents: activeDistrictData.predictedIncidentsRange,
      aiConfidence: activeDistrictData.aiConfidence,
      factors: activeDistrictData.factors,
      executiveSummary: activeDistrictData.explanation,
      generatedBy: currentUser?.name,
      badge: currentUser?.badgeNumber,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedReportId}_${activeDistrictData.district}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Configuration & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              OFFICIAL LAW ENFORCEMENT COMPILATION
            </span>
            <span className="text-xs text-slate-400">
              Form 1930 / CCTNS Direct Dossier
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            INTELLIGENCE REPORTS GENERATOR
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Formal predictive briefs, risk audits, and spatial distribution dossiers for command review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Report Customization Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
        <div>
          <label className="text-slate-400 font-semibold block mb-1.5 font-mono">
            Report Type Category:
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="Daily Cybercrime Incident Brief">Daily Cybercrime Incident Brief</option>
            <option value="Weekly Tactical Threat Assessment">Weekly Tactical Threat Assessment</option>
            <option value="Monthly Spatio-Temporal Synthesis">Monthly Spatio-Temporal Synthesis</option>
            <option value="District Risk Intelligence Dossier">District Risk Intelligence Dossier</option>
            <option value="High-Risk Hotspot Intervention Plan">High-Risk Hotspot Intervention Plan</option>
            <option value="AI Predictive Forecasting Memo">AI Predictive Forecasting Memo</option>
          </select>
        </div>

        <div>
          <label className="text-slate-400 font-semibold block mb-1.5 font-mono">
            Target District Jurisdiction:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {Object.keys(allDistricts).map((dist) => (
              <option key={dist} value={dist} className="bg-slate-900">
                {dist} ({allDistricts[dist].riskLevel} Risk)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-slate-400 font-semibold block mb-1.5 font-mono">
            Reporting Operational Cycle:
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="September 2026 (Operational Cycle)">September 2026 (Operational Cycle)</option>
            <option value="Current 30-Day Forward Forecast">Current 30-Day Forward Forecast</option>
            <option value="Quarterly Executive Overview (Q3 2026)">Quarterly Executive Overview (Q3 2026)</option>
          </select>
        </div>
      </div>

      {/* Printable Formal Dossier Document Container */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-900/30">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                STATE CYBER CRIME INVESTIGATION & INTELLIGENCE DIVISION
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5 font-display">
                {reportType.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-400">
                Jurisdiction: {activeDistrictData.district} Range • Andhra Pradesh State Cyber Command
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 border-l border-slate-800 pl-4">
            <div>DOC ID: <strong className="text-cyan-300">{generatedReportId}</strong></div>
            <div>DATE: <strong>{new Date().toLocaleDateString('en-GB')}</strong></div>
            <div>CLEARANCE: <strong className="text-red-400">CONFIDENTIAL (LEO)</strong></div>
          </div>
        </div>

        {/* Officer Attribution Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Authoring Official:</span>
            <strong className="text-white">{currentUser?.name || 'Insp. R. Reddy'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Command ID:</span>
            <strong className="text-cyan-300 font-mono">{currentUser?.badgeNumber || 'AP-CYBER-8841'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Operational Unit:</span>
            <strong className="text-slate-300">Spatio-Temporal XAI Desk</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">SHA-256 Audit Seal:</span>
            <strong className="text-emerald-400 font-mono text-[10px]">7F83...D9069 [OK]</strong>
          </div>
        </div>

        {/* Key Intelligence Statistics Grid */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            1. Tactical Risk & Telemetry Overview
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Composite Risk Score</span>
              <div className="text-3xl font-extrabold text-red-400 font-display">
                {activeDistrictData.currentRiskScore}
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </div>
              <span className="text-[10px] text-red-400 font-bold uppercase mt-1 block">
                {activeDistrictData.riskLevel} Level
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Predicted 30-Day Incidents</span>
              <div className="text-3xl font-extrabold text-white font-display">
                {activeDistrictData.predictedIncidentsRange[0]}–{activeDistrictData.predictedIncidentsRange[1]}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Forecast Range</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Historical Baseline</span>
              <div className="text-3xl font-extrabold text-cyan-300 font-display">
                {activeDistrictData.totalHistoricalCases}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">+{activeDistrictData.monthlyGrowthRate}% Growth</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">AI Model Confidence</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-display">
                {activeDistrictData.aiConfidence}%
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Ensemble Calibration</span>
            </div>
          </div>
        </div>

        {/* AI Executive Summary & Causality Attribution */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            2. Explainable AI Executive Assessment
          </h3>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Intelligence Finding:</strong> {activeDistrictData.explanation}
            </p>
            <p>
              The primary operative threat vector identified within {activeDistrictData.district} remains 
              <strong className="text-cyan-300"> {activeDistrictData.topCrimeType}</strong>. Cross-referencing telecom tower disclosures and 1930 digital complaint logs demonstrates heightened activity clusters concentrated around commercial markets and rural-urban transaction hubs.
            </p>
          </div>
        </div>

        {/* Contributing Factors Table */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
            3. Spatio-Temporal Factor Weight Attribution
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 font-mono text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="py-2.5 px-4">Factor Name</th>
                  <th className="py-2.5 px-4">Severity Tier</th>
                  <th className="py-2.5 px-4">SHAP Weight</th>
                  <th className="py-2.5 px-4">Contextual Causality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                {activeDistrictData.factors.map((f) => (
                  <tr key={f.id}>
                    <td className="py-3 px-4 font-semibold text-white">{f.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        f.level === 'HIGH' ? 'text-red-400 bg-red-950/60' : 'text-amber-400 bg-amber-950/60'
                      }`}>
                        {f.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-cyan-300">{f.percentage}%</td>
                    <td className="py-3 px-4 text-slate-300">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Directives / Recommendations */}
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            4. Prescribed Command Interventions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span><strong>Mule Account Freezing:</strong> Coordinate with regional bank nodal officers to freeze tagged UPI VPAs within golden-hour timeline.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span><strong>Telecom Disconnection:</strong> Forward identified malicious SMS sender IDs to Department of Telecom (DoT) for immediate nationwide blacklisting.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <span><strong>Field Awareness Campaigns:</strong> Mobilize community policing units in Kurnool bus stand and commercial mandi nodes with vernacular pamphlets.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
              <span><strong>Hotspot Surveillance:</strong> Deploy mobile patrol cyber investigation units to verify unauthorized micro-ATM kiosks and QR tampering.</span>
            </div>
          </div>
        </div>

        {/* Signatures & Certification */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div>
            <div className="font-mono text-[10px] text-slate-500">DIGITAL CERTIFICATE SIGNATURE</div>
            <div className="font-mono text-cyan-400 text-xs mt-1">
              eSign: AP-POLICE-CRYPT-ID#{currentUser?.badgeNumber || '8841'}-VALID
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-slate-500">COUNTER-SIGNING AUTHORITY</div>
            <div className="font-semibold text-slate-200 mt-1">
              Superintendent of Police (Cyber Crime), AP State CID
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
