import {
  DistrictRiskData,
  CyberIncident,
  HotspotArea,
  EarlyWarningAlert,
  RiskThresholds,
  RiskLevel
} from '../types';

export const DEFAULT_THRESHOLDS: RiskThresholds = {
  lowMax: 25,
  medMax: 50,
  highMax: 75
};

export function getRiskLevelFromScore(score: number, thresholds: RiskThresholds = DEFAULT_THRESHOLDS): RiskLevel {
  if (score <= thresholds.lowMax) return 'LOW';
  if (score <= thresholds.medMax) return 'MEDIUM';
  if (score <= thresholds.highMax) return 'HIGH';
  return 'CRITICAL';
}

export const DISTRICT_RISK_PROFILES: Record<string, DistrictRiskData> = {
  'Kurnool': {
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    lat: 15.8281,
    lng: 78.0373,
    currentRiskScore: 87,
    riskLevel: 'HIGH',
    predictedIncidentsRange: [18, 25],
    aiConfidence: 91,
    totalHistoricalCases: 342,
    monthlyGrowthRate: 24.8,
    topCrimeType: 'Online Financial Fraud',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'HIGH',
        percentage: 35,
        rawScore: 88,
        description: 'Persistent baseline volume of repeat complaints across rural-urban banking corridors.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'HIGH',
        percentage: 25,
        rawScore: 82,
        description: 'Sharp 24.8% spike in unauthorized micro-debit and fake loan app complaints in last 30 days.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'HIGH',
        percentage: 20,
        rawScore: 78,
        description: 'Clustered transaction anomalies during banking cut-off hours (18:00 - 22:30 IST) and month-end salary cycles.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'MEDIUM',
        percentage: 12,
        rawScore: 64,
        description: 'High aggregation near Kurnool Bus Stand, Nandyal Road commercial hubs, and agricultural mandi centers.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'MEDIUM',
        percentage: 8,
        rawScore: 55,
        description: 'Accelerated UPI adoption without commensurate multi-factor security awareness.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'This area has shown a consistent increase in online financial-fraud reports over the past few months. Recent transaction activity and recurring complaint patterns contribute to the elevated risk score. Clustered fake investment links and impersonation fraud targeting local merchant networks represent the leading operational threat vector.',
    lastUpdated: '10 mins ago'
  },
  'Anantapur': {
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    lat: 14.6819,
    lng: 77.6006,
    currentRiskScore: 72,
    riskLevel: 'HIGH',
    predictedIncidentsRange: [14, 20],
    aiConfidence: 89,
    totalHistoricalCases: 264,
    monthlyGrowthRate: 16.2,
    topCrimeType: 'Phishing',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'HIGH',
        percentage: 32,
        rawScore: 74,
        description: 'Recurring utility bill SMS fraud and fraudulent electricity cutoff notices.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'MEDIUM',
        percentage: 22,
        rawScore: 68,
        description: 'Steep rise in SMS phishing links pretending to be state welfare disbursement portals.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'HIGH',
        percentage: 24,
        rawScore: 76,
        description: 'Peak spoofing dispatch observed on weekday mid-mornings between 10:00 - 13:00.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'MEDIUM',
        percentage: 14,
        rawScore: 60,
        description: 'Targeted geographic distribution along Hindupur and Guntakal railway junction zones.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'LOW',
        percentage: 8,
        rawScore: 48,
        description: 'Moderate digital payment density with emerging rural mobile wallet adoption.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Anantapur exhibits moderate-to-high phishing proliferation, predominantly orchestrated through targeted bulk SMS text lures posing as utility bill disconnection warnings and fraudulent KYC renewal links. Inter-district cyber cell coordination has documented syndicate links operating across border transit nodes.',
    lastUpdated: '25 mins ago'
  },
  'Kadapa': {
    district: 'Kadapa',
    state: 'Andhra Pradesh',
    lat: 14.4673,
    lng: 78.8242,
    currentRiskScore: 65,
    riskLevel: 'HIGH',
    predictedIncidentsRange: [11, 17],
    aiConfidence: 88,
    totalHistoricalCases: 218,
    monthlyGrowthRate: 11.4,
    topCrimeType: 'Identity Theft',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'MEDIUM',
        percentage: 30,
        rawScore: 66,
        description: 'Compromised SIM swap cases and synthetic identity fraud targeting credit lines.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'MEDIUM',
        percentage: 20,
        rawScore: 62,
        description: 'Gradual increase in unauthorized Aadhaar Enabled Payment System (AePS) disputes.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'MEDIUM',
        percentage: 22,
        rawScore: 59,
        description: 'Midnight biometric withdrawal complaints submitted after bank holiday weekends.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'MEDIUM',
        percentage: 16,
        rawScore: 61,
        description: 'Concentration around Proddatur bullion trade corridor and municipal sub-registrars.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'LOW',
        percentage: 12,
        rawScore: 51,
        description: 'Rapid transition of traditional cash trade to AePS and merchant POS machines.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Kadapa demonstrates elevated risks in identity manipulation and AePS transaction spoofing. Micro-ATM terminals in peripheral mandi markets require heightened surveillance and merchant biometric security audits.',
    lastUpdated: '42 mins ago'
  },
  'Guntur': {
    district: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    currentRiskScore: 58,
    riskLevel: 'HIGH',
    predictedIncidentsRange: [10, 15],
    aiConfidence: 86,
    totalHistoricalCases: 289,
    monthlyGrowthRate: 8.9,
    topCrimeType: 'Cyberstalking',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'MEDIUM',
        percentage: 28,
        rawScore: 58,
        description: 'Persistent complaints regarding social media impersonation and deepfake extortion threats.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'MEDIUM',
        percentage: 24,
        rawScore: 60,
        description: 'Surge in student campus harassment reports and unauthorized photographic morphing.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'HIGH',
        percentage: 22,
        rawScore: 71,
        description: 'Night hours (21:00 - 02:00) harassment surges across encrypted messaging apps.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'MEDIUM',
        percentage: 14,
        rawScore: 52,
        description: 'Clusters near educational university townships and coaching center belts.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'HIGH',
        percentage: 12,
        rawScore: 78,
        description: 'Heavy social media engagement among younger demographic groups.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Guntur exhibits a distinct pattern of cyberstalking and digital blackmail targeting youth demographics. Early detection and swift takedown coordination with intermediary platforms has been recommended.',
    lastUpdated: '1 hour ago'
  },
  'Nellore': {
    district: 'Nellore',
    state: 'Andhra Pradesh',
    lat: 14.4426,
    lng: 79.9865,
    currentRiskScore: 48,
    riskLevel: 'MEDIUM',
    predictedIncidentsRange: [7, 12],
    aiConfidence: 84,
    totalHistoricalCases: 165,
    monthlyGrowthRate: 5.3,
    topCrimeType: 'Social Media Scams',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'MEDIUM',
        percentage: 26,
        rawScore: 49,
        description: 'Fake investment groups promising high daily returns on crypto and stock trading.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'LOW',
        percentage: 22,
        rawScore: 45,
        description: 'Moderate growth in Part-Time Work / YouTube Video Liking scams.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'MEDIUM',
        percentage: 20,
        rawScore: 52,
        description: 'Weekend engagement peaks through sponsored Telegram & Instagram group ads.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'LOW',
        percentage: 18,
        rawScore: 41,
        description: 'Dispersed across coastal aquaculture trading hubs.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'MEDIUM',
        percentage: 14,
        rawScore: 54,
        description: 'Active mobile banking usage in maritime commerce and logistics.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Nellore demonstrates controlled medium-level risk with primary vulnerability around speculative work-from-home fraud networks. Preventive awareness interventions have helped stabilize report acceleration.',
    lastUpdated: '2 hours ago'
  },
  'Visakhapatnam': {
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    lat: 17.6868,
    lng: 83.2185,
    currentRiskScore: 79,
    riskLevel: 'CRITICAL',
    predictedIncidentsRange: [22, 31],
    aiConfidence: 93,
    totalHistoricalCases: 412,
    monthlyGrowthRate: 28.1,
    topCrimeType: 'Online Financial Fraud',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'HIGH',
        percentage: 34,
        rawScore: 85,
        description: 'Corporate executive impersonation and elaborate stock trading app syndicates.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'HIGH',
        percentage: 26,
        rawScore: 84,
        description: 'High-value fraudulent fund routing exceeding ₹4.2 Crores tracked in current quarter.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'HIGH',
        percentage: 18,
        rawScore: 77,
        description: 'Business hours fund diversion coordinated via mule bank accounts.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'HIGH',
        percentage: 12,
        rawScore: 82,
        description: 'High incidence in IT SEZ corridors, Madhurawada, and Gajuwaka industrial zone.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'HIGH',
        percentage: 10,
        rawScore: 91,
        description: 'Highest digital and e-commerce transaction density in the state.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Visakhapatnam exhibits critical exposure to sophisticated transnational investment scams and mule-account networks. The convergence of high digital liquidity and dense industrial enterprise presence elevates overall risk severity.',
    lastUpdated: '15 mins ago'
  },
  'Vijayawada': {
    district: 'Vijayawada (NTR)',
    state: 'Andhra Pradesh',
    lat: 16.5062,
    lng: 80.6480,
    currentRiskScore: 76,
    riskLevel: 'CRITICAL',
    predictedIncidentsRange: [19, 27],
    aiConfidence: 90,
    totalHistoricalCases: 378,
    monthlyGrowthRate: 21.4,
    topCrimeType: 'UPI / Payment Gateway Scams',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'HIGH',
        percentage: 33,
        rawScore: 81,
        description: 'QR code reverse charge fraud and fake seller listings on classified platforms.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'HIGH',
        percentage: 25,
        rawScore: 79,
        description: 'Frequent spoofed bank SMS alerts directing merchants to malicious APK files.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'HIGH',
        percentage: 20,
        rawScore: 74,
        description: 'Heavy weekend trade hours matching retail commerce rushes.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'HIGH',
        percentage: 12,
        rawScore: 79,
        description: 'Dense hotspots around Governorpet, Benz Circle, and Auto Nagar commercial belt.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'HIGH',
        percentage: 10,
        rawScore: 86,
        description: 'Intense micro-merchant QR turnover and wholesale cash-to-digital conversions.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Vijayawada commercial nodes are heavily targeted by fake QR code payment soundbox spoofing and malicious loan application droppers. Proactive merchant sensitization remains essential.',
    lastUpdated: '18 mins ago'
  },
  'Tirupati': {
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    lat: 13.6288,
    lng: 79.4192,
    currentRiskScore: 61,
    riskLevel: 'HIGH',
    predictedIncidentsRange: [12, 18],
    aiConfidence: 87,
    totalHistoricalCases: 231,
    monthlyGrowthRate: 14.2,
    topCrimeType: 'Phishing',
    factors: [
      {
        id: 'f1',
        name: 'Previous Crime Incidents',
        level: 'MEDIUM',
        percentage: 31,
        rawScore: 68,
        description: 'Counterfeit darshan/accommodation ticket booking portals and fake donation trust websites.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'f2',
        name: 'Recent Increase',
        level: 'HIGH',
        percentage: 27,
        rawScore: 75,
        description: 'Surge in pilgrim-focused impersonation websites during upcoming festival seasons.',
        iconName: 'TrendingUp'
      },
      {
        id: 'f3',
        name: 'Time Pattern',
        level: 'MEDIUM',
        percentage: 19,
        rawScore: 63,
        description: 'Spikes correlated with official quota release schedules.',
        iconName: 'Clock'
      },
      {
        id: 'f4',
        name: 'Crime Density',
        level: 'MEDIUM',
        percentage: 13,
        rawScore: 59,
        description: 'Clustered around transit hubs, Alipiri, and railway accommodation zones.',
        iconName: 'MapPin'
      },
      {
        id: 'f5',
        name: 'Digital Activity Index',
        level: 'MEDIUM',
        percentage: 10,
        rawScore: 69,
        description: 'Transient high-density pilgrim digital transactions and temporary roaming users.',
        iconName: 'Smartphone'
      }
    ],
    explanation: 'Tirupati experiences targeted seasonal spoofing of temple reservation infrastructure. Rapid domain takedowns and cyber warning SMS alerts at transit arrival stations serve as effective mitigations.',
    lastUpdated: '30 mins ago'
  }
};

export const HOTSPOT_ZONES: HotspotArea[] = [
  {
    id: 'hs-1',
    name: 'Kurnool Old City & Mandi Belt',
    district: 'Kurnool',
    lat: 15.8281,
    lng: 78.0373,
    radiusMeters: 2400,
    hotspotScore: 89,
    crimeDensity: 42.6,
    trend: 'RAPIDLY_INCREASING',
    riskLevel: 'HIGH',
    primaryThreat: 'Online Financial Fraud',
    incidentCount: 48
  },
  {
    id: 'hs-2',
    name: 'Nandyal Checkpost Tech Corridor',
    district: 'Kurnool',
    lat: 15.8078,
    lng: 78.0542,
    radiusMeters: 1800,
    hotspotScore: 84,
    crimeDensity: 36.1,
    trend: 'RAPIDLY_INCREASING',
    riskLevel: 'HIGH',
    primaryThreat: 'UPI / Payment Gateway Scams',
    incidentCount: 37
  },
  {
    id: 'hs-3',
    name: 'Anantapur Clock Tower & Railway Zone',
    district: 'Anantapur',
    lat: 14.6819,
    lng: 77.6006,
    radiusMeters: 2100,
    hotspotScore: 73,
    crimeDensity: 28.4,
    trend: 'MODERATE_INCREASE',
    riskLevel: 'HIGH',
    primaryThreat: 'Phishing',
    incidentCount: 31
  },
  {
    id: 'hs-4',
    name: 'Kadapa Commercial Hub & 7-Roads Junction',
    district: 'Kadapa',
    lat: 14.4673,
    lng: 78.8242,
    radiusMeters: 1900,
    hotspotScore: 66,
    crimeDensity: 23.8,
    trend: 'STABLE',
    riskLevel: 'HIGH',
    primaryThreat: 'Identity Theft',
    incidentCount: 26
  },
  {
    id: 'hs-5',
    name: 'Guntur Brodipet & Arundelpet',
    district: 'Guntur',
    lat: 16.3067,
    lng: 80.4365,
    radiusMeters: 2000,
    hotspotScore: 60,
    crimeDensity: 21.2,
    trend: 'MODERATE_INCREASE',
    riskLevel: 'HIGH',
    primaryThreat: 'Cyberstalking',
    incidentCount: 24
  },
  {
    id: 'hs-6',
    name: 'Nellore Trunk Road Market',
    district: 'Nellore',
    lat: 14.4426,
    lng: 79.9865,
    radiusMeters: 1700,
    hotspotScore: 48,
    crimeDensity: 14.5,
    trend: 'DECREASING',
    riskLevel: 'MEDIUM',
    primaryThreat: 'Social Media Scams',
    incidentCount: 16
  },
  {
    id: 'hs-7',
    name: 'Vizag Madhurawada IT Hub',
    district: 'Visakhapatnam',
    lat: 17.8185,
    lng: 83.3530,
    radiusMeters: 2600,
    hotspotScore: 82,
    crimeDensity: 46.9,
    trend: 'RAPIDLY_INCREASING',
    riskLevel: 'CRITICAL',
    primaryThreat: 'Online Financial Fraud',
    incidentCount: 56
  },
  {
    id: 'hs-8',
    name: 'Vijayawada Benz Circle & MG Road',
    district: 'Vijayawada',
    lat: 16.5015,
    lng: 80.6521,
    radiusMeters: 2200,
    hotspotScore: 78,
    crimeDensity: 39.4,
    trend: 'RAPIDLY_INCREASING',
    riskLevel: 'CRITICAL',
    primaryThreat: 'UPI / Payment Gateway Scams',
    incidentCount: 44
  }
];

export const LIVE_INCIDENTS: CyberIncident[] = [
  {
    id: 'INC-2026-8912',
    date: '2026-09-08',
    timestamp: '2 hours ago',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    lat: 15.8281,
    lng: 78.0373,
    crimeType: 'Online Financial Fraud',
    incidentCount: 1,
    severity: 'HIGH',
    status: 'INVESTIGATING',
    source: 'National Cybercrime Reporting Portal (1930)',
    description: 'Victim targeted via fake instant overdraft WhatsApp advisory; ₹1,85,000 transferred across 3 digital mule accounts.',
    lossAmountInr: 185000,
    victimType: 'Individual',
    modusOperandi: 'WhatsApp APK Dropper + OTP forwarding service'
  },
  {
    id: 'INC-2026-8911',
    date: '2026-09-08',
    timestamp: '4 hours ago',
    state: 'Andhra Pradesh',
    district: 'Anantapur',
    lat: 14.6819,
    lng: 77.6006,
    crimeType: 'Phishing',
    incidentCount: 1,
    severity: 'MEDIUM',
    status: 'ESCALATED',
    source: 'District Cyber Cell Helpline',
    description: 'Bulk spoof SMS campaign targeting electricity consumer billing credentials with malicious shortened link.',
    lossAmountInr: 42000,
    victimType: 'Senior Citizen',
    modusOperandi: 'Shortened bit.ly link spoofing state discom portal'
  },
  {
    id: 'INC-2026-8910',
    date: '2026-09-08',
    timestamp: '6 hours ago',
    state: 'Andhra Pradesh',
    district: 'Kadapa',
    lat: 14.4673,
    lng: 78.8242,
    crimeType: 'Identity Theft',
    incidentCount: 1,
    severity: 'HIGH',
    status: 'INVESTIGATING',
    source: 'State Cyber Cell Direct Dispatch',
    description: 'AePS biometric clone withdrawal dispute originating from an unauthorized rural kiosk micro-ATM terminal.',
    lossAmountInr: 75000,
    victimType: 'Individual',
    modusOperandi: 'Silicon fingerprint replica on AePS cash-out'
  },
  {
    id: 'INC-2026-8909',
    date: '2026-09-08',
    timestamp: '8 hours ago',
    state: 'Andhra Pradesh',
    district: 'Nellore',
    lat: 14.4426,
    lng: 79.9865,
    crimeType: 'Social Media Scams',
    incidentCount: 1,
    severity: 'LOW',
    status: 'UNDER_REVIEW',
    source: 'Social Media Grievance Cell',
    description: 'Telegram investment channel scheme guaranteeing 200% weekly returns on synthetic commodities tokens.',
    lossAmountInr: 30000,
    victimType: 'Student',
    modusOperandi: 'Telegram task bot lure with fake dashboard'
  },
  {
    id: 'INC-2026-8908',
    date: '2026-09-08',
    timestamp: '12 hours ago',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    lat: 16.3067,
    lng: 80.4365,
    crimeType: 'Cyberstalking',
    incidentCount: 1,
    severity: 'MEDIUM',
    status: 'RESOLVED',
    source: 'Women & Child Safety Cyber Desk',
    description: 'Deepfake photo manipulation and blackmail via burner Instagram accounts targeting university student.',
    lossAmountInr: 0,
    victimType: 'Student',
    modusOperandi: 'AI Face-swap software + anonymous VoIP threatening calls'
  },
  {
    id: 'INC-2026-8907',
    date: '2026-09-07',
    timestamp: '18 hours ago',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    lat: 17.6868,
    lng: 83.2185,
    crimeType: 'Online Financial Fraud',
    incidentCount: 1,
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    source: 'CBI / State CID Cyber Cell Coordination',
    description: 'Institutional trading app scam targeting retired defense personnel; ₹12,50,000 routed to overseas crypto gateway.',
    lossAmountInr: 1250000,
    victimType: 'Senior Citizen',
    modusOperandi: 'Fake SEBI registered institutional investment portal'
  },
  {
    id: 'INC-2026-8906',
    date: '2026-09-07',
    timestamp: '1 day ago',
    state: 'Andhra Pradesh',
    district: 'Vijayawada',
    lat: 16.5062,
    lng: 80.6480,
    crimeType: 'UPI / Payment Gateway Scams',
    incidentCount: 1,
    severity: 'HIGH',
    status: 'INVESTIGATING',
    source: '1930 Portal Integration',
    description: 'Fraudulent merchant QR sticker pasted over genuine retail QR code in Governorpet wholesale market.',
    lossAmountInr: 58000,
    victimType: 'Commercial / Business',
    modusOperandi: 'Physical QR sticker replacement on shop counter'
  },
  {
    id: 'INC-2026-8905',
    date: '2026-09-07',
    timestamp: '1 day ago',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    lat: 15.8281,
    lng: 78.0373,
    crimeType: 'Ransomware / Extortion',
    incidentCount: 1,
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    source: 'District Cyber Command Station',
    description: 'Loan app extortion harassment targeting victim phone contacts using morphed contact book data.',
    lossAmountInr: 95000,
    victimType: 'Individual',
    modusOperandi: 'Predatory lending app with broad Android contact permissions'
  },
  {
    id: 'INC-2026-8904',
    date: '2026-09-06',
    timestamp: '2 days ago',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    lat: 13.6288,
    lng: 79.4192,
    crimeType: 'Phishing',
    incidentCount: 1,
    severity: 'MEDIUM',
    status: 'RESOLVED',
    source: 'District Cyber Cell Helpline',
    description: 'Fake VIP darshan booking portal imitating official endowment trust server.',
    lossAmountInr: 28000,
    victimType: 'Individual',
    modusOperandi: 'Typosquatting domain with sponsored Google search ad'
  }
];

export const EARLY_WARNING_ALERTS: EarlyWarningAlert[] = [
  {
    id: 'ALT-1092',
    title: 'High-Risk Activity Detected',
    message: 'A significant increase in online financial-fraud reports has been detected in Kurnool, Andhra Pradesh.',
    riskLevel: 'HIGH',
    predictedIncidents: '18–25',
    timePeriod: 'Next 30 Days',
    confidence: 91,
    severity: 'CRITICAL',
    timestamp: '15 mins ago',
    location: 'Kurnool District Urban & Mandi Hubs',
    district: 'Kurnool',
    crimeCategory: 'Online Financial Fraud',
    status: 'ACTIVE',
    recommendedActions: [
      'Increase cyber-awareness campaigns across local banking and mandi branches',
      'Prioritize monitoring and resources for 1930 golden-hour helpline interventions',
      'Review recent complaint patterns and flag associated UPI Virtual Payment Addresses (VPAs)',
      'Coordinate with local cybercrime units and bank nodal officers for immediate account freezes'
    ]
  },
  {
    id: 'ALT-1091',
    title: 'Phishing Campaign Surge',
    message: 'Coordinated bulk SMS phishing wave detected impersonating state welfare payment disbursements.',
    riskLevel: 'HIGH',
    predictedIncidents: '14–20',
    timePeriod: 'Next 30 Days',
    confidence: 89,
    severity: 'HIGH',
    timestamp: '1 hour ago',
    location: 'Anantapur & Hindupur Railway Belt',
    district: 'Anantapur',
    crimeCategory: 'Phishing',
    status: 'ACTIVE',
    recommendedActions: [
      'Issue immediate telecom carrier alert to blacklist identified malicious sender IDs',
      'Broadcast public safety SMS warnings via state disaster/cyber network',
      'Deploy regional cyber awareness teams to common transit hubs'
    ]
  },
  {
    id: 'ALT-1090',
    title: 'Critical SEZ Investment Fraud Cluster',
    message: 'Sophisticated institutional investment spoofing targeting high-net-worth tech sector professionals.',
    riskLevel: 'CRITICAL',
    predictedIncidents: '22–31',
    timePeriod: 'Next 30 Days',
    confidence: 93,
    severity: 'CRITICAL',
    timestamp: '3 hours ago',
    location: 'Visakhapatnam SEZ & Madhurawada',
    district: 'Visakhapatnam',
    crimeCategory: 'Online Financial Fraud',
    status: 'ACTIVE',
    recommendedActions: [
      'Liaison with SEBI and FIU-IND regarding identified fraudulent trading portals',
      'Trace second-layer mule account transfers across local private bank branches',
      'Conduct urgent advisory seminar for IT park employee associations'
    ]
  },
  {
    id: 'ALT-1089',
    title: 'Biometric AePS Fraud Spike',
    message: 'Abnormal concentration of late-night AePS withdrawal disputes registered across micro-ATM points.',
    riskLevel: 'HIGH',
    predictedIncidents: '11–17',
    timePeriod: 'Next 30 Days',
    confidence: 88,
    severity: 'HIGH',
    timestamp: '5 hours ago',
    location: 'Kadapa Commercial & Proddatur Belt',
    district: 'Kadapa',
    crimeCategory: 'Identity Theft',
    status: 'REVIEWED',
    recommendedActions: [
      'Notify regional bank leads to enforce stricter geo-fencing on AePS terminal operators',
      'Mandate secondary two-factor authentication for transactions exceeding ₹5,000',
      'Audit banking correspondents exhibiting abnormally high biometric retry rates'
    ]
  }
];

export const DISTRICT_ANALYTICS_DATA = [
  { district: 'Visakhapatnam', cases: 412, highRiskScore: 79, growthRate: 28.1 },
  { district: 'Vijayawada', cases: 378, highRiskScore: 76, growthRate: 21.4 },
  { district: 'Kurnool', cases: 342, highRiskScore: 87, growthRate: 24.8 },
  { district: 'Guntur', cases: 289, highRiskScore: 58, growthRate: 8.9 },
  { district: 'Anantapur', cases: 264, highRiskScore: 72, growthRate: 16.2 },
  { district: 'Tirupati', cases: 231, highRiskScore: 61, growthRate: 14.2 },
  { district: 'Kadapa', cases: 218, highRiskScore: 65, growthRate: 11.4 },
  { district: 'Nellore', cases: 165, highRiskScore: 48, growthRate: 5.3 }
];

export const CRIME_TYPE_DISTRIBUTION = [
  { category: 'Financial Fraud', count: 524, percentage: 40.8, color: '#ef4444' },
  { category: 'Phishing', count: 282, percentage: 22.0, color: '#f97316' },
  { category: 'Identity Theft', count: 184, percentage: 14.3, color: '#eab308' },
  { category: 'UPI / Payment Scams', count: 142, percentage: 11.1, color: '#06b6d4' },
  { category: 'Social Media Scams', count: 96, percentage: 7.5, color: '#8b5cf6' },
  { category: 'Cyberstalking', count: 56, percentage: 4.3, color: '#ec4899' }
];

export const MONTHLY_TREND_DATA = [
  { month: 'Apr', cases: 88, predicted: 85, financialFraud: 34, phishing: 20 },
  { month: 'May', cases: 104, predicted: 100, financialFraud: 42, phishing: 24 },
  { month: 'Jun', cases: 122, predicted: 118, financialFraud: 51, phishing: 29 },
  { month: 'Jul', cases: 146, predicted: 140, financialFraud: 65, phishing: 33 },
  { month: 'Aug', cases: 178, predicted: 172, financialFraud: 78, phishing: 41 },
  { month: 'Sep (Est)', cases: 215, predicted: 208, financialFraud: 95, phishing: 49 },
  { month: 'Oct (Proj)', cases: 248, predicted: 245, financialFraud: 112, phishing: 58 }
];

export const AWARENESS_MODULES = [
  {
    id: 'phishing',
    title: 'Phishing & SMS Spoofing Prevention',
    category: 'Attack Vector',
    summary: 'How cyber syndicates craft deceptive messages to steal banking credentials and state identity documents.',
    warningSigns: [
      'Urgent messages threatening electricity, bank, or SIM card disconnection within 24 hours',
      'Shortened URL links (bit.ly, tinyurl, or random IP addresses)',
      'Unsolicited calls claiming to be from Telecom Regulatory Authority (TRAI) or Police'
    ],
    preventionTips: [
      'Never tap on APK download links sent over SMS or WhatsApp',
      'Verify official contact numbers exclusively through authorized bank passbooks or official government .gov.in domains',
      'Immediately report phishing numbers to Chakshu portal or 1930'
    ],
    readTime: '3 min read'
  },
  {
    id: 'financial-fraud',
    title: 'Online Financial Fraud & Fake Investment Syndicates',
    category: 'Financial Defense',
    summary: 'Understanding modern Ponzi task apps, Telegram trading channels, and predatory loan extortions.',
    warningSigns: [
      'Promises of guaranteed 10% to 50% daily profits on crypto/stocks',
      'Requests to transfer investment deposits to individual savings accounts instead of registered entity accounts',
      'Apps requiring access to photos, camera, and contacts before sanctioning small loans'
    ],
    preventionTips: [
      'Verify whether financial intermediaries are registered on the official SEBI or RBI directories',
      'Remember: Genuine stockbrokers never conduct private trading via closed Telegram or WhatsApp groups',
      'Refuse payment for "withdrawal taxes" or "clearance fees" to unlock fake account balances'
    ],
    readTime: '4 min read'
  },
  {
    id: 'upi-safety',
    title: 'UPI & QR Code Payment Safety',
    category: 'Transaction Security',
    summary: 'Critical rules for merchants and daily consumers using Unified Payments Interface (UPI).',
    warningSigns: [
      'A buyer asking you to scan a QR code or enter your UPI PIN to "receive" money',
      'Physical paper QR stickers overlaid unevenly on genuine merchant acrylic stands',
      'Requests to initiate screen sharing (AnyDesk, TeamViewer) to resolve failed payments'
    ],
    preventionTips: [
      'Golden Rule: You ONLY enter your UPI PIN to SEND money, never to RECEIVE money',
      'Regularly inspect your merchant QR stands for physical tampering or overlaid stickers',
      'Enable biometric app-lock on all UPI and mobile banking apps'
    ],
    readTime: '3 min read'
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft & AePS Biometric Protection',
    category: 'Identity Guard',
    summary: 'Securing your Aadhaar biometric records and preventing SIM swap exploitation.',
    warningSigns: [
      'Sudden loss of cellular network reception on your phone for prolonged hours (possible SIM swap)',
      'Unexpected SMS notifications regarding Aadhaar OTP requests or AePS cash withdrawals',
      'Suspicious loan accounts appearing on your credit bureau report (CIBIL/Experian)'
    ],
    preventionTips: [
      'Lock your Aadhaar biometrics via the official mAadhaar app or uidai.gov.in portal',
      'Unlock biometrics only on-demand when performing a known physical transaction, then relock immediately',
      'Notify your mobile carrier immediately if your SIM abruptly ceases functioning'
    ],
    readTime: '3 min read'
  },
  {
    id: 'reporting',
    title: 'Reporting Cybercrime: The "Golden Hour" Protocol',
    category: 'Law Enforcement',
    summary: 'Immediate action steps to freeze stolen funds within the critical 2-hour window.',
    warningSigns: [
      'Unauthorized debit notification from bank without OTP input',
      'Suspected transaction initiated under coercion or social engineering'
    ],
    preventionTips: [
      'Dial 1930 immediately to reach the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS)',
      'File an official complaint online at www.cybercrime.gov.in with transaction UTR numbers and screenshots',
      'Contact your bank immediately to hotlist cards and freeze net banking accounts'
    ],
    readTime: '2 min read'
  }
];
