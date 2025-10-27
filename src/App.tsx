import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { CustomerManagement } from './components/CustomerManagement';
import { GoldValuation } from './components/GoldValuation';
import { LoanManagement } from './components/LoanManagement';
import { PaymentManagement } from './components/PaymentManagement';
import { AuctionManagement } from './components/AuctionManagement';
import { Reports } from './components/Reports';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { CustomerPortal } from './components/CustomerPortal';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCustomerPortal, setIsCustomerPortal] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderActiveModule = () => {
    if (isCustomerPortal) {
      return <CustomerPortal onBackToERP={() => setIsCustomerPortal(false)} />;
    }

    switch (activeModule) {
      case 'dashboard':
        return <Dashboard selectedBranch={selectedBranch} />;
      case 'customers':
        return <CustomerManagement selectedBranch={selectedBranch} />;
      case 'gold-valuation':
        return <GoldValuation />;
      case 'loans':
        return <LoanManagement selectedBranch={selectedBranch} />;
      case 'payments':
        return <PaymentManagement selectedBranch={selectedBranch} />;
      case 'auctions':
        return <AuctionManagement selectedBranch={selectedBranch} />;
      case 'reports':
        return <Reports selectedBranch={selectedBranch} />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {!isCustomerPortal ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            theme={theme}
            onCustomerPortal={() => setIsCustomerPortal(true)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar
              theme={theme}
              toggleTheme={toggleTheme}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">
                {renderActiveModule()}
              </div>
            </main>
          </div>
        </div>
      ) : (
        renderActiveModule()
      )}
      <Toaster />
    </div>
  );
}
