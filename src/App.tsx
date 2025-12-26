import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Settings } from './pages/Settings';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

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
    <ThemeProvider>
      <TransactionProvider>
        <Layout currentPath={currentPath} onNavigate={setCurrentPath}>
          {renderContent()}
        </Layout>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
