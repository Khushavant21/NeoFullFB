import React, { useState, useEffect } from "react";
import PersonalDetails from "./PersonalDetails";
import AadharVerification from "./AadharVerification";
import PANVerification from "./PANVerification";
import VideoKYC from "./VideoKYC";
import "./Welcome.css"; // 👈 unique CSS
import logoWhite from '../../assets/neobank-logo.png';
import BASE_URL from "../../../api/apiConfig";

const Welcome = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    mobileNumber: "",
    fullName: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
    kycVerified: false,
  });
  const [modal, setModal] = useState(null); // For OTP messages

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('userEmail');
      if (email) {
        try {
          const response = await fetch(`${BASE_URL}/auth/profile?email=${encodeURIComponent(email)}`);
          if (response.ok) {
            const data = await response.json();
            setUserData({
              fullName: data.fullName || "",
              email: data.email || "",
              mobileNumber: data.mobile || "",
              aadharNumber: data.aadhaar || "",
              panNumber: data.pan || "",
              kycVerified: data.panVerified || false,
            });
          }
        } catch (err) {
          console.error("Error fetching profile in Welcome screen:", err);
        }
      }
    };
    fetchProfile();
  }, []);

  const updateUserData = (data) =>
    setUserData((prev) => ({ ...prev, ...data }));

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = ["Personal", "Aadhar", "PAN", "Video KYC"];

  return (
    <div className="wn-container">
      <div className="wn-box">
        {/* Header */}
        <div className="wn-header">
          <img src={logoWhite} alt="NeoBank" className="wn-logo" />
          <h1 className="wn-title">NeoBank Account Open</h1>
          <p className="wn-subtitle">
            Complete your account setup in easy steps
          </p>
        </div>

        {/* Stepper */}
        <div className="wn-stepper">
          {steps.map((label, index) => (
            <div key={index} className="wn-step">
              {index !== steps.length - 1 && (
                <div
                  className={`wn-step-line ${step > index + 1 ? "wn-filled" : ""
                    }`}
                ></div>
              )}
              <div
                className={`wn-step-circle ${step > index + 1
                    ? "wn-complete"
                    : step === index + 1
                      ? "wn-active"
                      : ""
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`wn-step-label ${step >= index + 1 ? "wn-label-active" : ""
                  }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="wn-step-content">
          {step === 1 && (
            <PersonalDetails
              userData={userData}
              updateUserData={updateUserData}
              nextStep={nextStep}
              inputSize="sm"
            />
          )}
          {step === 2 && (
            <AadharVerification
              userData={userData}
              updateUserData={updateUserData}
              nextStep={nextStep}
              prevStep={prevStep}
              setModal={setModal}
              inputSize="sm"
            />
          )}
          {step === 3 && (
            <PANVerification
              userData={userData}
              updateUserData={updateUserData}
              nextStep={nextStep}
              prevStep={prevStep}
              setModal={setModal}
              inputSize="sm"
            />
          )}
          {step === 4 && (
            <VideoKYC
              userData={userData}
              setUserData={setUserData}
              prevStep={prevStep}
              inputSize="sm"
            />
          )}
        </div>

        {/* Modal for OTP / verification messages */}
        {modal && (
          <div className="wn-modal-backdrop">
            <div className="wn-modal">
              <h3 className="wn-modal-title">{modal.title}</h3>
              <p className="wn-modal-message">{modal.message}</p>
              <button
                onClick={() => setModal(null)}
                className="wn-modal-btn"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
