import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DISTRICT_ANALYTICS_DATA, 
  CRIME_TYPE_DISTRIBUTION, 
  MONTHLY_TREND_DATA 
} from '../../data/cybercrimeData';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  FileSpreadsheet, 
  Printer, 
  Calendar, 
  Filter, 
  MapPin, 
  ShieldAlert, 
  Download,
  Layers
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { selectedDistrict, setSelectedDistrict, setCurrentRoute } = useApp();
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState('All Time (2026 YTD)');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Top 5 High Risk Locations
  const top5Locations = [...DISTRICT_ANALYTICS_DATA]
    .sort((a, b) => b.highRiskScore - a.highRiskScore)
    .slice(0, 5);

  // Time horizon dynamic scale multiplier
  const horizonMultiplier = 
    selectedTimeHorizon === 'Last 30 Days' ? 0.28 :
    selectedTimeHorizon === 'Last Quarter (Q2)' ? 0.68 : 1.0;

  const currentDistrictData = DISTRICT_ANALYTICS_DATA.map(d => ({
    ...d,
    displayCases: Math.round(d.cases * horizonMultiplier)
  }));

  const totalDistrictCases = currentDistrictData.reduce((acc, d) => acc + d.displayCases, 0);
  const maxDistrictCases = Math.max(...currentDistrictData.map(d => d.displayCases));
  const maxTrendCases = Math.max(...MONTHLY_TREND_DATA.map(m => m.cases));

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "District,Cases,RiskScore,GrowthRate\n"
      + DISTRICT_ANALYTICS_DATA.map(d => `${d.district},${d.cases},${d.highRiskScore},${d.growthRate}%`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cyberguard_analytics_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Export Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
              AGGREGATE METRICS & TELEMETRY
            </span>
            <span className="text-xs text-slate-400">
              Statewide Crime Intelligence Network
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            CYBERCRIME ANALYTICS DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-district comparative charts, category distribution, and longitudinal trend trajectories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Horizon Filter */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedTimeHorizon}
              onChange={(e) => setSelectedTimeHorizon(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Last 30 Days" className="bg-slate-900">Last 30 Days</option>
              <option value="Last Quarter (Q2)" className="bg-slate-900">Last Quarter (Q2)</option>
              <option value="All Time (2026 YTD)" className="bg-slate-900">All Time (2026 YTD)</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportData}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          {/* Generate PDF / Report Action */}
          <button
            onClick={() => setCurrentRoute('reports')}
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Grid: 4 Core Required Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Cybercrime Cases by District (Vertical Bar Chart) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    1. Cybercrime Cases by District
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Comparative caseload registered across major AP territorial commands
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Total: {totalDistrictCases.toLocaleString()} Cases
              </span>
            </div>

            {/* Custom Interactive Bar Chart with Y-Axis and Reference Gridlines */}
            <div className="relative pt-2 pb-1">
              {/* Floating Tooltip for Active/Hovered District */}
              {hoveredBarIndex !== null && currentDistrictData[hoveredBarIndex] && (
                <div className="absolute -top-3 right-0 z-20 bg-slate-950/95 border border-cyan-500/60 rounded-xl px-3 py-1.5 shadow-2xl text-xs flex items-center gap-2.5 font-mono pointer-events-none animate-in fade-in zoom-in duration-150">
                  <span className="font-bold text-white">
                    {currentDistrictData[hoveredBarIndex].district}:
                  </span>
                  <span className="text-cyan-300 font-bold">
                    {currentDistrictData[hoveredBarIndex].displayCases} cases
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-rose-400 font-semibold">
                    Risk {currentDistrictData[hoveredBarIndex].highRiskScore}/100
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-emerald-400">
                    +{currentDistrictData[hoveredBarIndex].growthRate}% MoM
                  </span>
                </div>
              )}

              <div className="flex gap-2 h-64">
                {/* Y-Axis scale marks */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-slate-500 pr-1 select-none pb-6 pt-1 w-7 text-right shrink-0">
                  <span>{Math.round(maxDistrictCases)}</span>
                  <span>{Math.round(maxDistrictCases * 0.75)}</span>
                  <span>{Math.round(maxDistrictCases * 0.5)}</span>
                  <span>{Math.round(maxDistrictCases * 0.25)}</span>
                  <span>0</span>
                </div>

                {/* Main chart area with gridlines */}
                <div className="relative flex-1 flex flex-col justify-between">
                  {/* Background horizontal dashed gridlines */}
                  <div className="absolute inset-0 pb-6 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-b border-slate-800/80 border-dashed" />
                    <div className="w-full border-b border-slate-800/60 border-dashed" />
                    <div className="w-full border-b border-slate-800/60 border-dashed" />
                    <div className="w-full border-b border-slate-800/60 border-dashed" />
                    <div className="w-full border-b border-slate-700/80" />
                  </div>

                  {/* Bars Container */}
                  <div className="relative z-10 w-full h-full flex items-end justify-between gap-1.5 sm:gap-2 pb-6">
                    {currentDistrictData.map((item, idx) => {
                      const heightPercent = maxDistrictCases > 0 ? (item.displayCases / maxDistrictCases) * 100 : 0;
                      const isSelected = 
                        item.district.toLowerCase() === selectedDistrict.toLowerCase() ||
                        selectedDistrict.toLowerCase().includes(item.district.toLowerCase()) ||
                        item.district.toLowerCase().includes(selectedDistrict.toLowerCase());
                      const isHigh = item.highRiskScore >= 75;
                      const shortLabel = item.district === 'Visakhapatnam' ? 'Vizag' : item.district;

                      return (
                        <div
                          key={item.district}
                          className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                          onClick={() => setSelectedDistrict(item.district)}
                          onMouseEnter={() => setHoveredBarIndex(idx)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                          {/* Case count tag above bar */}
                          <span className={`text-[10px] font-mono font-bold transition-all mb-1 ${
                            isSelected 
                              ? 'text-cyan-300 scale-110' 
                              : hoveredBarIndex === idx 
                              ? 'text-white' 
                              : 'text-slate-400 opacity-90'
                          }`}>
                            {item.displayCases}
                          </span>

                          {/* Bar track with explicit height and styled borders */}
                          <div className={`w-full max-w-[38px] h-40 bg-slate-800/30 rounded-t-lg overflow-hidden flex flex-col justify-end p-0.5 border-t border-x transition-all duration-300 group-hover:scale-y-105 origin-bottom ${
                            isSelected 
                              ? 'border-cyan-400/80 bg-slate-800/60 shadow-lg shadow-cyan-950/50' 
                              : 'border-slate-700/40 group-hover:border-slate-500'
                          }`}>
                            <div
                              style={{ height: `${Math.max(heightPercent, 5)}%` }}
                              className={`w-full rounded-t-md transition-all duration-500 relative flex items-start justify-center ${
                                isSelected
                                  ? 'bg-gradient-to-t from-cyan-600 via-sky-500 to-cyan-300 shadow-md shadow-cyan-500/40'
                                  : isHigh
                                  ? 'bg-gradient-to-t from-red-700 via-rose-600 to-red-400 group-hover:brightness-125'
                                  : 'bg-gradient-to-t from-blue-700 via-sky-600 to-cyan-400 group-hover:brightness-125'
                              }`}
                            >
                              <div className="w-full h-1 bg-white/40 rounded-t-sm" />
                            </div>
                          </div>

                          {/* District label */}
                          <span 
                            title={item.district}
                            className={`text-[10px] sm:text-[11px] font-semibold mt-2 truncate w-full text-center transition-colors ${
                              isSelected 
                                ? 'text-cyan-400 font-bold' 
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          >
                            {shortLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Click any bar to filter platform territory</span>
            <span className="text-cyan-400">
              Selected: {selectedDistrict} ({currentDistrictData.find(d => d.district.toLowerCase().includes(selectedDistrict.toLowerCase()) || selectedDistrict.toLowerCase().includes(d.district.toLowerCase()))?.displayCases || 342} Cases)
            </span>
          </div>
        </div>

        {/* CHART 2: Crime Type Distribution (Donut / Pie Breakdown) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-950 border border-red-800/60 flex items-center justify-center text-red-400">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    2. Crime Type Distribution
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Category shares across registered cyber offenses
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                1,284 Verified FIRs
              </span>
            </div>

            {/* Donut representation & Legend List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Donut Chart SVG */}
              <div className="relative flex items-center justify-center py-2">
                <svg width="180" height="180" viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Conic stroke simulation with circle segments */}
                  {CRIME_TYPE_DISTRIBUTION.map((item, idx) => {
                    // Cumulative dash offset math for pie simulation
                    const prevSum = CRIME_TYPE_DISTRIBUTION.slice(0, idx).reduce((a, b) => a + b.percentage, 0);
                    const circumference = 2 * Math.PI * 34; // r=34
                    const strokeLen = (item.percentage / 100) * circumference;
                    const offset = circumference - (prevSum / 100) * circumference;

                    return (
                      <circle
                        key={item.category}
                        cx="50"
                        cy="50"
                        r="34"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="14"
                        strokeDasharray={`${strokeLen} ${circumference - strokeLen}`}
                        strokeDashoffset={offset}
                        className="transition-all duration-500 hover:opacity-80"
                      />
                    );
                  })}
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Leading</span>
                  <span className="text-xl font-bold text-white font-display">40.8%</span>
                  <span className="text-[9px] text-red-400 font-semibold">Fraud</span>
                </div>
              </div>

              {/* Legend with percentages */}
              <div className="space-y-2 text-xs">
                {CRIME_TYPE_DISTRIBUTION.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/40">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-300 font-medium truncate">{cat.category}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <strong className="text-white font-mono">{cat.percentage}%</strong>
                      <span className="text-[10px] text-slate-500 ml-1">({cat.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Primary Vector: Financial Exploitation</span>
            <span className="text-red-400">40.8% Share</span>
          </div>
        </div>

        {/* CHART 3: Monthly Trend (Line Chart) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    3. Monthly Incident Trend & Projection
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Historical monthly trajectory with predictive ML forward extrapolation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2 h-0.5 bg-cyan-400" /> Historical
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2 h-0.5 bg-amber-400 border-dashed" /> Projected
                </span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-60 w-full relative pt-4 pb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                {/* Horizontal grid lines */}
                {[0, 50, 100, 150, 200].map((yVal, i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={200 - yVal}
                    x2="480"
                    y2={200 - yVal}
                    stroke="#1e293b"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                ))}

                {/* Polyline: Historic + Projected */}
                {/* Points: 7 months from x=60 to 460 */}
                <polyline
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeLinecap="round"
                  points={
                    MONTHLY_TREND_DATA.map((d, i) => {
                      const x = 60 + i * 65;
                      const y = 200 - (d.cases / 260) * 180;
                      return `${x},${y}`;
                    }).join(' ')
                  }
                />

                {/* Shaded Area under curve */}
                <polygon
                  fill="url(#trendGradient)"
                  opacity="0.25"
                  points={`60,200 ${MONTHLY_TREND_DATA.map((d, i) => {
                    const x = 60 + i * 65;
                    const y = 200 - (d.cases / 260) * 180;
                    return `${x},${y}`;
                  }).join(' ')} 450,200`}
                />

                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Data Points / Circles */}
                {MONTHLY_TREND_DATA.map((d, i) => {
                  const x = 60 + i * 65;
                  const y = 200 - (d.cases / 260) * 180;
                  const isProjected = i >= 5;

                  return (
                    <g key={d.month} className="group">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill={isProjected ? '#f59e0b' : '#38bdf8'}
                        stroke="#0f172a"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-7 transition-all"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {d.cases}
                      </text>
                      <text
                        x={x}
                        y="218"
                        textAnchor="middle"
                        fill={isProjected ? '#f59e0b' : '#94a3b8'}
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {d.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Month-over-month growth rate: +24.8%</span>
            <span className="text-amber-400 font-semibold">October Target: 248 Cases</span>
          </div>
        </div>

        {/* CHART 4: Top 5 High-Risk Locations (Horizontal Bar Chart) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-950 border border-rose-800/60 flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    4. Top 5 High-Risk Locations
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Priority zones ranked by calculated composite risk score (out of 100)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                Action Required
              </span>
            </div>

            {/* Horizontal Bar Items */}
            <div className="space-y-3.5 pt-2">
              {top5Locations.map((loc, idx) => {
                const isSelected = loc.district.toLowerCase() === selectedDistrict.toLowerCase();

                return (
                  <div
                    key={loc.district}
                    onClick={() => setSelectedDistrict(loc.district)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/80 border-cyan-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-white">{loc.district}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({loc.cases} cases)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-emerald-400 font-mono">+{loc.growthRate}% mo</span>
                        <strong className="text-sm font-extrabold text-red-400 font-display">
                          {loc.highRiskScore}/100
                        </strong>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-red-600 transition-all duration-700"
                        style={{ width: `${loc.highRiskScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Kurnool ranked #1 risk intensity</span>
            <button
              onClick={() => setCurrentRoute('risk-map')}
              className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
            >
              Examine on GIS Map →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
