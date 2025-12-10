import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './PANScreen.css';

export default function PANScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();

  const [panNumber, setPanNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/pan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pan: panNumber.toUpperCase(),
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP Sent:', data);
        setOtpSent(true);
        setSuccess('OTP sent successfully to your email!');
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

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/pan/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          pan: panNumber.toUpperCase(),
          otp: enteredOtp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('PAN Verified Successfully:', data);
        updateUserData({ panNumber: panNumber.toUpperCase() });
        setSuccess('✅ PAN verified successfully!');
        setTimeout(() => setCurrentStep('account-type'), 1500);
      } else {
        const errData = await response.json();
        setError(errData.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panscreen-container">
      {/* Back Button */}
      <button onClick={() => setCurrentStep('aadhar')} className="panscreen-back-btn">
        <div className="panscreen-back-arrow">←</div>
        <span>Back</span>
      </button>

      {/* Card */}
      <div className="panscreen-card">
        {/* Icon */}
        <div className="panscreen-icon-container">
          <div className="panscreen-icon">📄</div>
        </div>

        {/* Header */}
        <div className="panscreen-header">
          <h2 className="panscreen-title">Verify PAN</h2>
          <p className="panscreen-subtitle">Enter your PAN card number</p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleGenerateOtp} className="panscreen-form">
            <div className="panscreen-form-group">
              <label className="panscreen-label">PAN Number</label>
              <input
                type="text"
                required
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                maxLength={10}
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                className="panscreen-input"
              />
              <p className="panscreen-format-note">
                Format: 5 letters, 4 numbers, 1 letter
              </p>
            </div>

            <div className="panscreen-info-box">
              <p className="panscreen-info-text">
                We'll verify your PAN details with Income Tax Department records
              </p>
            </div>

            {error && <p className="panscreen-error">{error}</p>}
            {success && <p className="panscreen-success">{success}</p>}

            <button type="submit" className="panscreen-verify-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Verify PAN'}
              <div className="panscreen-arrow-icon">→</div>
            </button>
          </form>
        ) : (
          <div className="panscreen-otp-section">
            <label className="panscreen-label">
              Enter 6-digit OTP sent to {email}
            </label>

            <div className="panscreen-otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otpinput-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength={1}
                  className="panscreen-otp-input"
                />
              ))}
            </div>

            {error && <p className="panscreen-error">{error}</p>}
            {success && <p className="panscreen-success">{success}</p>}

            <button
              onClick={handleVerifyOtp}
              disabled={otp.some((d) => !d) || loading}
              className="panscreen-verify-btn"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
              <div className="panscreen-arrow-icon">→</div>
            </button>

            <button onClick={() => setOtpSent(false)} className="panscreen-resend-btn">
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
