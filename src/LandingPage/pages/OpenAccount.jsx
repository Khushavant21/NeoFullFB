import React, { useState } from "react";
import { FaPiggyBank, FaMoneyBillWave, FaGlobeAmericas, FaBriefcase, FaChartLine, FaArrowRight, FaCheck, FaStar } from "react-icons/fa";
import "./styles/OpenAccount.css";

const OpenAccount = () => {
  const [selectedTab, setSelectedTab] = useState("Savings");
  const [isHovering, setIsHovering] = useState(false);

  const tabs = [
    { id: "Savings", label: "Savings", icon: <FaPiggyBank /> },
    { id: "Salary", label: "Salary", icon: <FaMoneyBillWave /> },
    { id: "NRI", label: "NRI", icon: <FaGlobeAmericas /> },
    { id: "Business", label: "Business", icon: <FaBriefcase /> },
    { id: "Investments", label: "Investments", icon: <FaChartLine /> }
  ];

  const benefits = {
    Savings: [
      "Zero balance requirement - No minimum balance charges",
      "Competitive interest rates up to 7% per annum",
      "Free unlimited ATM withdrawals across India",
      "Instant account opening in just 5 minutes",
    ],
    Salary: [
      "Zero balance account for salaried employees",
      "Direct salary credit every month",
      "Exclusive offers and cashback on spends",
      "Free debit card with no annual fee",
    ],
    NRI: [
      "Easy international money transfers",
      "Attractive interest rates",
      "Dedicated NRI relationship manager",
      "24/7 internet banking support",
    ],
    Business: [
      "Easy current account setup",
      "Bulk payment solutions",
      "GST payment and filing support",
      "Corporate debit card",
    ],
    Investments: [
      "Smart investment options",
      "Mutual funds & SIP management",
      "Fixed deposits with high returns",
      "Portfolio tracking in real-time",
    ],
  };

  return (
    <div className="bankcon">
      <div className="open-account-container">
        <div className="title-container">
          <h2 className="title">Open an Account</h2>
          <p className="subtitle">Choose the perfect account for your needs</p>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${selectedTab === tab.id ? "active" : ""}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-indicator"></div>
        </div>

        {/* Benefits */}
        <div className="benefits-box">
          <div className="benefits-header">
            <div className="benefits-title-container">
              <h3>Why open a {selectedTab} Account with NeoBank?</h3>
              <div className="benefits-subtitle">
                <FaStar className="star-icon" />
                Exclusive benefits just for you
                <FaStar className="star-icon" />
              </div>
            </div>
            <div className="account-icon">{tabs.find(t => t.id === selectedTab)?.icon}</div>
          </div>
          <ul>
            {benefits[selectedTab].map((point, index) => (
              <li key={index} className="benefit-item">
                <span className="checkmark"><FaCheck /></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <button 
            className="cta-button"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Open {selectedTab} Account
            <FaArrowRight className={`cta-icon ${isHovering ? 'move-right' : ''}`} />
          </button>
        </div>
        
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
      </div>
    </div>
  );
};

export default OpenAccount;