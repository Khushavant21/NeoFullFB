import React, { useState, useEffect } from "react";
import { Book } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FixedDepositForm.css";

const FixedDepositForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  // 🔥 Fetch logged-in user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  const depositType = data.type || "Fixed Deposit";
  const [amount, setAmount] = useState(data.amount || 5000);
  const [duration, setDuration] = useState(data.duration || 6);

  // NEW FIELDS
  const [account, setAccount] = useState("");
  const [customerName] = useState("Poonam Singh");

  // ⭐ Customer ID from backend (login API)
  const [cif] = useState(userData.customerId || "");

  const [mobile] = useState("9876543210");
  const [email] = useState("poonam@example.com");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [branch, setBranch] = useState("");

  const minAmount = 5000;
  const maxAmount = 9999999;
  const minDuration = 6;
  const maxDuration = 120;

  // Interest Rate Logic
  const getInterestRate = (months) => {
    if (months >= 6 && months < 12) return 6.4;
    if (months >= 12 && months < 24) return 6.8;
    if (months >= 24 && months < 60) return 7.2;
    if (months >= 60) return 7.5;
    return 6.0;
  };

  // Calculated interest & maturity
  const [calculated, setCalculated] = useState({
    interestRate: data.interestRate || getInterestRate(data.duration || 6),
    maturity:
      data.maturity ||
      Math.round(
        (data.amount || 5000) *
          Math.pow(1 + getInterestRate(data.duration || 6) / 100, (data.duration || 6) / 12)
      ),
  });

  useEffect(() => {
    if (!amount || !duration) {
      setCalculated({ interestRate: 0, maturity: 0 });
      return;
    }
    const rate = getInterestRate(duration);
    const maturity = Math.round(amount * Math.pow(1 + rate / 100, duration / 12));
    setCalculated({ interestRate: rate, maturity });
  }, [amount, duration]);

  return (
    <div className="fd-container15">
      <h2 className="fd-title">
        <Book size={24} /> Open New {depositType}
      </h2>

      {/* Summary */}
      {amount && duration && calculated.maturity > 0 && (
        <div className="fd-summary-alert">
          <strong>Summary from Calculator:</strong> You selected ₹
          {amount.toLocaleString()} for {duration} months at {calculated.interestRate}% → Expected
          Maturity: ₹{calculated.maturity.toLocaleString()}
        </div>
      )}

      <div className="fd-card15">

      
        <div className="fd-form-group">
          <label>Account Holder Name</label>
          <input type="text" value={customerName} readOnly />
        </div>

        <div className="fd-form-group">
          <label>Customer ID (CIF)</label>
          <input type="text" value={cif} readOnly />
        </div>

        <div className="fd-form-group">
          <label>Registered Mobile</label>
          <input type="text" value={mobile} readOnly />
        </div>

        <div className="fd-form-group">
          <label>Email ID</label>
          <input type="email" value={email} readOnly />
        </div>

        <div className="fd-form-group">
          <label>Select Savings Account</label>
          <select value={account} onChange={(e) => setAccount(e.target.value)}>
            <option value="">Select Account</option>
            <option value="123412341234">1234 1234 1234</option>
            <option value="987698769876">9876 9876 9876</option>
          </select>
        </div>

        {/* LOCATION */}
        <div className="fd-form-row">
          <div className="fd-form-col">
            <label>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select State</option>
              <option value="State1">State1</option>
              <option value="State2">State2</option>
            </select>
          </div>

          <div className="fd-form-col">
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select City</option>
              <option value="City1">City1</option>
              <option value="City2">City2</option>
            </select>
          </div>

          <div className="fd-form-col">
            <label>Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">Select Branch</option>
              <option value="Branch1">Branch1</option>
              <option value="Branch2">Branch2</option>
            </select>
          </div>
        </div>

        {/* Amount */}
        <div className="fd-form-group">
          <label>Deposit Amount (₹)</label>
          <input
            type="number"
            value={amount}
            min={minAmount}
            max={maxAmount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
          />
        </div>

        {/* Duration */}
        <div className="fd-form-group">
          <label>Deposit Duration (Months)</label>
          <input
            type="number"
            value={duration}
            min={minDuration}
            max={maxDuration}
            onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")}
          />
        </div>

        {/* Interest & Maturity */}
        {calculated.maturity > 0 && (
          <div className="fd-maturity-card">
            <h5>💰 Interest & Maturity Summary</h5>
            <p>📈 Interest Rate: {calculated.interestRate}% Per Annum</p>
            <p>🎯 Estimated Maturity: ₹{calculated.maturity.toLocaleString()}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="fd-buttons54">
          <button className="btn-primary55">Open FD</button>
          <button className="btn-outline56" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default FixedDepositForm;
