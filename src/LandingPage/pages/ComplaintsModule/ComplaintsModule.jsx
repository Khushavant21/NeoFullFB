import React, { useState } from "react";
import "./ComplaintsModule.css";

const ComplaintsModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setFormData({});
    setErrors({});
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setFormData({});
    setErrors({});
    setSubmitStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mobileNumber || !/^[0-9]{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = "Please provide at least 10 characters";
    }

    if (
      modalType === "service" ||
      modalType === "complaint" ||
      modalType === "fraud"
    ) {
      if (
        !formData.accountNumber ||
        !/^[0-9]{10,16}$/.test(formData.accountNumber)
      ) {
        newErrors.accountNumber = "Please enter a valid account number";
      }
    }

    if (modalType === "query" && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.type) {
      newErrors.type = "Please select an option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const endpoint = {
        service: "/api/service-request",
        query: "/api/first-time-query",
        complaint: "/api/complaint",
        fraud: "/api/fraud-report",
      }[modalType];

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          status: "PENDING",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus({
          type: "success",
          message: `Your request has been submitted successfully! Reference ID: ${
            data.referenceId || "REF" + Date.now()
          }`,
          referenceId: data.referenceId || "REF" + Date.now(),
        });

        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Failed to submit request. Please try again or contact customer care at 1800 1080.",
      });
    }
  };

  const renderFormFields = () => {
    switch (modalType) {
      case "service":
        return (
          <div>
            <div className="form-group">
              <label htmlFor="type">Service Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className={errors.type ? "error" : ""}
              >
                <option value="">Select Service</option>
                <option value="password">Net Banking Password Reset</option>
                <option value="card_block">Blocking ATM/Debit Card</option>
                <option value="statement">Account Statement</option>
                <option value="transfer">Account Transfer</option>
                <option value="charges">Charges Enquiry</option>
                <option value="stop_payment">Stop Payment</option>
                <option value="cheque">Cheque Book Request</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber || ""}
                onChange={handleInputChange}
                placeholder="Enter your account number"
                className={errors.accountNumber ? "error" : ""}
              />
              {errors.accountNumber && (
                <span className="error-text">{errors.accountNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className={errors.mobileNumber ? "error" : ""}
              />
              {errors.mobileNumber && (
                <span className="error-text">{errors.mobileNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Please provide details about your request"
                rows="4"
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>
          </div>
        );

      case "query":
        return (
          <div>
            <div className="form-group">
              <label htmlFor="type">Query Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className={errors.type ? "error" : ""}
              >
                <option value="">Select Query Type</option>
                <option value="application">Application Status</option>
                <option value="account">Account/Credit Card Enquiry</option>
                <option value="interest">Interest Rates</option>
                <option value="loan">Loan Eligibility</option>
                <option value="refunds">Refunds</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className={errors.mobileNumber ? "error" : ""}
              />
              {errors.mobileNumber && (
                <span className="error-text">{errors.mobileNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Query Details *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Please describe your query in detail"
                rows="4"
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>
          </div>
        );

      case "complaint":
        return (
          <div>
            <div className="form-group">
              <label htmlFor="type">Complaint Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className={errors.type ? "error" : ""}
              >
                <option value="">Select Complaint Type</option>
                <option value="delayed">Delayed Service</option>
                <option value="transaction">Transaction Failure</option>
                <option value="other">Other Issues</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber || ""}
                onChange={handleInputChange}
                placeholder="Enter your account number"
                className={errors.accountNumber ? "error" : ""}
              />
              {errors.accountNumber && (
                <span className="error-text">{errors.accountNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="transactionId">
                Transaction ID (if applicable)
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={formData.transactionId || ""}
                onChange={handleInputChange}
                placeholder="Enter transaction ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="incidentDate">Date of Incident *</label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                value={formData.incidentDate || ""}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className={errors.mobileNumber ? "error" : ""}
              />
              {errors.mobileNumber && (
                <span className="error-text">{errors.mobileNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Complaint Details *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Please describe your complaint in detail"
                rows="4"
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>
          </div>
        );

      case "fraud":
        return (
          <div>
            <div className="fraud-warning">
              ⚠️ Please report fraud immediately. Our team will contact you
              within 2 hours.
            </div>

            <div className="form-group">
              <label htmlFor="type">Fraud Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className={errors.type ? "error" : ""}
              >
                <option value="">Select Fraud Type</option>
                <option value="unauthorized_transaction">
                  Unauthorized Transaction
                </option>
                <option value="phishing">Phishing/Scam</option>
                <option value="card_fraud">Card Fraud</option>
                <option value="identity_theft">Identity Theft</option>
                <option value="other">Other</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber || ""}
                onChange={handleInputChange}
                placeholder="Enter your account number"
                className={errors.accountNumber ? "error" : ""}
              />
              {errors.accountNumber && (
                <span className="error-text">{errors.accountNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID/Reference</label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={formData.transactionId || ""}
                onChange={handleInputChange}
                placeholder="Enter transaction reference"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount Involved (if any)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount || ""}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="incidentDate">Date & Time of Incident *</label>
              <input
                type="datetime-local"
                id="incidentDate"
                name="incidentDate"
                value={formData.incidentDate || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Emergency Contact Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className={errors.mobileNumber ? "error" : ""}
              />
              {errors.mobileNumber && (
                <span className="error-text">{errors.mobileNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Fraud Details *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Please provide all details about the fraudulent activity"
                rows="4"
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "service":
        return "Raise a Service Request";
      case "query":
        return "Raise a Query";
      case "complaint":
        return "Raise a Complaint";
      case "fraud":
        return "Report Fraud";
      default:
        return "";
    }
  };

  return (
    <div className="complaints-container">
      <section className="help-banner">
        <div className="help-content">
          <h2>Need Help?</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Contact Us</h3>
              <a href="tel:18001080" className="contact-link">
                1800 1080
              </a>
            </div>
            <div className="contact-item">
              <h3>Write To Us</h3>
              <a
                href="mailto:customer.care@Neobank.com"
                className="contact-link"
              >
                customer.care@Neobank.com
              </a>
            </div>
            <div className="contact-item">
              <h3>Visit Us</h3>
              <button className="find-branch-btn">Find Nearest Branch →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="options-section">
        <h1 className="main-heading">Please choose the right option</h1>

        <div className="options-grid">
          <div className="option-card">
            <h2>Service Request</h2>
            <p className="card-subtitle">Need help with your Account?</p>
            <p className="card-description">
              Click below to raise requests related to:
            </p>
            <ul className="feature-list">
              <li>Net Banking Password</li>
              <li>Blocking of ATM/Debit Card</li>
              <li>Account Statement</li>
              <li>Account Transfer</li>
              <li>Charges Enquiry</li>
              <li>Stop Payment</li>
              <li>Cheque / Cheque book Request etc.</li>
            </ul>
            <button className="action-btn" onClick={() => openModal("service")}>
              RAISE A SERVICE REQUEST
            </button>
          </div>

          <div className="option-card">
            <h2>First-time Query</h2>
            <p className="card-subtitle">Need information or clarification?</p>
            <p className="card-description">
              You can easily raise a query about our products & services and get
              help on the below topics:
            </p>
            <ul className="feature-list">
              <li>Application Status</li>
              <li>Enquiry related to Accounts or Credit Cards</li>
              <li>Interest Rates</li>
              <li>Loan Eligibility</li>
              <li>Refunds etc.</li>
            </ul>
            <button className="action-btn" onClick={() => openModal("query")}>
              RAISE A QUERY
            </button>
          </div>

          <div className="option-card">
            <h2>Complaints</h2>
            <p className="card-subtitle">Report a complaint</p>
            <p className="card-description">
              Report a complaint when you face a service failure, have an
              unsatisfactory experience with our products or services or have
              been a victim of fraud.
            </p>
            <ul className="feature-list">
              <li>Delayed Service</li>
              <li>Transaction Failure</li>
              <li>Report a Fraud</li>
            </ul>
            <div className="button-group">
              <button
                className="action-btn"
                onClick={() => openModal("complaint")}
              >
                RAISE COMPLAINT
              </button>
              <button
                className="action-btn fraud-btn"
                onClick={() => openModal("fraud")}
              >
                REPORT FRAUD
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-box">
          <h2>Contact Us Now</h2>
          <p className="contact-description">
            Need immediate help? Reach out directly to our Customer Care team
            for accurate guidance and safe assistance.
          </p>
          <ul className="contact-list">
            <li>
              <strong>Customer Care Number:</strong> 1800 1080
            </li>
            <li>Use your registered mobile number to connect instantly</li>
          </ul>
          <button className="action-btn">CUSTOMER HELPLINE CONTACTS</button>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">{getModalTitle()}</h2>

            {submitStatus ? (
              <div className={`status-message ${submitStatus.type}`}>
                <p>{submitStatus.message}</p>
                {submitStatus.referenceId && (
                  <p className="reference-id">
                    Please save this reference ID for tracking:{" "}
                    <strong>{submitStatus.referenceId}</strong>
                  </p>
                )}
              </div>
            ) : (
              <div className="modal-form">
                {renderFormFields()}

                <div className="form-actions">
                  <button className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="submit-btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsModule;
