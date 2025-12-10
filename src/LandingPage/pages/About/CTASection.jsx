import React from 'react';
import './style/CTASection.css';

const CTASection = () => {
  return (
    <div className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">
          Join the NeoBank Family
        </h2>
        <p className="cta-subtitle">
          Experience banking that's built for you. Open your account in minutes.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn-primary">
            Open Account Now
          </button>
          <button className="cta-btn-secondary">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;