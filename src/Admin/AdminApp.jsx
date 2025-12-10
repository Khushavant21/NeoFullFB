import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import TopNavbar from "./Components/TopNavbar";
import SplashScreen from "./Components/SplashScreen";
import Dashboard from "./Components/Dashboard";
import AccountsDashboard from "./pages/AccountsDashboard/AccountsDashboard.jsx";
import UserManagement from "./pages/UserManagement/UserManagement";
import ComplaintsLayout from "./pages/Complaints&Support/components/ComplaintsLayout";
import InvestmentPanel from "./pages/Investment_products/components/InvestmentPanel";
import KYCComplianceRoutes from "./pages/KYC_Compliance";
import DepositManagement from "./pages/DepositManagement/AdminDeposits";
import Loans from "./pages/Loan/Loans.jsx";
import MoneyTransferRequest from "./pages/MoneyTransferRequests/MoneyTransferRequests";
import Reports from "./pages/Reports/Reports.jsx";
import AdminTransactions from "./pages/Transaction/TransactionsRecords.jsx";
import Card from "./pages/Cards/Card.jsx";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Settings from "./pages/Settings/Settings.jsx";
import Notification from "./pages/Notification/AdminNotificationPanel.jsx";

// Admin Login
import AdminLogin from "./auth/AdminLogin";

export default function AdminApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Splash screen
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  // ❌ Navbar hide on specific admin pages
  const hideNavbarRoutes = ["/admin/adminprofile"];

  // Check if current path matches navbar hidden list
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  return (
    <>
      {/* Navbar sirf tab dikhega jab login hua ho & path hidden list me na ho */}
      {isLoggedIn && !shouldHideNavbar && <TopNavbar />}

      <div>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          {/* --- Protected Routes --- */}
          {isLoggedIn ? (
            <>
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/kyc/*" element={<KYCComplianceRoutes />} />
              <Route path="/transactions" element={<AdminTransactions />} />
              <Route path="/loans" element={<Loans />} />
              <Route
                path="/depositmanagement"
                element={<DepositManagement />}
              />
              <Route path="/complaints" element={<ComplaintsLayout />} />
              <Route path="/cards" element={<Card />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/accountsdashboard"
                element={<AccountsDashboard />}
              />
              <Route
                path="/investment_products"
                element={<InvestmentPanel />}
              />
              <Route path="/moneyrequest" element={<MoneyTransferRequest />} />
              <Route path="/reports" element={<Reports />} />

              {/* Default route redirect */}
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/admin/login" />} />
          )}
        </Routes>
      </div>
    </>
  );
}
