import React from "react";
import './styles/Footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo-section">
          <div className="footer-logo">
            <span className="logo-icon">N</span>
            <div className="logo-text">
              <h2 className="footer-heading">NeoBank 24/7</h2>
              <p className="footer-subtitle">Your Digital Banking Partner</p>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="footer-columns">
          <div className="footer-column">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-list">
              <li className="footer-item">Contact Us</li>
              <li className="footer-item">Customer Care</li>
              <li className="footer-item">Feedback</li>
              <li className="footer-item">FAQs</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">NeoBank Group Websites</h3>
            <ul className="footer-list">
              <li className="footer-item">NeoBank Foundation</li>
              <li className="footer-item">NeoBank Securities</li>
              <li className="footer-item">NeoBank Insurance</li>
              <li className="footer-item">NeoBank Investments</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Regulatory Information</h3>
            <ul className="footer-list">
              <li className="footer-item">Safe Banking</li>
              <li className="footer-item">Privacy Policy</li>
              <li className="footer-item">Terms & Conditions</li>
              <li className="footer-item">Grievance Redressal</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-list">
              <li className="footer-item">Interest Rates</li>
              <li className="footer-item">Forex Rates</li>
              <li className="footer-item">Service Charges</li>
              <li className="footer-item">Branch Locator</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Ways to Bank</h3>
            <ul className="footer-list">
              <li className="footer-item">Digital Banking</li>
              <li className="footer-item">Mobile Banking</li>
              <li className="footer-item">Internet Banking</li>
              <li className="footer-item">ATM Services</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 NeoBank. All rights reserved. | Banking products are subject
            to approval.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-link">Terms of Use</span>
            <span className="footer-bottom-link">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}