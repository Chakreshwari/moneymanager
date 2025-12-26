import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState('/');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return authMode === 'login'
      ? <Login onSwitchToSignup={() => setAuthMode('signup')} />
      : <Signup onSwitchToLogin={() => setAuthMode('login')} />;
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/transactions':
        return <Transactions />;
      case '/budget':
        return <Budget />;
      case '/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TransactionProvider>
      <Layout currentPath={currentPath} onNavigate={setCurrentPath}>
        {renderContent()}
      </Layout>
    </TransactionProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
