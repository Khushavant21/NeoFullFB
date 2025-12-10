import React from "react";
import { Link } from "react-router-dom";
import './MoneyTransferPage.css';

const MoneyTransferPage = () => {
  return (
    <div className="money-transfer-container">
      {/* Header Section */}
        <div className="header-content">
          <h2>Money Transfer</h2>
          <p>
            Send money instantly and securely to anyone, anywhere
          </p>
        </div>

      {/* Main Feature Cards */}
      <div className="feature-cards-container">
        <div className="feature-cards-grid">
          {/* Send Money */}
          <div className="feature-card-col">
            <FeatureCard
              title="Send Money"
              description="Transfer money to bank accounts, UPI, or mobile wallets"
              link="/Client/send-money"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                  className="feature-card-icon primary-icon"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
            />
          </div>

          {/* KYC Verification */}
          <div className="feature-card-col">
            <FeatureCard
              title="KYC Verification"
              description="Complete your KYC for higher transaction limits"
              link="/Client/update-kyc"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                  className="feature-card-icon success-icon"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 
                       11.955 0 0112 2.915a11.955 
                       11.955 0 01-8.618 5.069m1.618 
                       6.946A11.955 11.955 0 0112 21.085a11.955 
                       11.955 0 01-8.618-5.069"
                  />
                </svg>
              }
            />
          </div>

          {/* Pay Bills */}
          <div className="feature-card-col">
            <FeatureCard
              title="Pay Bills"
              description="Pay utility bills, mobile recharge, and more"
              link="/Client/pay-bills"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                  className="feature-card-icon purple-icon"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
{/* 
          Transaction Limit
          <div className="feature-card-col">
            <FeatureCard
              title="Transaction Limit"
              description="View or upgrade your daily transaction limit"
              link="/Client/transaction-limit"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                  className="feature-card-icon info-icon"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 20h14" />
                </svg>
              }
            />
          </div> */}

          {/* Domestic Transfer */}
          <div className="feature-card-col">
            <DomesticTransferCard />
          </div>

          {/* Transaction History */}
          <div className="feature-card-col">
            <FeatureCard
              title="Transaction History"
              description="View all your money transfer transactions"
              link="/Client/history"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                  className="feature-card-icon warning-icon"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 
                       2 0 002 2h10a2 2 0 002-2V7a2 
                       2 0 00-2-2h-2M9 5a2 2 0 
                       002 2h2a2 2 0 002-2" />
                </svg>
              }
              style={{ minHeight: "280px", maxHeight: "280px" }}
            />
          </div>
        </div>
      </div>

      {/* Quick Transfer Methods */}
      <div className="quick-transfer-section">
        <div className="quick-transfer-header">
          <h5 className="quick-transfer-title">Quick Transfer Methods</h5>
          <p className="quick-transfer-subtitle">
            Choose your preferred way to send money
          </p>
        </div>

        <div className="quick-methods-grid">
          <div className="quick-method-col">
            <QuickMethodCard
              title="UPI Transfer"
              description="Instant transfers using UPI"
              link="/Client/send-money?type=upi"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="quick-method-icon"
                  fill="none"
                  viewBox="0 0 15 15"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 
                       2 12 2 2 6.477 2 12s4.477 10 10 
                       10zm-1-10v4h2v-4h4V9h-4V5h-2v4H7v3h4z"
                  />
                </svg>
              }
            />
          </div>

          <div className="quick-method-col">
            <QuickMethodCard
              title="NEFT/RTGS"
              description="Bank to bank transfers"
              link="/Client/domestic-transfers"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  className="quick-method-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22c5.523 0 10-4.477 
                   10-10S17.523 2 12 2 2 6.477 
                   2 12s4.477 10 10 10zm-1-10v4h2v-4h4V9h-4V5h-2v4H7v3h4z"
                  />
                </svg>
              }
            />
          </div>

          <div className="quick-method-col">
            <QuickMethodCard
              title="International"
              description="Send money abroad"
              link="/Client/international-transfer"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  className="quick-method-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2C6.48 2 2 6.48 2 
                       12s4.48 10 10 10 10-4.48 
                       10-10S17.52 2 12 2z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Recent Transfers Section */}
      <div className="recent-transfers-section">
        <div className="recent-transfers-card">
          <div className="recent-transfers-header">
            <div>
              <h5 className="recent-transfers-title">Recent Transfers</h5>
              <p className="recent-transfers-subtitle">
                Your last money transfer activities
              </p>
            </div>
            <button
              className="recent-transfers-button"
            >
              View All
            </button>
          </div>

          <div className="recent-transfer-item">
            <div className="recent-transfer-details">
              <h6 className="recent-transfer-name">Rahul Sharma</h6>
              <p className="recent-transfer-info">12 Sep 2025 · UPI</p>
            </div>
            <div className="recent-transfer-amount">
              <p className="amount-text">₹2,500</p>
              <p className="transfer-status">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Limits & KYC Section */}
      <div className="limits-kyc-section">
        <div className="limits-kyc-grid">
          <div className="limit-card-col">
            <LimitCard
              title="Daily Limit"
              limit="₹25,000"
              used="₹5,000"
            />
          </div>
          <div className="limit-card-col">
            <LimitCard
              title="Monthly Limit"
              limit="₹2,00,000"
              used="₹80,000"
            />
          </div>
          <div className="limit-card-col">
            <KYCCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, link, icon, style }) => (
  <div className="feature-card" style={style}>
    <div className="feature-card-icon-container">
      {icon}
    </div>
    <div className="feature-card-content">
      <h5 className="feature-card-title">{title}</h5>
      <p className="feature-card-description">{description}</p>
    </div>
    <Link to={link} className="feature-card-link">
      <button
        className="feature-card-button"
      >
        Get Started →
      </button>
    </Link>
  </div>
);

const DomesticTransferCard = () => (
  <div className="feature-card domestic-transfer-card">
    <div className="feature-card-icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
        className="feature-card-icon primary-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 20h14" />
      </svg>
    </div>
    <div className="feature-card-content">
      <h5 className="feature-card-title">Domestic Transfers</h5>
      <p className="feature-card-description">
        Choose from NEFT, IMPS, RTGS, or UPI for sending money within India
      </p>
      <div className="transfer-badges">
        <span className="transfer-badge neft-badge">NEFT</span>
        <span className="transfer-badge imps-badge">IMPS</span>
        <span className="transfer-badge rtgs-badge">RTGS</span>
        <span className="transfer-badge upi-badge">UPI</span>
      </div>
    </div>
    <Link to="/Client/domestic-transfers" className="feature-card-link">
      <button
        className="feature-card-button"
      >
        Get Started →
      </button>
    </Link>
  </div>
);

const QuickMethodCard = ({ title, description, icon, link }) => (
  <Link to={link} className="quick-method-link">
    <div className="quick-method-card">
      <div className="quick-method-icon-container">
        {icon}
      </div>
      <div className="quick-method-content">
        <h6 className="quick-method-title">{title}</h6>
        <p className="quick-method-description">{description}</p>
      </div>
    </div>
  </Link>
);

const LimitCard = ({ title, limit, used }) => (
  <div className="limit-card">
    <h6 className="limit-card-title">{title}</h6>
    <p className="limit-card-amount">{limit}</p>
    <p className="limit-card-used">
      Used Today: <span className="used-amount">{used}</span>
    </p>
  </div>
);

const KYCCard = () => (
  <div className="limit-card">
    <h6 className="limit-card-title">KYC Status</h6>
    <p className="limit-card-amount verified">Verified</p>
    <p className="limit-card-used">Full limits available</p>
  </div>
);

export default MoneyTransferPage;