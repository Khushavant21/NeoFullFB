import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RtgsForm.css"; // Plain CSS file

const RtgsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    beneficiaryName: "",
    mobileNumber: "",
    accountNumber: "",
    ifsc: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // ⭐ MOBILE NUMBER VALIDATION (INSIDE handleChange)
    if (name === "mobileNumber") {
      if (!/^[6-9]\d{0,9}$/.test(value)) {
        setErrors({ ...errors, mobileNumber: "Enter valid 10-digit mobile number" });
      } else if (value.length !== 10) {
        setErrors({ ...errors, mobileNumber: "Mobile number must be 10 digits" });
      } else {
        setErrors({ ...errors, mobileNumber: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      alert("Enter a valid 10-digit mobile number!");
      return;
    }

    if (!formData.beneficiaryName || !formData.accountNumber || !formData.ifsc || !formData.amount) {
      alert("Please fill all fields!");
      return;
    }

    if (parseFloat(formData.amount) < 200000) {
      alert("RTGS is for transactions ₹2,00,000 or more.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="rtgs-page-container">
      <div className="rtgs-card">
        <h2 className="rtgs-card-title">RTGS Transfer</h2>

        <form className="rtgs-form" onSubmit={handleSubmit}>

          {/* Beneficiary Name */}
          <div className="rtgs-form-group">
            <label htmlFor="beneficiaryName" className="rtgs-label">Beneficiary Name</label>
            <input
              type="text"
              id="beneficiaryName"
              name="beneficiaryName"
              placeholder="Enter beneficiary name"
              value={formData.beneficiaryName}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Mobile Number */}
          <div className="rtgs-form-group">
            <label htmlFor="mobileNumber" className="rtgs-label">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="rtgs-input"
            />
            {errors.mobileNumber && (
              <span className="rtgs-error">{errors.mobileNumber}</span>
            )}
          </div>

          {/* Account Number */}
          <div className="rtgs-form-group">
            <label htmlFor="accountNumber" className="rtgs-label">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* IFSC Code */}
          <div className="rtgs-form-group">
            <label htmlFor="ifsc" className="rtgs-label">IFSC Code</label>
            <input
              type="text"
              id="ifsc"
              name="ifsc"
              placeholder="Enter IFSC code"
              value={formData.ifsc}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Amount */}
          <div className="rtgs-form-group">
            <label htmlFor="amount" className="rtgs-label">Amount (₹2,00,000+)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              min={200000}
              value={formData.amount}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Buttons */}
          <div className="rtgs-buttons">
            <button type="submit" className="rtgs-btn-submit">Submit RTGS</button>
            <button type="button" onClick={() => navigate(-1)} className="rtgs-btn-back">Back</button>
          </div>

          {submitted && (
            <div className="rtgs-alert">
              ✅ RTGS Transfer of ₹{formData.amount} has been initiated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RtgsForm;



// const RtgsForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     beneficiaryName: "",
//      mobileNumber: "",
//     accountNumber: "",
//     ifsc: "",
//     amount: "",
//   });



//    const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.beneficiaryName || !formData.accountNumber || !formData.ifsc || !formData.amount) {
//       alert("Please fill all fields!");
//       return;
//     }
//     if (parseFloat(formData.amount) < 200000) {
//       alert("RTGS is for transactions ₹2,00,000 or more.");
//       return;
//     }
//     setSubmitted(true);
//   };

//   return (
//     <div className="rtgs-page-container">
//       <div className="rtgs-card">
//         <h2 className="rtgs-card-title">RTGS Transfer</h2>

//         <form className="rtgs-form" onSubmit={handleSubmit}>
//           {/* Beneficiary Name */}
//           <div className="rtgs-form-group">
//             <label htmlFor="beneficiaryName" className="rtgs-label">Beneficiary Name</label>
//             <input
//               type="text"
//               id="beneficiaryName"
//               name="beneficiaryName"
//               placeholder="Enter beneficiary name"
//               value={formData.beneficiaryName}
//               onChange={handleChange}
//               className="rtgs-input"
//             />
//           </div>


//           <div className="neft-form-group">
//   <label htmlFor="mobileNumber" className="neft-label">Mobile Number</label>
//   <input
//     type="text"
//     id="mobileNumber"
//     name="mobileNumber"
//     maxLength={10}
//     placeholder="Enter 10-digit mobile number"
//     value={formData.mobileNumber}
//     onChange={handleChange}
//     className="neft-input"
//   />
//   {errors.mobileNumber && <span className="neft-error">{errors.mobileNumber}</span>}
// </div>

//           {/* Account Number */}
//           <div className="rtgs-form-group">
//             <label htmlFor="accountNumber" className="rtgs-label">Account Number</label>
//             <input
//               type="text"
//               id="accountNumber"
//               name="accountNumber"
//               placeholder="Enter account number"
//               value={formData.accountNumber}
//               onChange={handleChange}
//               className="rtgs-input"
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="rtgs-form-group">
//             <label htmlFor="ifsc" className="rtgs-label">IFSC Code</label>
//             <input
//               type="text"
//               id="ifsc"
//               name="ifsc"
//               placeholder="Enter IFSC code"
//               value={formData.ifsc}
//               onChange={handleChange}
//               className="rtgs-input"
//             />
//           </div>

//           {/* Amount */}
//           <div className="rtgs-form-group">
//             <label htmlFor="amount" className="rtgs-label">Amount (₹2,00,000+)</label>
//             <input
//               type="number"
//               id="amount"
//               name="amount"
//               placeholder="Enter amount"
//               min={200000}
//               value={formData.amount}
//               onChange={handleChange}
//               className="rtgs-input"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="rtgs-buttons">
//             <button type="submit" className="rtgs-btn-submit">Submit RTGS</button>
//             <button type="button" onClick={() => navigate(-1)} className="rtgs-btn-back">Back</button>
//           </div>

//           {/* Success Message */}
//           {submitted && (
//             <div className="rtgs-alert">
//               ✅ RTGS Transfer of ₹{formData.amount} has been initiated successfully!
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RtgsForm;
