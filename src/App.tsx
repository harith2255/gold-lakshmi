import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { CustomerManagement } from "./components/CustomerManagement";
import { GoldValuation } from "./components/GoldValuation";
import { LoanManagement } from "./components/LoanManagement";
import { PaymentManagement } from "./components/PaymentManagement";
import { AuctionManagement } from "./components/AuctionManagement";
import { Reports } from "./components/Reports";
import { UserManagement } from "./components/UserManagement";
import { Settings } from "./components/Settings";
import { CustomerPortal } from "./components/CustomerPortal";
import { Toaster } from "./components/ui/sonner";
import { AdminLogin } from "./components/adminLogin";

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCustomerPortal, setIsCustomerPortal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "manager" | "staff" | null>(null);
  const [userBranch, setUserBranch] = useState<string>("");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Simulated login with role + branch
  const handleLogin = (role: "admin" | "manager" | "staff", branch?: string) => {
    setUserRole(role);
    setUserBranch(branch || "all");
    setIsLoggedIn(true);
  };

  // Define role-based access for modules
  const roleAccess: Record<"admin" | "manager" | "staff", string[]> = {
    admin: [
      "dashboard",
      "customers",
      "gold-valuation",
      "loans",
      "payments",
      "auctions",
      "reports",
      "users",
      "settings",
    ],
    manager: ["dashboard", "payments", "auctions", "reports"],
    staff: ["dashboard", "customers", "gold-valuation"],
  };

  // Ensure current activeModule is accessible, else reset to dashboard
  if (userRole && !roleAccess[userRole].includes(activeModule)) {
    setActiveModule("dashboard");
  }

  const renderActiveModule = () => {
    if (isCustomerPortal)
      return <CustomerPortal onBackToERP={() => setIsCustomerPortal(false)} />;

    switch (activeModule) {
      case "dashboard":
        return <Dashboard selectedBranch={selectedBranch} />;

      case "customers":
        return <CustomerManagement selectedBranch={selectedBranch} />;

      case "gold-valuation":
        return <GoldValuation />;

      case "loans":
        return userRole === "admin" ? (
          <LoanManagement selectedBranch={selectedBranch} />
        ) : (
          <Dashboard selectedBranch={selectedBranch} />
        );

      case "payments":
        if (userRole === "admin")
          return <PaymentManagement selectedBranch="all" />;
        if (userRole === "manager")
          return <PaymentManagement selectedBranch={userBranch} />;
        return <Dashboard selectedBranch={selectedBranch} />;

      case "auctions":
        if (userRole === "admin")
          return <AuctionManagement selectedBranch="all" />;
        if (userRole === "manager")
          return <AuctionManagement selectedBranch={userBranch} />;
        return <Dashboard selectedBranch={selectedBranch} />;

      case "reports":
        return userRole !== "staff" ? (
          <Reports selectedBranch={selectedBranch} />
        ) : (
          <Dashboard selectedBranch={selectedBranch} />
        );

      case "users":
        return userRole === "admin" ? <UserManagement /> : <Dashboard selectedBranch={selectedBranch} />;

      case "settings":
        return userRole === "admin" ? <Settings /> : <Dashboard selectedBranch={selectedBranch} />;

      default:
        return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex h-screen relative overflow-visible z-0">
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          theme={theme}
          onCustomerPortal={() => setIsCustomerPortal(true)}
          role={userRole as "admin" | "manager" | "staff"}
        />
        <div className="flex-1 flex flex-col relative overflow-visible z-10">

         <TopBar
  theme={theme}
  toggleTheme={toggleTheme}
  selectedBranch={selectedBranch}
  setSelectedBranch={setSelectedBranch}
  userRole={userRole as 'admin' | 'manager' | 'staff'}
  userBranch={userBranch}
  onLogout={() => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserBranch('');
    setActiveModule('dashboard');
  }}
/>

          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{renderActiveModule()}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
