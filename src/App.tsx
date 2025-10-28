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
  const [userBranch, setUserBranch] = useState<string>(""); // <-- track manager branch

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // simulate login assigning role and branch
  const handleLogin = (role: "admin" | "manager" | "staff", branch?: string) => {
    setUserRole(role);
    setUserBranch(branch || "all");
    setIsLoggedIn(true);
  };

  const renderActiveModule = () => {
    if (isCustomerPortal)
      return <CustomerPortal onBackToERP={() => setIsCustomerPortal(false)} />;

    switch (activeModule) {
      case "dashboard":
        return <Dashboard selectedBranch={selectedBranch} />;

      // Admin full access
      case "users":
        return userRole === "admin" ? <UserManagement /> : <AccessDenied />;

      case "settings":
        return userRole === "admin" ? <Settings /> : <AccessDenied />;

      // Manager access: only reports and loans
      case "loans":
      case "reports":
        return userRole !== "staff" ? (
          activeModule === "loans" ? (
            <LoanManagement selectedBranch={selectedBranch} />
          ) : (
            <Reports selectedBranch={selectedBranch} />
          )
        ) : (
          <AccessDenied />
        );

      // Staff access: customers + gold valuation
      case "customers":
        return <CustomerManagement selectedBranch={selectedBranch} />;
      case "gold-valuation":
        return <GoldValuation />;

      // Payment & Auction Access Control
      case "payments":
        if (userRole === "admin")
          return <PaymentManagement selectedBranch="all" />;
        if (userRole === "manager")
          return <PaymentManagement selectedBranch={userBranch} />;
        return <AccessDenied />;

      case "auctions":
        if (userRole === "admin")
          return <AuctionManagement selectedBranch="all" />;
        if (userRole === "manager")
          return <AuctionManagement selectedBranch={userBranch} />;
        return <AccessDenied />;

      default:
        return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  if (!isLoggedIn) {
    // Example login usage:
    // onLogin("manager", "chennai") or onLogin("admin")
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          theme={theme}
          onCustomerPortal={() => setIsCustomerPortal(true)}
          role={userRole}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar
            theme={theme}
            toggleTheme={toggleTheme}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
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

const AccessDenied = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <p className="text-lg font-semibold">Access Denied</p>
    <p className="text-sm">You don’t have permission to view this section.</p>
  </div>
);
