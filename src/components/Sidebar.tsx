import React from 'react';
import {
  LayoutDashboard,
  Users,
  Coins,
  FileText,
  CreditCard,
  Gavel,
  BarChart3,
  UserCog,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  theme: 'light' | 'dark';
  onCustomerPortal: () => void;
}

export function Sidebar({
  activeModule,
  setActiveModule,
  collapsed,
  setCollapsed,
  theme,
  onCustomerPortal,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'gold-valuation', label: 'Gold Valuation', icon: Coins },
    { id: 'loans', label: 'Loan Management', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'auctions', label: 'Auctions', icon: Gavel },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: UserCog },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside
      className={`${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="w-full">
  <img
    src="assets/logo.png" // 🖼️ replace with your actual image path (e.g., /assets/logo.png or imported logo)
    alt="Gold Lakshmi Logo"
    className="w-full h-10 rounded-lg object-cover"
  />
</div>

            )}
            {collapsed && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto">
                <Coins className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : ''}
                  >
                    <Icon className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Customer Portal Button */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onCustomerPortal}
            variant="outline"
            className={`w-full ${collapsed ? 'px-0' : ''}`}
            title={collapsed ? 'Customer Portal' : ''}
          >
            <Globe className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4 mr-2'}`} />
            {!collapsed && 'Customer Portal'}
          </Button>
        </div>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={() => setCollapsed(!collapsed)}
            variant="ghost"
            className="w-full"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
