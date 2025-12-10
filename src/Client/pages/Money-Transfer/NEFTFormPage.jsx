import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NEFTForm.css"; // Plain CSS file

const NEFTFormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    beneficiaryName: "",
    mobileNumber: "",
    bankName: "",
    transferDate: "",

    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    amount: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const ifscRegex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!formData.beneficiaryName.trim()) e.beneficiaryName = "Beneficiary name is required";
    if (!formData.mobileNumber.trim())
      e.mobileNumber = "Mobile number is required";
     else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber))
  e.mobileNumber = "Enter a valid 10-digit mobile number";

    if (!formData.bankName.trim()) e.bankName = "Bank name is required";
    if (!formData.transferDate.trim())
  e.transferDate = "Date is required";

    if (!formData.accountNumber.trim()) e.accountNumber = "Account number is required";
    if (!formData.confirmAccountNumber.trim()) e.confirmAccountNumber = "Confirm account is required";
    if (formData.accountNumber && formData.confirmAccountNumber && formData.accountNumber !== formData.confirmAccountNumber)
      e.confirmAccountNumber = "Account numbers do not match";
    if (!formData.ifsc.trim()) e.ifsc = "IFSC is required";
    else if (!ifscRegex.test(formData.ifsc.trim().toUpperCase()))
      e.ifsc = "Invalid IFSC format (e.g., HDFC0AAAA12)";
    if (!formData.amount.trim()) e.amount = "Amount is required";
    else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0)
      e.amount = "Please enter a valid amount";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      ifsc: formData.ifsc.trim().toUpperCase(),
      amount: Number(formData.amount),
      timestamp: new Date().toISOString(),
    };

    setSubmitted(true);
    alert(
      `NEFT Initiated:\n\nBeneficiary: ${payload.beneficiaryName}\nAccount: ${payload.accountNumber}\nIFSC: ${payload.ifsc}\nAmount: ₹${payload.amount}\nRemarks: ${payload.remarks}`
    );
  };

  return (
    <div className="neft-page-container">
      <div className="neft-card-container">
        <h2 className="neft-card-title">NEFT Transfer</h2>

        <form className="neft-form" onSubmit={handleSubmit}>
          {/* Beneficiary Name */}
          <div className="neft-form-group">
            <label htmlFor="beneficiaryName" className="neft-label">Beneficiary Name</label>
            <input
              type="text"
              id="beneficiaryName"
              name="beneficiaryName"
              placeholder="e.g. Rajesh Kumar"
              value={formData.beneficiaryName}
              onChange={handleChange}
              className="neft-input"
            />
            {errors.beneficiaryName && <span className="neft-error">{errors.beneficiaryName}</span>}
          </div>



<div className="neft-form-group">
  <label htmlFor="mobileNumber" className="neft-label">Mobile Number</label>
  <input
    type="text"
    id="mobileNumber"
    name="mobileNumber"
    maxLength={10}
    placeholder="Enter 10-digit mobile number"
    value={formData.mobileNumber}
    onChange={handleChange}
    className="neft-input"
  />
  {errors.mobileNumber && <span className="neft-error">{errors.mobileNumber}</span>}
</div>




          {/* Bank Name */}
          {/* <div className="neft-form-group">
            <label htmlFor="bankName" className="neft-label">Bank Name</label>
            <select
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="neft-input"
            >
              <option value="">Select Bank</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
            </select>
            {errors.bankName && <span className="neft-error">{errors.bankName}</span>}
          </div> */}
{/* Bank Name + Transfer Date */}
<div className="neft-row">

  {/* Bank Name */}
  <div className="neft-col">
    <label htmlFor="bankName" className="neft-label">Bank Name</label>
    <select
      id="bankName"
      name="bankName"
      value={formData.bankName}
      onChange={handleChange}
      className="neft-input"
    >
      <option value="">Select Bank</option>
      <option value="HDFC Bank">HDFC Bank</option>
      <option value="State Bank of India">State Bank of India</option>
      <option value="ICICI Bank">ICICI Bank</option>
      <option value="Axis Bank">Axis Bank</option>
      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
      <option value="Punjab National Bank">Punjab National Bank</option>
    </select>
    {errors.bankName && (
      <span className="neft-error">{errors.bankName}</span>
    )}
  </div>

  {/* Transfer Date */}
  <div className="neft-col">
    <label htmlFor="transferDate" className="neft-label">Date</label>
    <input
      type="date"
      id="transferDate"
      name="transferDate"
      value={formData.transferDate}
      onChange={handleChange}
      className="neft-input"
    />
    {errors.transferDate && (
      <span className="neft-error">{errors.transferDate}</span>
    )}
  </div>

</div>

          {/* Account Numbers */}
          <div className="neft-row">
            <div className="neft-col">
              <label htmlFor="accountNumber" className="neft-label">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="neft-input"
              />
              {errors.accountNumber && <span className="neft-error">{errors.accountNumber}</span>}
            </div>
            <div className="neft-col">
              <label htmlFor="confirmAccountNumber" className="neft-label">Confirm Account Number</label>
              <input
                type="text"
                id="confirmAccountNumber"
                name="confirmAccountNumber"
                value={formData.confirmAccountNumber}
                onChange={handleChange}
                className="neft-input"
              />
              {errors.confirmAccountNumber && <span className="neft-error">{errors.confirmAccountNumber}</span>}
            </div>
          </div>

          {/* IFSC & Amount */}
          <div className="neft-row">
            <div className="neft-col">
              <label htmlFor="ifsc" className="neft-label">IFSC Code</label>
              <input
                type="text"
                id="ifsc"
                name="ifsc"
                placeholder="e.g. HDFC0AAAA12"
                maxLength={11}
                value={formData.ifsc}
                onChange={handleChange}
                className="neft-input"
              />
              {errors.ifsc && <span className="neft-error">{errors.ifsc}</span>}
            </div>

            
            <div className="neft-col">
              <label htmlFor="amount" className="neft-label">Amount (₹)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="neft-input"
              />
              {errors.amount && <span className="neft-error">{errors.amount}</span>}
            </div>
          </div>

          {/* Remarks */}
          <div className="neft-form-group">
            <label htmlFor="remarks" className="neft-label">Remarks (optional)</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              placeholder="e.g. Invoice Payment #123"
              value={formData.remarks}
              onChange={handleChange}
              className="neft-input"
            />
          </div>

          {/* Buttons */}
          <div className="neft-form-buttons">
            <button type="submit" className="neft-btn-submit">Submit NEFT</button>
            <button type="button" onClick={() => navigate(-1)} className="neft-btn-back">Back</button>
          </div>

          {/* Success Message */}
          {submitted && <div className="neft-alert">✅ NEFT Transfer submitted successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default NEFTFormPage;
