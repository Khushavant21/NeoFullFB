import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import './SignupScreen.css';
import BASE_URL from '../../api/apiConfig';

export default function SignupScreen({ onComplete }) {
  const navigate = useNavigate();
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dateOfBirth,
      gender: formData.gender,

    }

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("User Registered Successfully", data);
      localStorage.setItem("userEmail", formData.email);
      updateUserData(formData);


      console.log('Navigating to Aadhar step');
      setCurrentStep('aadhar');

    } catch (error) {
      alert("Error registering user: " + error.message);
    }

  };

  return (
    <div className="signupscreen-container">
      {/* Back and Next Buttons */}
      <button
        onClick={() => setCurrentStep('welcome')}
        className="signupscreen-back-btn"
      >
        ← Back
      </button>
      <button
        onClick={() => setCurrentStep('updateKYC33')}
        className="signupscreen-next-btn"
      >
        Next →
      </button>

      {/* Card */}
      <div className="signupscreen-card">
        <div className="signupscreen-header">
          <h2 className="signupscreen-title">Create Account</h2>
          <p className="signupscreen-subtitle">Enter your details to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="signupscreen-form">
          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Enter your full name"
              className="signupscreen-input"
            />
          </div>

          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
              className="signupscreen-input"
            />
          </div>

          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              placeholder="+91 XXXXXXXXXX"
              pattern="[+]?[0-9]{10,13}"
              className="signupscreen-input"
            />
          </div>

          {/* Date of Birth */}
          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className="signupscreen-input signupscreen-date-input"
            />
          </div>

          {/* Gender Selection */}
          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Gender</label>
            <select
              required
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="signupscreen-input signupscreen-select"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="signupscreen-continue-btn">
            Continue →
          </button>
        </form>

        <p className="signupscreen-terms-text">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

