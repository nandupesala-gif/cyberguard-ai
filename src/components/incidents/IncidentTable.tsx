import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CyberIncident, CrimeType } from '../../types';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  X,
  Send,
  Building,
  FileSpreadsheet
} from 'lucide-react';

interface IncidentTableProps {
  limit?: number;
  showFilters?: boolean;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ 
  limit, 
  showFilters = true 
}) => {
  const { incidents, setSelectedDistrict, setCurrentRoute } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'timestamp' | 'severity' | 'district'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIncident, setSelectedIncident] = useState<CyberIncident | null>(null);

  const filteredIncidents = useMemo(() => {
    let list = [...incidents];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(i => 
        i.crimeType.toLowerCase().includes(q) ||
        i.district.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
      );
    }

    if (filterSeverity !== 'ALL') {
      list = list.filter(i => i.severity === filterSeverity);
    }

    if (filterType !== 'ALL') {
      list = list.filter(i => i.crimeType === filterType);
    }

    // Sort
    list.sort((a, b) => {
      if (sortField === 'severity') {
        const severityRank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        const diff = severityRank[b.severity] - severityRank[a.severity];
        return sortOrder === 'desc' ? diff : -diff;
      }
      if (sortField === 'district') {
        return sortOrder === 'asc' ? a.district.localeCompare(b.district) : b.district.localeCompare(a.district);
      }
      return 0; // default timestamp order preserved from original
    });

    if (limit) {
      return list.slice(0, limit);
    }
    return list;
  }, [incidents, searchTerm, filterSeverity, filterType, sortField, sortOrder, limit]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-950/80 text-red-400 border-red-800/80';
      case 'HIGH':
        return 'bg-rose-950/80 text-rose-400 border-rose-800/80';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/80';
      default:
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-800/80';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
      case 'ESCALATED':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'UNDER_REVIEW':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      default:
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col backdrop-blur-md">
      {/* Table Header Controls */}
      {showFilters && (
        <div className="p-4 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-bold text-sm text-white">Live Recent Incidents</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {filteredIncidents.length} Records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search incident ID, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-40 sm:w-56 bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="ALL">Severity: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            {/* Quick Export CSV Simulation */}
            <button
              onClick={() => alert('Exporting sanitized incident telemetry log to CSV...')}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Export Log"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      )}

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Crime Type</th>
              <th className="py-3 px-4">
                <button 
                  onClick={() => {
                    setSortField('district');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center gap-1 hover:text-white cursor-pointer"
                >
                  Location <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">
                <button 
                  onClick={() => {
                    setSortField('severity');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center gap-1 hover:text-white cursor-pointer"
                >
                  Severity <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No incidents match the active filters.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <tr 
                  key={incident.id} 
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {incident.crimeType}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{incident.id}</span>
                      {incident.lossAmountInr ? (
                        <span className="text-amber-400/90 font-semibold">
                          • ₹{incident.lossAmountInr.toLocaleString()}
                        </span>
                      ) : null}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-200">
                      {incident.district}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {incident.state}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {incident.timestamp}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border font-mono uppercase ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadge(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncident(incident);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-700 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">{selectedIncident.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getSeverityBadge(selectedIncident.severity)}`}>
                    {selectedIncident.severity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedIncident.crimeType}
                </h3>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3 text-xs mb-5">
              <div>
                <span className="text-slate-400 block mb-0.5">Description & Incident Summary:</span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">Location:</span>
                  <p className="font-semibold text-white">{selectedIncident.district}, {selectedIncident.state}</p>
                  <p className="font-mono text-[10px] text-slate-400">GPS: {selectedIncident.lat}, {selectedIncident.lng}</p>
                </div>
                <div>
                  <span className="text-slate-400">Financial Loss Amount:</span>
                  <p className="font-bold text-amber-400 text-sm">
                    {selectedIncident.lossAmountInr ? `₹${selectedIncident.lossAmountInr.toLocaleString()}` : 'Nil Reported'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">Victim Category:</span>
                  <p className="font-medium text-slate-200">{selectedIncident.victimType}</p>
                </div>
                <div>
                  <span className="text-slate-400">Reporting Channel:</span>
                  <p className="font-medium text-cyan-300">{selectedIncident.source}</p>
                </div>
              </div>

              {selectedIncident.modusOperandi && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Modus Operandi / Technical Vector:</span>
                  <p className="text-slate-300 font-mono text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
                    {selectedIncident.modusOperandi}
                  </p>
                </div>
              )}
            </div>

            {/* Operational Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setSelectedDistrict(selectedIncident.district);
                  setSelectedIncident(null);
                  setCurrentRoute('risk-map');
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                View on GIS Risk Map
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    alert(`Intervention dispatch initiated for ${selectedIncident.id}. District Cyber Cell notified.`);
                    setSelectedIncident(null);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Cyber Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
