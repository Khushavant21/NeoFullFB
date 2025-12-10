import React from "react";
import "./style/ResourceFeatureSection.css";
import { FaBolt, FaPiggyBank, FaShieldAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />,
    title: "Instant Transfers",
    text: "Send and receive money instantly with zero fees. Lightning-fast transactions 24/7.",
  },
  {
    icon: <FaPiggyBank />,
    title: "High-Yield Savings",
    text: "Earn up to 4.5% APY on your savings with no minimum balance requirements.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Bank-Level Security",
    text: "FDIC insured up to $250k with 256-bit encryption and biometric authentication.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    text: "Real human support whenever you need it. Chat, call, or email - we're always here.",
  },
];

const ResourceFeatureSection = () => {
  return (
    <div className="Resource-features-container">
      <h1 className="Resource-features-title">Everything You Need to Thrive</h1>
      <p className="Resource-features-subtitle">
        Modern banking features designed to help you save, spend, and grow your money
      </p>

      <div className="Resource-features-grid">
        {features.map((f, index) => (
          <div className="Resource-feature-card1" key={index}>
            <div className="Resource-feature-icon">{f.icon}</div>
            <h3 className="Resource-feature-title">{f.title}</h3>
            <p className="Resource-feature-text">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="Resource-stats-container">
        <div className="Resource-stat-box">
          <h2>2M+</h2>
          <p>Active Users</p>
        </div>
        <div className="Resource-stat-box">
          <h2>$8B+</h2>
          <p>Managed</p>
        </div>
        <div className="Resource-stat-box">
          <h2>4.5%</h2>
          <p>APY Savings</p>
        </div>
        <div className="Resource-stat-box">
          <h2>0</h2>
          <p>Monthly Fees</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceFeatureSection;
