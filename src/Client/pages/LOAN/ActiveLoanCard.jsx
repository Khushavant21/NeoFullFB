import React from "react";
import { Home, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./style/ActiveLoanCard.css"; // unique CSS file

function ActiveLoanCard() {
  const navigate = useNavigate();
  const handleStatement = () => {
    navigate("/Client/view-loan-statement");
  };

  return (
    <div className="client-loan-card-container">
      <div className="client-loan-card">
        <div className="client-loan-card-body">
          {/* Header */}
          <div className="client-loan-header">
            <div>
              <h5>My Active Loan</h5>
              <p>Track your current loan details</p>
            </div>

            <div className="client-loan-status">
              <CheckCircle size={16} color="white" />
              <span style={{ color: "white" }}>Active</span>
            </div>
          </div>

          {/* Content */}
          <div className="client-loan-content">
            {/* Left section - loan details */}
            <div className="client-loan-details">
              <div className="client-loan-type">
                <div className="client-loan-icon">
                  <Home size={24} color="#ffc107" />
                </div>
                <div>
                  <h6>Home Loan</h6>
                  <small>8.5% p.a. • 240 months</small>
                </div>
              </div>

              <ul>
                <li>
                  <span>Loan Amount</span>
                  <span>₹25,00,000.00</span>
                </li>
                <li>
                  <span>Outstanding</span>
                  <span>₹18,50,000.00</span>
                </li>
                <li>
                  <span>Monthly EMI</span>
                  <span>₹23,500.00</span>
                </li>
                <li>
                  <span>Next EMI Date</span>
                  <span>2/1/2025</span>
                </li>
              </ul>
            </div>

            {/* Right section - progress + actions */}
            <div className="client-loan-progress-section">
              <div className="client-loan-progress">
                <div className="client-loan-progress-header">
                  <span>Loan Progress</span>
                  <span>25%</span>
                </div>
                <div className="client-loan-progress-bar">
                  <div className="client-loan-progress-fill"></div>
                </div>
                <div className="client-loan-progress-info">
                  <span>60 months paid</span>
                  <span>180 months remaining</span>
                </div>
              </div>

              <div className="client-loan-actions">
                <button className="client-loan-btn-primary">Make Payment</button>
                <button
                  className="client-loan-btn-outline"
                  onClick={handleStatement}
                >
                  View Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveLoanCard;
