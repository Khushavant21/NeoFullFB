 import React from "react";
import { useEffect } from "react";
import "./PersonalSection.css";
import {
  FaPiggyBank,
  FaWallet,
  FaBuilding,
  FaArrowUp,
  FaMobileAlt,
  FaShieldAlt,
  FaClock,
  FaGift,
  FaPercent,
  FaMedal,
} from "react-icons/fa";

export default function PersonalSection() {
  const accounts = [
    {
      icon: <FaPiggyBank />,
      title: "Savings Account",
      desc: "Earn up to 7% interest with zero balance requirement",
      points: [
        "No minimum balance",
        "Free ATM withdrawals",
        "Instant account opening",
      ],
    },
    {
      icon: <FaWallet />,
      title: "Salary Account",
      desc: "Exclusive benefits for salaried professionals",
      points: ["Free cheque book", "Overdraft facility", "Priority service"],
    },
    {
      icon: <FaBuilding />,
      title: "Fixed Deposit",
      desc: "Secure your future with high returns",
      points: ["Competitive rates", "Flexible tenure", "Premature withdrawal"],
    },
    {
      icon: <FaArrowUp />,
      title: "Recurring Deposit",
      desc: "Build wealth with regular savings",
      points: ["Start from ₹500/month", "Auto-debit facility", "Tax benefits"],
    },
  ];

  const loans = [
    { title: "Personal Loan", rate: "10.5%", amount: "Up to ₹25 Lakhs", tenure: "5 years" },
    { title: "Home Loan", rate: "8.5%", amount: "Up to ₹5 Crores", tenure: "30 years" },
    { title: "Education Loan", rate: "9.5%", amount: "Up to ₹50 Lakhs", tenure: "15 years" },
    { title: "Vehicle Loan", rate: "9.0%", amount: "Up to ₹15 Lakhs", tenure: "7 years" },
  ];

  const digitalServices = [
    { icon: <FaMobileAlt />, title: "Mobile Banking", desc: "Bank anytime, anywhere with our mobile app" },
    { icon: <FaShieldAlt />, title: "Secure Transactions", desc: "Bank-grade security for all your transactions" },
    { icon: <FaClock />, title: "24/7 Support", desc: "Round-the-clock customer support" },
  ];

  const benefits = [
    { icon: <FaMedal />, title: "Premium Rewards", desc: "Earn points on every spend and redeem for amazing rewards", color: "#e9f2ff" },
    { icon: <FaGift />, title: "Welcome Bonus", desc: "Get ₹500 cashback on opening your account", color: "#e8f8ee" },
    { icon: <FaPercent />, title: "Lower Interest", desc: "Preferential rates for existing customers", color: "#f5eaff" },
  ];

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      {/* ======= PERSONAL BANKING SECTION ======= */}
       <section className="per-personal-sections">
      <div className="per-personal-container">
        <h1 className="per-personal-title">
          Personal Banking Solutions
        </h1>
        <p className="per-personal-subtitle">
          Experience banking tailored to your personal needs. From savings
          accounts to loans, we have everything you need.
        </p>
        <div className="per-personal-buttons">
          <button className="per-personal-btn-primary">Open Account</button>
          <button className="per-personal-btn-secondary">Apply for Loan</button>
        </div>
      </div>
    </section>
  

      {/* ======= ACCOUNTS & DEPOSITS SECTION ======= */}
      <section className="accountss-section">
  <h2 className="accountss-title">Accounts & Deposits</h2>
  <p className="accountss-subtitle">
    Choose the perfect account for your financial goals
  </p>

  <div className="accountss-grid">
    {accounts.map((item, index) => (
      <div className="accountss-card" key={index}>
        <div className="accountss-icon">{item.icon}</div>
        <h3 className="accountss-heading">{item.title}</h3>
        <p className="accountss-desc">{item.desc}</p>
        <ul className="accountss-points">
          {item.points.map((p, i) => (
            <li key={i}>✓ {p}</li>
          ))}
        </ul>
        <button className="accountss-btn">Open Now</button>
      </div>
    ))}
  </div>
</section>




      {/* ---------- PERSONAL LOANS SECTION ---------- */}
      <section className="personal-loans-section">
        <h2 className="personal-loans-title">Personal Loans</h2>
        <p className="personal-loans-subtitle">
          Fulfill your dreams with our flexible loan options
        </p>
        <div className="personal-loans-grid">
          {loans.map((loan, index) => (
            <div className="personal-loans-card" key={index}>
              <h3>{loan.title}</h3>
              <div className="personal-loans-details">
                <p>
                  <span>Interest Rate</span> <b>{loan.rate}</b>
                </p>
                <p>
                  <span>Amount</span> <b>{loan.amount}</b>
                </p>
                <p>
                  <span>Max Tenure</span> <b>{loan.tenure}</b>
                </p>
              </div>
              <button className="personal-loans-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- DIGITAL BANKING SECTION ---------- */}
      <section className="digital-section">
        <div className="container">
          <h2 className="digital-title">Digital Banking Services</h2>
          <p className="digital-subtitle">Modern banking at your fingertips with our innovative digital solutions</p>
          <div className="digital-grid">
            {digitalServices.map((service, index) => (
              <div className="digital-card" key={index}>
                <div className="digital-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PERSONAL BANKING BENEFITS SECTION ---------- */}
      <section className="benefitss-section">
        <div className="benefitss-header">
          <h2 className="benefitss-title">Exclusive Personal Banking Benefits</h2>
          <p className="benefitss-subtitle">Experience premium advantages tailored just for you</p>
        </div>
        <div className="benefitss-grid">
          {benefits.map((b, index) => (
            <div className="benefitss-card" key={index} style={{ backgroundColor: b.color }}>
              <div className="benefitss-icon-wrapper">
                <div className="benefitss-icon">{b.icon}</div>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <div className="benefitss-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
