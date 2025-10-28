import React, { useState } from 'react';
import { Bell, Moon, Sun, ChevronDown, Search } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface TopBarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  userRole: 'admin' | 'manager' | 'staff';
  userBranch?: string;
  onLogout: () => void;
}

export function TopBar({
  theme,
  toggleTheme,
  selectedBranch,
  setSelectedBranch,
  userRole,
  userBranch,
  onLogout,
}: TopBarProps) {
  const [notifications] = useState([
    { id: 1, message: '5 loans overdue for payment', type: 'warning' },
    { id: 2, message: 'New customer KYC pending approval', type: 'info' },
    { id: 3, message: 'Gold rate updated to ₹6,250/gram', type: 'success' },
  ]);

  const branches = [
    { id: 'all', name: 'All Branches' },
    { id: 'branch-1', name: 'Mumbai - Andheri' },
    { id: 'branch-2', name: 'Delhi - Karol Bagh' },
    { id: 'branch-3', name: 'Bangalore - Jayanagar' },
    { id: 'branch-4', name: 'Chennai - T Nagar' },
  ];

  const currentBranch = branches.find((b) => b.id === selectedBranch);
  const userBranchName = branches.find((b) => b.id === userBranch)?.name || '';

  // Role title formatting
  const roleLabel =
    userRole === 'admin'
      ? 'Administrator'
      : userRole === 'manager'
      ? 'Branch Manager'
      : 'Staff Member';

  return (
    <header
      className={`${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search customers, loans, transactions..."
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Branch Selector (Admins can switch branches) */}
          {userRole === 'admin' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {currentBranch?.name}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                  >
                    {branch.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="py-3">
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        notif.type === 'warning'
                          ? 'bg-yellow-500'
                          : notif.type === 'success'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <span className="text-sm">{notif.message}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
                  {userRole.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm capitalize">{userRole}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {roleLabel}
                    {userBranch && userRole !== 'admin' && (
                      <>
                        <br />
                        <span className="text-xs text-gray-400">{userBranchName}</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={onLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
