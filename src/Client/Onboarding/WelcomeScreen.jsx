import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const { setCurrentStep } = useOnboarding();

  return (
    <div className="neoWelcome-container">
      <div className="neoWelcome-card">
        <div className="neoWelcome-logo-container">
          <div className="neoWelcome-logo-icon">N</div>
        </div>

        <h1 className="neoWelcome-title">
          Welcome to <span className="neoWelcome-bank-name">NeoBank</span>
        </h1>

        <p className="neoWelcome-subtitle">
          Banking reimagined for the digital age
        </p>

        <div className="neoWelcome-features-list">
          <div className="neoWelcome-feature-item">
            <div className="neoWelcome-feature-dot"></div>
            <span>Zero balance account</span>
          </div>

          <div className="neoWelcome-feature-item">
            <div className="neoWelcome-feature-dot"></div>
            <span>Instant digital onboarding</span>
          </div>

          <div className="neoWelcome-feature-item">
            <div className="neoWelcome-feature-dot"></div>
            <span>24/7 customer support</span>
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('signup')}
          className="neoWelcome-get-started-btn"
        >
          <span>Get Started</span>
          <div className="neoWelcome-arrow-icon">→</div>
        </button>

        <div className="neoWelcome-login-link">
          <button
            className="neoWelcome-login-btn"
            onClick={() => setCurrentStep('signIn')}
          >
            Already have an account?{' '}
            <span className="neoWelcome-login-text">Sign In</span>
          </button>
        </div>
      </div>

      <p className="neoWelcome-footer-text">
        Regulated by RBI • Deposits insured up to ₹5,00,000
      </p>
    </div>
  );
}
