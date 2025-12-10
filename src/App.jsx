import React, { Suspense, lazy, useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Lazy-loaded microapps
const ClientApp = lazy(() => import("./Client/ClientApp"));
const AdminApp = lazy(() => import("./Admin/AdminApp"));

// Main Components (Landing Page)
import LoadingScreen from "./LandingPage/Pages/LoadingScreen";
import Header from "./LandingPage/Pages/Header";
import HeroSection from "./LandingPage/Pages/HeroSection";
import TrustworthySection from "./LandingPage/Pages/TrustworthySection";
import BankingServices from "./LandingPage/Pages/BankingServices";
import CreditCardsSection from "./LandingPage/Pages/CreditCardsSection";
import Footer from "./LandingPage/Pages/Footer";
import BankMadeSimple from "./LandingPage/Pages/BankMadeSimple";
import OpenAccount from "./LandingPage/Pages/OpenAccount";
import BankingApp from "./LandingPage/Pages/BankingApp";
import PersonalSection from "./LandingPage/Pages/personal/PersonalSection";
import SecurityFeatures from "./LandingPage/Pages/SecurityFeatures";
import Testimonials from "./LandingPage/Pages/Testimonials";
import CallToAction from "./LandingPage/Pages/CallToAction";
import LandingCard from "./LandingPage/Pages/landingCardSection/LandingCard";
import NShop from "./LandingPage/components/Nshop/nshop";
import FinancialResourcesHub from "./LandingPage/Pages/Resourses/FinancialResourcesHub";
import AboutPage from "./LandingPage/Pages/About/AboutPage";
import Business from "./LandingPage/Pages/business/Business";
import ComplaintsModule from "./LandingPage/Pages/ComplaintsModule/ComplaintsModule";
import HelpPage from "./LandingPage/Pages/HelpPage/HelpPage";

// ------------------- ScrollToTop -------------------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ------------------- Onboarding Page -------------------
function OnboardingFlow() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 style={{ color: "#900603", marginBottom: "20px" }}>
          Account Setup Required
        </h2>
        <p style={{ marginBottom: "30px", color: "#cbd5e1" }}>
          Please complete your account setup to access the banking features.
        </p>
        <a
          href="/client"
          style={{
            background: "#900603",
            color: "white",
            padding: "12px 30px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            fontWeight: "600",
          }}
        >
          Continue Setup
        </a>
      </div>
    </div>
  );
}

// ------------------- Main App -------------------
export default function App() {
  const headerLogoRef = useRef(null);
  const [splashDone, setSplashDone] = useState(false);
  const location = useLocation();

  // Detect if route is inside client or admin
  const isClientOrAdmin = /^\/(client|admin)(\/|$)/.test(location.pathname);

  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      {/* Splash Screen */}
      <LoadingScreen
        headerLogoRef={headerLogoRef}
        onFinish={() => setSplashDone(true)}
      />
      <ScrollToTop />

      <div className={`app-root ${splashDone ? "ready" : "behind-splash"}`}>
        <Routes>
          {/* 🏠 Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <HeroSection />
                <BankMadeSimple />
                <TrustworthySection />
                <OpenAccount />
                <BankingServices />
                <CreditCardsSection />
                <BankingApp />
                <SecurityFeatures />
                <Testimonials />
                <CallToAction />
                <Footer />
              </>
            }
          />

          {/* 🌐 Public Pages (with Header & Footer) */}
          <Route
            path="/personal"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <PersonalSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/landCard"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <LandingCard />
                <Footer />
              </>
            }
          />
          <Route
            path="/nshop"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <NShop />
                <Footer />
              </>
            }
          />
          <Route
            path="/resources"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <FinancialResourcesHub />
                <Footer />
              </>
            }
          />
          <Route
            path="/business"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <Business />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <AboutPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/complaint"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <ComplaintsModule />
                <Footer />
              </>
            }
          />
          <Route
            path="/help"
            element={
              <>
                <Header headerLogoRef={headerLogoRef} />
                <HelpPage />
                <Footer />
              </>
            }
          />

          {/* 🚫 Client/Admin (No Header/Footer) */}
          <Route path="/client/*" element={<ClientApp />} />
          <Route path="/admin/*" element={<AdminApp />} />

          {/* 🧭 Onboarding */}
          <Route path="/onboarding" element={<OnboardingFlow />} />
        </Routes>
      </div>
    </Suspense>
  );
}
