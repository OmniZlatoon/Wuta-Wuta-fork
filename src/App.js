import React, { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Image, PlusCircle, History, Sparkles, Settings } from 'lucide-react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  // Keep initial theme in sync before the first user toggle.
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const navigation = useMemo(
    () => [
      { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
      { id: 'gallery', name: 'Gallery', icon: Image },
      { id: 'create', name: 'Create', icon: PlusCircle },
      { id: 'history', name: 'History', icon: History },
      { id: 'ai', name: 'AI Studio', icon: Sparkles },
      { id: 'settings', name: 'Settings', icon: Settings },
    ],
    []
  );

  const handleConnectWallet = () => {
    setIsConnected(true);
    setAddress('GBRP...WUTA');
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <Header
        onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        address={address}
        isConnected={isConnected}
      />

      <div className="pt-16 sm:pt-20 md:flex">
        <Sidebar
          navigation={navigation}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default App;
