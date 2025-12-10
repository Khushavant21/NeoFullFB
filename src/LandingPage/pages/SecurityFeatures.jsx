import React, { useState } from "react";
import './styles/SecurityFeatures.css';
import { FaShieldAlt, FaFingerprint, FaLock, FaEye, FaBell, FaExclamationTriangle } from "react-icons/fa";

export default function SecurityFeatures() {
  const features = [
    { icon: <FaShieldAlt />, title: "256-bit Encryption", description: "Military-grade encryption protects all your transactions" },
    { icon: <FaFingerprint />, title: "Biometric Authentication", description: "Fingerprint and face ID for secure access" },
    { icon: <FaLock />, title: "Two-Factor Authentication", description: "Extra layer of security for all transactions" },
    { icon: <FaEye />, title: "Real-time Monitoring", description: "24/7 fraud detection and prevention systems" },
    { icon: <FaBell />, title: "Instant Alerts", description: "Get notified of every transaction immediately" },
    { icon: <FaExclamationTriangle />, title: "Zero Liability", description: "Protected against unauthorized transactions" },
  ];

  return (
    <section className="security-section">
      <h2 className="security-title">Your Security is Our Priority</h2>
      <p className="security-subtitle">
        Bank with confidence knowing that your money and data are protected by industry-leading security measures
      </p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}