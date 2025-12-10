import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './AadharScreen.css';

export default function AadharScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [aadhaar, setAadharNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const handleAadharSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/aadhaar/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhaar: aadhaar,
          email: email, // ✅ automatically fetched from localStorage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP Sent:', data);
        setOtpSent(true); // ✅ show OTP input screen
      } else {
        const errData = await response.json();
        setError(errData.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otpinput-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join(''); // Combine 6 digits into one string
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/aadhaar/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          otp: enteredOtp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP Verified:', data);

        // ✅ Move to next step only after success
        updateUserData({ aadhaar });
        setCurrentStep('pan');
        console.log("sonali")
      } else {
        const errData = await response.json();
        setError(errData.message || 'Invalid OTP. Please try again.');
      }
    } 
    catch (err) 
    {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aadharscreen-container">

      {/* Back Button */}
      <button
        onClick={() => setCurrentStep('signup')}
        className="aadharscreen-back-btn"
      >
        <div className="aadharscreen-back-arrow">←</div>
        <span>Back</span>
      </button>

      {/* Card */}
      <div className="aadharscreen-card">

        {/* Icon */}
        <div className="aadharscreen-icon-container">
          <div className="aadharscreen-icon">🆔</div>
        </div>

        {/* Header */}
        <div className="aadharscreen-header">
          <h2 className="aadharscreen-title">Verify Aadhar</h2>
          <p className="aadharscreen-subtitle">Enter your 12-digit Aadhar number</p>
        </div>

        {/* Form / OTP */}
        {!otpSent ? (
          <form onSubmit={handleAadharSubmit} className="aadharscreen-form">
            <div className="aadharscreen-form-group">
              <label className="aadharscreen-label">Aadhar Number</label>
              <input
                type="text"
                required
                value={aadhaar}
                onChange={(e) => setAadharNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX"
                maxLength={12}
                pattern="[0-9]{12}"
                className="aadharscreen-input"
              />
            </div>

            <div className="aadharscreen-info-box">
              <div className="aadharscreen-info-icon">🔒</div>
              <p className="aadharscreen-info-text">
                Your Aadhar details are encrypted and securely stored. We comply with all UIDAI regulations.
              </p>
            </div>

            <button type="submit" className="aadharscreen-send-otp-btn">
              <span>Send OTP</span>
              <div className="aadharscreen-arrow-icon">→</div>
            </button>
          </form>
        ) : (
          <div className="aadharscreen-otp-container">
            <div className="aadharscreen-form-group">
              <label className="aadharscreen-label">
                Enter 6-digit OTP sent to your registered mobile
              </label>
              <div className="aadharscreen-otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otpinput-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    className="aadharscreen-otp-input"
                  />
                ))}
              </div>
                {error && <p className="aadharscreen-error">{error}</p>}
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.some(digit => !digit)}
              className="aadharscreen-verify-btn"
            >
              <span>Verify & Continue</span>
              <div className="aadharscreen-arrow-icon">→</div>
            </button>

            <button
              onClick={() => setOtpSent(false)}
              className="aadharscreen-resend-btn"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
