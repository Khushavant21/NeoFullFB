import React from "react";
import "./styles/CallToAction.css";

export default function CallToAction() {
  return (
    <div className="ctaf-section">
      <h2 className="ctaf-title">Ready to Transform Your Banking Experience?</h2>
      <p className="ctaf-subtitle">
        Join millions of Indians who are already banking smarter with NeoBank.
        Open your account in just 5 minutes!
      </p>
      <div className="ctaf-buttons">
        <button className="ctaf-primary">Open Account Now →</button>
        <button className="ctaf-secondary">Download App</button>
      </div>
     <div className="ctaf-features">
        <span className="ctaf-feature-item">✓ No paperwork</span>
        <span className="ctaf-feature-item">✓ 100% digital</span>
        <span className="ctaf-feature-item">✓ Instant approval</span>
      </div>
    </div>
  );
}