




import React, { useState } from "react";
import "./InternationalTransferPage.css";
import { useNavigate } from "react-router-dom";

const InternationalTransferPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    country: "",
    recipientName: "",
    accountNumber: "",
    swiftIban: "",
     transferDate: "", 
  });

  const countries = ["USA", "UK", "UAE", "Canada"];
  const currencies = ["USD", "GBP", "AED", "CAD"];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStartTransfer = () => {
    alert("Transfer confirmed!");
    setStep(0);
    setFormData({
      country: "",
      recipientName: "",
      accountNumber: "",
      swiftIban: "",
       transferDate: "",   // reset
    });
  };

  const navigate = useNavigate();
  return (
    <div className="intl-page-container">
      {/* Step 0: Landing */}
      {step === 0 && (
        <div className="intl-row">
          <div className="intl-card">
            <div className="intl-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="intl-title">International Transfer</h1>
            <p className="intl-subtitle">
              Send money securely to bank accounts worldwide
            </p>
            <div className="intl-btn-container">
              <button
                className="intl-btn-cancel"
                onClick={() => navigate("/client/money-transfer")}
              >
                Cancel
              </button>
              <button className="intl-btn" onClick={() => setStep(1)}>
                Start Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Choose Country */}
      {step === 1 && (
        <div className="intl-row">
          <div className="intl-card">
            <h2 className="intl-section-title">Choose recipient country</h2>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="intl-input"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="intl-currencies">
              <h4>Supported currencies:</h4>
              <p>{currencies.join(", ")}</p>
            </div>
            <div className="intl-buttons-right">
              <div className="intl-btn-container">
                <button
                  className="intl-btn-outline"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                   Back
                </button>

                <button
                  className="intl-btn"
                  onClick={handleNext}
                  disabled={!formData.country}
                >
                  Next 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Recipient Details */}
      {step === 2 && (
        <div className="intl-row">
          <div className="intl-card">
            <h2 className="intl-section-title">Recipient Details</h2>
            <form className="intl-form">
              <label className="intl-label">Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="Enter recipient's full name"
                className="intl-input"
              />

              <label className="intl-label">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter recipient's account number"
                className="intl-input"
              />

              <label className="intl-label">SWIFT / IBAN</label>
              <input
                type="text"
                name="swiftIban"
                value={formData.swiftIban}
                onChange={handleChange}
                placeholder="Enter SWIFT or IBAN code"
                className="intl-input"
              />
            

              <label className="intl-label">Date</label>
              <input
                type="date"
                name="transferDate"
                value={formData.transferDate}
                onChange={handleChange}
                className="intl-input"
              />
            </form>

            <div className="intl-buttons-between">
              <button className="intl-btn" onClick={handlePrev}>
                Back
              </button>
              <button className="intl-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="intl-row">
          <div className="intl-card">
            <h2 className="intl-section-title">Review Transfer Details</h2>
            <div className="intl-review">
              <p>
                <strong>Country:</strong> {formData.country}
              </p>
              <p>
                <strong>Recipient:</strong> {formData.recipientName}
              </p>
              <p>
                <strong>Account Number:</strong> {formData.accountNumber}
              </p>
              <p>
                <strong>SWIFT / IBAN:</strong> {formData.swiftIban}
              </p>
              <hr />
              <p>
                <strong>Conversion Rate:</strong> 1 USD = 82.50 INR
              </p>
              <p>
                <strong>Transfer Fees:</strong> $2.50
              </p>
              <p>
                <strong>Estimated Delivery:</strong> 1-2 business days
              </p>
            </div>
            <div className="intl-buttons-between">
              <button className="intl-btn" onClick={handlePrev}>
                Back
              </button>
              <button className="intl-btn" onClick={handleStartTransfer}>
                Confirm & Send Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternationalTransferPage; 
