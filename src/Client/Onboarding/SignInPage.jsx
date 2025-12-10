import React, { useState } from 'react';
import axios from 'axios';
import { useOnboarding } from '../context/OnboardingContext';
import './SignInPage.css';

export default function SignInPage({ onComplete }) {
  const { setCurrentStep, updateUserData } = useOnboarding();
  
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!customerId.trim() || !password.trim()) {
      setError('Please fill in both Customer ID/Email and Password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:8080/api/auth/login', {
        customerIdOrEmail: customerId,
        password: password,
      });

      const { token, role, kycStatus } = response?.data;

      if (!token) {
        setError("Login failed: No token received.");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("accessToken", token);

      // Save login state globally
      updateUserData({
        loggedIn: true,
        customerId: customerId,
        role: role,
        kycStatus: kycStatus
      });

      console.log("ROLE:", role);
      console.log("KYC:", kycStatus);

      // -------------------------
      // 🔥 USER → KYC BASED REDIRECT
      // -------------------------
      if (kycStatus === "APPROVED") {
        // Dashboard
        if (onComplete) onComplete();
      }
      else if (kycStatus === "REJECTED") {
        // KYC re-upload page
        setCurrentStep("updateKYC33");
      }
      else {
        // PENDING / NULL / ANYTHING → Upload missing docs
        setCurrentStep("updateKYC33");
      }

    } catch (err) {
      console.error('Login error:', err);

      if (err?.response?.status === 401) {
        setError("Invalid credentials.");
      } else if (err?.response?.status === 403) {
        setError("Account disabled or blocked.");
      } else {
        setError("Something went wrong. Try again later.");
      }

    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep('welcome');
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="logo-icon-signin">N</div>

        <button className="back-btn" onClick={handleBack}>← Back</button>

        <h2>Sign In</h2>

        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Customer ID or Email"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="signin-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
          />

          {error && <div className="signin-error">{error}</div>}

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="extra-links">
          <p className="signin-footer">
            Don’t have an account?{' '}
            <span onClick={() => setCurrentStep('signup')} className="signup-link">
              Sign Up
            </span>
          </p>

          <button
            className="forgot-btn"
            onClick={() => alert("Password reset link sent!")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
