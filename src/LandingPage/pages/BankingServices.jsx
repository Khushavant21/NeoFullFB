// import React, { useState } from "react";
// import "../styles/BankingServices.css";

// export default function BankingServices() {
//   const accountTypes = [
//     { name: "Savings" },
//     { name: "Salary" },
//     { name: "NRI" },
//     { name: "Business" },
//     { name: "Investments" },
//   ];

//   const loanTypes = [
//     { name: "Personal" },
//     { name: "Home" },
//     { name: "Vehicle" },
//     { name: "Education" },
//   ];

//   const [loanType, setLoanType] = useState("Personal");
//   const [amount, setAmount] = useState(300000);
//   const [duration, setDuration] = useState("6 Months");

//   const interestRate = 11;
//   const months = duration === "6 Months" ? 6 : duration === "1 Year" ? 12 : 24;

//   const totalInterest = Math.round((amount * interestRate * months) / (12 * 100));
//   const monthlyPayment = Math.round((amount + totalInterest) / months);

//   const handleAccountClick = (name) => {
//     alert(`You selected: ${name} account`);
//   };

//   const loanAmountOptions = {
//     Personal: {
//       labels: ["50K", "1L", "2L", "3L", "4L", "5L"],
//       values: [50000, 100000, 200000, 300000, 400000, 500000],
//     },
//     Home: {
//       labels: ["20L", "2Cr", "4Cr", "6Cr", "8Cr", "10Cr"],
//       values: [2000000, 20000000, 40000000, 60000000, 80000000, 100000000],
//     },
//     Vehicle: {
//       labels: ["1L", "50L", "1Cr", "1.5Cr", "2Cr"],
//       values: [100000, 5000000, 10000000, 15000000, 20000000],
//     },
//     Education: {
//       labels: ["1L", "20L", "40L", "60L", "80L", "1Cr"],
//       values: [100000, 2000000, 4000000, 6000000, 8000000, 10000000],
//     },
//   };

//   const { labels, values } = loanAmountOptions[loanType];
//   const minAmount = Math.min(...values);
//   const maxAmount = Math.max(...values);

//   return (
//     <section className="main-bank-section">
//       <div className="bank-flex">
//         {/* Open Account Card */}
//         <div className="bank-card open-account-card">
//           <h2>Open an Account</h2>
//           <div className="account-list">
//             {accountTypes.map((a, i) => (
//               <button
//                 className="account-btn"
//                 key={i}
//                 onClick={() => handleAccountClick(a.name)}
//               >
//                 {a.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Choose Your Loan Card */}
//         <div className="bank-card choose-loan-card">
//           <h2>Choose Your Loan</h2>
//           <div className="loan-container">
//             <div className="loan-form-section">
//               <div className="loan-types">
//                 {loanTypes.map((lt, i) => (
//                   <button
//                     key={i}
//                     className={`loan-type-btn${loanType === lt.name ? " selected" : ""}`}
//                     onClick={() => {
//                       setLoanType(lt.name);
//                       setAmount(values[0]);
//                     }}
//                   >
//                     {lt.name}
//                   </button>
//                 ))}
//               </div>

//               <div className="loan-form">
//                 <label className="loan-label">Amount</label>
//                 <input
//                   type="range"
//                   min={minAmount}
//                   max={maxAmount}
//                   step={1000}
//                   value={amount}
//                   onChange={(e) => setAmount(Number(e.target.value))}
//                   className="amount-slider"
//                 />
//                 <div className="amount-labels">
//                   {labels.map((label, idx) => (
//                     <span
//                       key={idx}
//                       className="amount-label"
//                       onClick={() => setAmount(values[idx])}
//                     >
//                       {label}
//                     </span>
//                   ))}
//                 </div>
//                 <span className="loan-amount-display">₹{amount.toLocaleString()}</span>
//               </div>

//               <div className="loan-form">
//                 <label className="loan-label">Duration</label>
//                 <div className="duration-btns">
//                   {["6 Months", "1 Year", "2 Year"].map((d) => (
//                     <button
//                       key={d}
//                       className={`duration-btn${duration === d ? " selected" : ""}`}
//                       onClick={() => setDuration(d)}
//                     >
//                       {d}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="loan-details-section">
//               <div className="loan-details-box">
//                 <div className="loan-rate-row">
//                   <strong className="loan-rate-label">Interest Rate @ {interestRate}%</strong>
//                 </div>
//                 <div className="loan-value-row">
//                   <span className="loan-value-title">Monthly Payment:</span>
//                   <span className="loan-value-value">₹{monthlyPayment.toLocaleString()}</span>
//                 </div>
//                 <div className="loan-value-row">
//                   <span className="loan-value-title">Total Interest:</span>
//                   <span className="loan-value-value">₹{totalInterest.toLocaleString()}</span>
//                 </div>
//                 <div className="loan-meta">
//                   <span>Minimal documentation</span>
//                   <span>No Collateral required</span>
//                 </div>
//                 <button className="apply-btn">Apply Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




import React, { useState } from "react";
import "./styles/BankingServices.css";

export default function BankingServices() {
  const accountTypes = [
    { name: "Savings", icon: "💰" },
    { name: "Salary", icon: "💵" },
    { name: "NRI", icon: "🌍" },
    { name: "Business", icon: "💼" },
    { name: "Investments", icon: "📈" },
  ];

  const loanTypes = [
    { name: "Personal", icon: "👤" },
    { name: "Home", icon: "🏠" },
    { name: "Vehicle", icon: "🚗" },
    { name: "Education", icon: "🎓" },
  ];

  const [loanType, setLoanType] = useState("Personal");
  const [amount, setAmount] = useState(300000);
  const [duration, setDuration] = useState("6 Months");

  const interestRate = 11;
  const months = duration === "6 Months" ? 6 : duration === "1 Year" ? 12 : 24;

  const totalInterest = Math.round((amount * interestRate * months) / (12 * 100));
  const monthlyPayment = Math.round((amount + totalInterest) / months);

  const handleAccountClick = (name) => {
    // Create a more attractive notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">✓</div>
        <div class="notification-message">
          <h3>Account Selected</h3>
          <p>You selected: ${name} account</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const loanAmountOptions = {
    Personal: {
      labels: ["50K", "1L", "2L", "3L", "4L", "5L"],
      values: [50000, 100000, 200000, 300000, 400000, 500000],
    },
    Home: {
      labels: ["20L", "2Cr", "4Cr", "6Cr", "8Cr", "10Cr"],
      values: [2000000, 20000000, 40000000, 60000000, 80000000, 100000000],
    },
    Vehicle: {
      labels: ["1L", "50L", "1Cr", "1.5Cr", "2Cr"],
      values: [100000, 5000000, 10000000, 15000000, 20000000],
    },
    Education: {
      labels: ["1L", "20L", "40L", "60L", "80L", "1Cr"],
      values: [100000, 2000000, 4000000, 6000000, 8000000, 10000000],
    },
  };

  const { labels, values } = loanAmountOptions[loanType];
  const minAmount = Math.min(...values);
  const maxAmount = Math.max(...values);

  return (
    <section className="main-bank-section">
      <div className="banking-header">
        <h1>Banking Services</h1>
        <p className="para">Explore our range of accounts and loan options</p>
      </div>
      
      <div className="bank-flex">
        {/* Open Account Card */}
        <div className="bank-card open-account-card">
          <div className="card-header">
            <h2>Open an Account</h2>
            <div className="card-icon">🏦</div>
          </div>
          <div className="account-list">
            {accountTypes.map((a, i) => (
              <button
                className="account-btn"
                key={i}
                onClick={() => handleAccountClick(a.name)}
              >
                <span className="account-icon2">{a.icon}</span>
                <span>{a.name}</span>
              </button>
            ))}
          </div>
          {/* <div className="card-footer">
            <p>Zero opening balance • Instant activation • 24/7 support</p>
          </div> */}
        </div>

        {/* Choose Your Loan Card */}
        <div className="bank-card choose-loan-card">
          <div className="card-header">
            <h2>Choose Your Loan</h2>
            <div className="card-icon">💸</div>
          </div>
          <div className="loan-container">
            <div className="loan-form-section">
              <div className="loan-types">
                {loanTypes.map((lt, i) => (
                  <button
                    key={i}
                    className={`loan-type-btn${loanType === lt.name ? " selected" : ""}`}
                    onClick={() => {
                      setLoanType(lt.name);
                      setAmount(values[0]);
                    }}
                  >
                    <span className="loan-icon">{lt.icon}</span>
                    <span>{lt.name}</span>
                  </button>
                ))}
              </div>

              <div className="loan-form">
                <label className="loan-label">Loan Amount</label>
                <div className="amount-slider-container">
                  <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="amount-slider"
                  />
                  <div className="slider-track"></div>
                </div>
                <div className="amount-labels">
                  {labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="amount-label"
                      onClick={() => setAmount(values[idx])}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="loan-amount-display">
                  <span className="currency-symbol">₹</span>
                  <span>{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="loan-form">
                <label className="loan-label">Loan Duration</label>
                <div className="duration-btns">
                  {["6 Months", "1 Year", "2 Year"].map((d) => (
                    <button
                      key={d}
                      className={`duration-btn${duration === d ? " selected" : ""}`}
                      onClick={() => setDuration(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="loan-details-section">
              <div className="loan-details-box">
                <div className="loan-rate-row">
                  <div className="rate-badge">
                    <span className="rate-value">{interestRate}%</span>
                    <span className="rate-label">Interest Rate</span>
                  </div>
                </div>
                <div className="loan-value-row">
                  <span className="loan-value-title">Monthly Payment:</span>
                  <span className="loan-value-value">₹{monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="loan-value-row">
                  <span className="loan-value-title">Total Interest:</span>
                  <span className="loan-value-value">₹{totalInterest.toLocaleString()}</span>
                </div>
                <div className="loan-meta">
                  <div className="meta-item">
                    <span className="meta-icon">✓</span>
                    <span>Minimal documentation</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">✓</span>
                    <span>No Collateral required</span>
                  </div>
                </div>
                <button className="apply-btn">
                  <span className="btn-text">Apply Now</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}