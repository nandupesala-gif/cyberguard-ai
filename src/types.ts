export type UserRole = 
  | 'police_officer' 
  | 'govt_admin' 
  | 'analyst' 
  | 'public_user';

export interface UserProfile {
  id: string;
  name: string;
  badgeNumber?: string;
  department?: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type CrimeType = 
  | 'All Types'
  | 'Online Financial Fraud' 
  | 'Phishing' 
  | 'Identity Theft' 
  | 'Social Media Scams' 
  | 'Cyberstalking' 
  | 'Ransomware / Extortion'
  | 'UPI / Payment Gateway Scams';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LocationGeo {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  cyberCellContact: string;
}

export interface CyberIncident {
  id: string;
  date: string;
  timestamp: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  crimeType: CrimeType;
  incidentCount: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'INVESTIGATING' | 'ESCALATED' | 'RESOLVED' | 'UNDER_REVIEW';
  source: string;
  description: string;
  lossAmountInr?: number;
  victimType: 'Individual' | 'Commercial / Business' | 'Senior Citizen' | 'Student';
  ipOriginCountry?: string;
  modusOperandi?: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  percentage: number;
  rawScore: number;
  description: string;
  iconName: string;
}

export interface DistrictRiskData {
  district: string;
  state: string;
  lat: number;
  lng: number;
  currentRiskScore: number;
  riskLevel: RiskLevel;
  predictedIncidentsRange: [number, number];
  aiConfidence: number;
  totalHistoricalCases: number;
  monthlyGrowthRate: number;
  topCrimeType: CrimeType;
  factors: RiskFactor[];
  explanation: string;
  lastUpdated: string;
}

export interface HotspotArea {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  hotspotScore: number;
  crimeDensity: number; // cases per sq km
  trend: 'RAPIDLY_INCREASING' | 'STABLE' | 'MODERATE_INCREASE' | 'DECREASING';
  riskLevel: RiskLevel;
  primaryThreat: CrimeType;
  incidentCount: number;
}

export interface EarlyWarningAlert {
  id: string;
  title: string;
  message: string;
  riskLevel: RiskLevel;
  predictedIncidents: string;
  timePeriod: string;
  confidence: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  location: string;
  district: string;
  crimeCategory: CrimeType;
  status: 'ACTIVE' | 'REVIEWED' | 'DISMISSED';
  recommendedActions: string[];
}

export interface WhatIfScenarioResult {
  sliderPercent: number;
  baseScore: number;
  projectedScore: number;
  projectedIncidentsRange: [number, number];
  projectedRiskLevel: RiskLevel;
  keyDrivers: string[];
  mitigationImpactText: string;
}

export interface RiskThresholds {
  lowMax: number;    // default 25
  medMax: number;    // default 50
  highMax: number;   // default 75
}
