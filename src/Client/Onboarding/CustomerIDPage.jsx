// import React, { useEffect, useState } from "react";
// import { useOnboarding } from "../context/OnboardingContext";
// import "./CustomerIDPage.css";

// export default function CustomerIDPage() {
//   const { setCurrentStep, updateUserData } = useOnboarding();
//   const [customerId, setCustomerId] = useState("");

//   useEffect(() => {
    
//     const uniqueId = "CUST" + Math.floor(10000000 + Math.random() * 90000000);
//     setCustomerId(uniqueId);
//     updateUserData({ customerId: uniqueId });
//   }, []); 


//   const handleProceed = () => {
//     setCurrentStep("updateKYC33");
//   };

//   const handleBack = () => {
//     setCurrentStep("account-type");
//   };

//   return (
//     <div className="welcome-container">
//       <div className="welcome-card">

//         <button className="back-btn" onClick={handleBack}>
//           ← Back
//         </button>

//         <div className="logo-container">
//           <div className="logo-icon">💳</div>
//         </div>

//         <h1 className="welcome-title">Your Customer ID is Ready!</h1>
//         <p className="welcome-subtitle">
//           Use this unique ID for your KYC and account login.
//         </p>

//         <div className="customer-id-box">
//           <span className="label">Customer ID</span>
//           <h2 className="generated-id">{customerId}</h2>
//         </div>

//         <div className="id-info">
//           Please save this ID safely. You’ll need it to complete your KYC.
//         </div>

//         <button className="get-started-btn" onClick={handleProceed}>
//           Proceed to KYC <span className="arrow-icon">→</span>
//         </button>

//         <p className="footer-text">
//           Powered by <span className="login-text">Stoic Neobank</span> • Secure Digital Banking
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import "./CustomerIDPage.css";

export default function CustomerIDPage() {
  const { setCurrentStep, updateUserData } = useOnboarding();

  useEffect(() => {
    // Generate and store a temporary customer reference (not yet approved)
    const tempId = "CUST" + Math.floor(10000000 + Math.random() * 90000000);
    updateUserData({ tempCustomerId: tempId });
  }, [updateUserData]);

  // Go back to previous step
  const handleBack = () => {
    setCurrentStep("account-type");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        {/* Logo */}
        <div className="logo-container">
          <div className="logo-icon">🔒</div>
        </div>

        {/* Title */}
        <h1 className="welcome-title">Profile Under Verification</h1>
        <p className="welcome-subtitle">
          Your PAN and Aadhaar details have been submitted successfully.
        </p>

        {/* Notification Box */}
        <div className="email-notification">
          <div className="email-icon">⏳</div>
          <div className="email-text">
            Our team is currently reviewing your documents. This process may
            take some time.
            <br />
            Once your profile is <strong>approved by the admin</strong>, you’ll
            receive an email with your <strong>Customer ID</strong> and a{" "}
            <strong>Temporary Password</strong> to log in to your account.
          </div>
        </div>

        {/* Info Section */}
        <div className="id-info">
          Please check your inbox regularly. You will be able to access your
          Neobank account and complete your full KYC process after
          approval.
        </div>

        {/* Disabled Button */}
        <button className="get-started-btn" disabled>
          🔐 Waiting for Admin Approval
        </button>

        {/* Footer */}
        <p className="footer-text">
          Powered by <span className="login-text">Stoic Neobank</span> • Secure
          Digital Banking
        </p>
      </div>
    </div>
  );
}
