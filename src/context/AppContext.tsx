import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile, 
  DistrictRiskData, 
  CyberIncident, 
  EarlyWarningAlert, 
  RiskThresholds, 
  CrimeType 
} from '../types';
import { 
  DISTRICT_RISK_PROFILES, 
  LIVE_INCIDENTS, 
  EARLY_WARNING_ALERTS, 
  DEFAULT_THRESHOLDS 
} from '../data/cybercrimeData';

export type AppRoute = 
  | 'login' 
  | 'dashboard' 
  | 'command-center'
  | 'risk-map' 
  | 'analytics' 
  | 'predictions' 
  | 'alerts' 
  | 'simulator'
  | 'reports' 
  | 'awareness' 
  | 'settings';

interface AppContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedCrimeType: CrimeType;
  setSelectedCrimeType: (crimeType: CrimeType) => void;
  selectedTimePeriod: string;
  setSelectedTimePeriod: (period: string) => void;
  riskThresholds: RiskThresholds;
  setRiskThresholds: React.Dispatch<React.SetStateAction<RiskThresholds>>;
  incidents: CyberIncident[];
  alerts: EarlyWarningAlert[];
  markAlertAsReviewed: (id: string) => void;
  activeDistrictData: DistrictRiskData;
  allDistricts: Record<string, DistrictRiskData>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  police_officer: {
    id: 'USR-POL-042',
    name: 'Insp. Rajeshwar Reddy',
    badgeNumber: 'AP-CYBER-8841',
    department: 'State Cyber Crime Investigation Wing (Kurnool Range)',
    email: 'r.reddy@police.ap.gov.in',
    role: 'police_officer'
  },
  govt_admin: {
    id: 'USR-GOV-103',
    name: 'Dr. V. Lakshmi Prasanna IAS',
    badgeNumber: 'AP-HOME-0092',
    department: 'Ministry of Home & Information Technology, AP',
    email: 'secy.cybersec@ap.gov.in',
    role: 'govt_admin'
  },
  analyst: {
    id: 'USR-ANL-291',
    name: 'K. Sai Chandran',
    badgeNumber: 'CERT-IN-ANL-77',
    department: 'Cyber Threat Intelligence & Spatio-Temporal Analytics Unit',
    email: 'sai.c@cert-in.gov.in',
    role: 'analyst'
  },
  public_user: {
    id: 'USR-PUB-990',
    name: 'Nandu Pesala',
    department: 'Citizen Grievance & Public Digital Defense Watch',
    email: 'nandupesala@gmail.com',
    role: 'public_user'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return DEFAULT_USERS.police_officer; // Default logged in as Police Officer for command-center presentation
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>('police_officer');
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Kurnool');
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType>('All Types');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>('Next 30 Days');
  const [riskThresholds, setRiskThresholds] = useState<RiskThresholds>(DEFAULT_THRESHOLDS);
  const [incidents, setIncidents] = useState<CyberIncident[]>(LIVE_INCIDENTS);
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>(EARLY_WARNING_ALERTS);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeDistrictData: DistrictRiskData = 
    DISTRICT_RISK_PROFILES[selectedDistrict] || DISTRICT_RISK_PROFILES['Kurnool'];

  const loginAsRole = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentUser(DEFAULT_USERS[role]);
    setCurrentRoute('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRoute('login');
  };

  const markAlertAsReviewed = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'REVIEWED' } : a));
  };

  // Sync hash routing if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validRoutes: AppRoute[] = [
        'login', 'dashboard', 'command-center', 'risk-map', 'analytics', 
        'predictions', 'alerts', 'simulator', 'reports', 'awareness', 'settings'
      ];
      if (validRoutes.includes(hash as AppRoute)) {
        setCurrentRoute(hash as AppRoute);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSetRoute = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    setIsMobileDrawerOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute: handleSetRoute,
        currentUser,
        setCurrentUser,
        selectedRole,
        setSelectedRole,
        userRole: selectedRole,
        setUserRole: loginAsRole,
        selectedDistrict,
        setSelectedDistrict,
        selectedCrimeType,
        setSelectedCrimeType,
        selectedTimePeriod,
        setSelectedTimePeriod,
        riskThresholds,
        setRiskThresholds,
        incidents,
        alerts,
        markAlertAsReviewed,
        activeDistrictData,
        allDistricts: DISTRICT_RISK_PROFILES,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        loginAsRole,
        logout,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
