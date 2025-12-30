import React, { useState } from 'react';
import './AadharVerification.css'; // 👈 unique CSS

const AadharVerification = ({ userData, updateUserData, nextStep, prevStep }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState(""); // Inline message
  const [messageType, setMessageType] = useState(""); // 'success' | 'error' | 'info'

  const handleChange = (e) => updateUserData({ [e.target.name]: e.target.value });

  const sendOtp = () => {
    if (userData.aadharNumber.length === 12) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setOtpSent(true);
      setMessage(`A test OTP has been sent: ${generatedOtp}`);
      setMessageType('info');
    } else {
      setMessage("Please enter a valid 12-digit Aadhar number.");
      setMessageType('error');
    }
  };

  const verifyOtp = async () => {
    if (enteredOtp === otp && enteredOtp !== "") {
      try {
        const response = await fetch('http://localhost:8080/api/auth/aadhaar/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userData.email,
            otp: enteredOtp,
            aadhaar: userData.aadharNumber
          }),
        });

        if (response.ok) {
          setMessage("✅ Aadhar Verified Successfully!");
          setMessageType('success');
          setTimeout(() => nextStep(), 1000);
        } else {
          const errData = await response.json();
          setMessage(`❌ ${errData.error || "Verification failed"}`);
          setMessageType('error');
        }
      } catch (err) {
        setMessage("❌ Network error. Please try again.");
        setMessageType('error');
      }
    } else {
      setMessage("❌ Incorrect OTP. Please try again.");
      setMessageType('error');
    }
  };

  return (
    <div className="av-container">
      <h2 className="av-title">Aadhar Verification</h2>

      <div className="av-form-group">
        <label className="av-label">Aadhar Number</label>
        <input
          type="text"
          name="aadharNumber"
          value={userData.aadharNumber}
          onChange={handleChange}
          placeholder="Enter your 12-digit Aadhar Number"
          className="av-input"
        />
      </div>

      {!otpSent ? (
        <button
          onClick={sendOtp}
          disabled={userData.aadharNumber.length !== 12}
          className={`av-btn ${userData.aadharNumber.length === 12 ? 'av-btn-active' : 'av-btn-disabled'}`}
        >
          Send OTP
        </button>
      ) : (
        <div className="av-otp-section">
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            className="av-input av-otp-input"
          />

          {message && (
            <p className={`av-message ${messageType === 'success' ? 'av-success' : messageType === 'error' ? 'av-error' : 'av-info'}`}>
              {message}
            </p>
          )}

          <div className="av-btn-row">
            <button onClick={prevStep} className="av-btn av-btn-back">
              Back
            </button>
            <button onClick={sendOtp} className="av-btn av-btn-resend">
              Resend OTP
            </button>
            <button
              onClick={verifyOtp}
              disabled={enteredOtp.length !== 6}
              className={`av-btn ${enteredOtp.length === 6 ? 'av-btn-active' : 'av-btn-disabled'}`}
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AadharVerification;
