import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  DISTRICT_RISK_PROFILES, 
  HOTSPOT_ZONES, 
  LIVE_INCIDENTS, 
  EARLY_WARNING_ALERTS, 
  DISTRICT_ANALYTICS_DATA, 
  CRIME_TYPE_DISTRIBUTION, 
  MONTHLY_TREND_DATA,
  DEFAULT_THRESHOLDS
} from './src/data/cybercrimeData.ts';
import { calculateWhatIfScenario, CURRENT_ML_METRICS, generateExplainableAISummary } from './src/utils/mlEngine.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'CyberGuard AI Intelligence Engine', version: '2.4.0' });
});

app.get('/api/locations', (_req, res) => {
  const locations = Object.values(DISTRICT_RISK_PROFILES).map(d => ({
    district: d.district,
    state: d.state,
    lat: d.lat,
    lng: d.lng,
    riskScore: d.currentRiskScore,
    riskLevel: d.riskLevel,
    topCrimeType: d.topCrimeType
  }));
  res.json(locations);
});

app.get('/api/incidents', (req, res) => {
  let list = [...LIVE_INCIDENTS];
  const { district, crimeType, severity, search } = req.query;

  if (district && district !== 'All Districts') {
    list = list.filter(i => i.district.toLowerCase() === (district as string).toLowerCase());
  }
  if (crimeType && crimeType !== 'All Types') {
    list = list.filter(i => i.crimeType.toLowerCase() === (crimeType as string).toLowerCase());
  }
  if (severity && severity !== 'ALL') {
    list = list.filter(i => i.severity === severity);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(i => 
      i.description.toLowerCase().includes(q) || 
      i.district.toLowerCase().includes(q) || 
      i.crimeType.toLowerCase().includes(q) ||
      i.id.toLowerCase().includes(q)
    );
  }
  res.json(list);
});

app.get('/api/risk/:district?', (req, res) => {
  const district = req.params.district || (req.query.district as string) || 'Kurnool';
  const profile = DISTRICT_RISK_PROFILES[district] || DISTRICT_RISK_PROFILES['Kurnool'];
  res.json({
    districtData: profile,
    allDistricts: DISTRICT_RISK_PROFILES,
    thresholds: DEFAULT_THRESHOLDS
  });
});

app.get('/api/predictions/:district?', (req, res) => {
  const district = req.params.district || (req.query.district as string) || 'Kurnool';
  const profile = DISTRICT_RISK_PROFILES[district] || DISTRICT_RISK_PROFILES['Kurnool'];
  const explainability = generateExplainableAISummary(profile);

  res.json({
    prediction: profile,
    explainability,
    mlMetrics: CURRENT_ML_METRICS,
    thresholds: DEFAULT_THRESHOLDS
  });
});

app.get('/api/hotspots', (_req, res) => {
  res.json(HOTSPOT_ZONES);
});

app.get('/api/alerts', (_req, res) => {
  res.json(EARLY_WARNING_ALERTS);
});

app.get('/api/analytics', (_req, res) => {
  res.json({
    districtCases: DISTRICT_ANALYTICS_DATA,
    crimeDistribution: CRIME_TYPE_DISTRIBUTION,
    monthlyTrend: MONTHLY_TREND_DATA,
    summary: {
      totalCases: 1284,
      highRiskZones: 17,
      mediumRiskZones: 34,
      aiConfidence: 91
    }
  });
});

app.post('/api/simulate', (req, res) => {
  const { district = 'Kurnool', deltaPercent = 0, thresholds = DEFAULT_THRESHOLDS } = req.body;
  const baseProfile = DISTRICT_RISK_PROFILES[district] || DISTRICT_RISK_PROFILES['Kurnool'];
  const simulation = calculateWhatIfScenario(baseProfile, Number(deltaPercent), thresholds);
  res.json(simulation);
});

app.post('/api/predict', (req, res) => {
  const { district, previousIncidents, trendVelocity, digitalIndex } = req.body;
  const base = DISTRICT_RISK_PROFILES[district] || DISTRICT_RISK_PROFILES['Kurnool'];
  
  // Dynamic recalculated score based on parameter inputs
  const prevScore = Number(previousIncidents) || base.factors[0].rawScore;
  const trendScore = Number(trendVelocity) || base.factors[1].rawScore;
  const digScore = Number(digitalIndex) || base.factors[4].rawScore;
  
  const computedScore = Math.min(99, Math.max(10, Math.round(prevScore * 0.4 + trendScore * 0.35 + digScore * 0.25)));
  
  res.json({
    district: district || base.district,
    calculatedRiskScore: computedScore,
    confidence: base.aiConfidence,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/reports', (req, res) => {
  const type = (req.query.type as string) || 'district_risk';
  const district = (req.query.district as string) || 'Kurnool';
  const profile = DISTRICT_RISK_PROFILES[district] || DISTRICT_RISK_PROFILES['Kurnool'];

  res.json({
    reportId: `REP-${Date.now().toString(36).toUpperCase()}`,
    reportType: type,
    generatedAt: new Date().toISOString(),
    district: profile.district,
    riskScore: profile.currentRiskScore,
    riskLevel: profile.riskLevel,
    predictedIncidents: profile.predictedIncidentsRange,
    topThreat: profile.topCrimeType,
    summaryText: profile.explanation,
    auditHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  });
});

// Vite Integration & Server Startup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CyberGuard AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
