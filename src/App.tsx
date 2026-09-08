import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginView } from './components/auth/LoginView';
import { AppLayout } from './components/layout/AppLayout';

const MainAppRouter: React.FC = () => {
  const { currentUser, currentRoute } = useApp();

  if (!currentUser || currentRoute === 'login') {
    return <LoginView />;
  }

  return <AppLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <MainAppRouter />
    </AppProvider>
  );
}
