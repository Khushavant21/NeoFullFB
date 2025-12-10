import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Wallet,
} from "lucide-react";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Send Money", color: "primary", icon: "✈️", path: "/Client/send-money" },
    { label: "Pay Bills", color: "success", icon: "📱", path: "/Client/pay-bills" },
    { label: "Add Money", color: "purple", icon: "➕", path: "/Client/add-money" },
    { label: "Investments", color: "warning", icon: "📈", path: "/Client/investment" },
    { label: "Fixed Deposit", color: "pink", icon: "🐷", path: "/Client/deposit" },
    { label: "Cards", color: "info", icon: "💳", path: "/Client/cards" },
  ];

  return (
    <div className="client-home-dashboard">
      {/* Header */}
      <div className="client-home-header">
        <div className="client-home-header-left">
          <h2>Welcome Back, PoonamSingh!</h2>
          <p>Here's your financial overview for today</p>
        </div>
        <div className="client-home-header-right">
          <p>Total Balance</p>
          <h3>₹3,73,731.00</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="client-home-card-container" style={{ margin: "10px 20px" }}>
        <h4 style={{ fontWeight: "bold" }}>Quick Actions</h4>
        <p className="client-home-subtitle">Frequently used banking services</p>
        <div className="client-home-actions-grid">
          {actions.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="client-home-action-card"
            >
              <div className={`client-home-action-icon ${item.color}`}>
                {item.icon}
              </div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accounts & Transactions */}
      <div className="client-home-two-column">
        {/* Accounts */}
        <div className="client-home-card-container">
          <h4 style={{ fontWeight: "bold" }}>My Accounts</h4>
          <p className="client-home-subtitle">Overview of all your accounts</p>
          {[
            {
              title: "Primary Savings",
              type: "Savings Account",
              number: "****1234",
              balance: "₹1,25,450.75",
              icon: <Wallet />,
            },
            {
              title: "Current Account",
              type: "Current Account",
              number: "****5678",
              balance: "₹48,280.25",
              icon: <CreditCard />,
            },
            {
              title: "Fixed Deposit",
              type: "Fixed Deposit",
              number: "****9012",
              balance: "₹2,00,000.00",
              icon: <PiggyBank />,
            },
          ].map((acc, i) => (
            <div key={i} className="client-home-account-card">
              <div className="client-home-account-left">
                <div className="client-home-account-icon">{acc.icon}</div>
                <div>
                  <p className="client-home-title">{acc.title}</p>
                  <p className="client-home-subtitle">{acc.type}</p>
                  <p className="client-home-small">{acc.number}</p>
                </div>
              </div>
              <p className="client-home-balance">{acc.balance}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="client-home-card-container">
          <h4 style={{ fontWeight: "bold" }}>Recent Transactions</h4>
          <p className="client-home-subtitle">Your latest financial activities</p>
          {[
            {
              label: "Salary Credit",
              type: "Income",
              amount: "+₹75,000.00",
              date: "2025-01-10",
              color: "success",
              icon: <ArrowDownLeft />,
            },
            {
              label: "Online Shopping",
              type: "Shopping",
              amount: "-₹2,500.00",
              date: "2025-01-09",
              color: "danger",
              icon: <ArrowUpRight />,
            },
            {
              label: "Electricity Bill",
              type: "Utilities",
              amount: "-₹1,200.00",
              date: "2025-01-08",
              color: "danger",
              icon: <ArrowUpRight />,
            },
            {
              label: "Investment Returns",
              type: "Investment",
              amount: "+₹5,000.00",
              date: "2025-01-07",
              color: "success",
              icon: <ArrowDownLeft />,
            },
          ].map((tx, i) => (
            <div key={i} className="client-home-transaction-card">
              <div className="client-home-transaction-left">
                <div className={`client-home-transaction-icon ${tx.color}`}>
                  {tx.icon}
                </div>
                <div>
                  <p className="client-home-title">{tx.label}</p>
                  <p className="client-home-subtitle">{tx.type}</p>
                </div>
              </div>
              <div className="client-home-transaction-right">
                <p className={`client-home-amount ${tx.color}`}>{tx.amount}</p>
                <p className="client-home-small">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Widgets */}
      <div className="client-home-three-column">
        <div className="client-home-widget-card">
          <h5>Monthly Spending</h5>
          <p className="client-home-value">₹15,750</p>
          <p className="client-home-positive">↓ 12% from last month</p>
        </div>
        <div className="client-home-widget-card">
          <h5>Investment Growth</h5>
          <p className="client-home-value">₹2,45,000</p>
          <p className="client-home-positive">↑ 8.5% this quarter</p>
        </div>
        <div className="client-home-widget-card">
          <h5>Credit Score</h5>
          <p className="client-home-value">785</p>
          <p className="client-home-positive">Excellent</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
