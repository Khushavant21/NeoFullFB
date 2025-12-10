import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PayBills.css";

const billers = [
  { id: "electricity", name: "Electricity Bill", icon: "💡" },
  { id: "water", name: "Water Bill", icon: "🚰" },
  { id: "gas", name: "Gas Bill", icon: "🔥" },
  { id: "mobile", name: "Mobile Recharge", icon: "📱" },
  { id: "dth", name: "DTH Recharge", icon: "📺" },
  { id: "broadband", name: "Broadband Bill", icon: "🌐" },
];

export default function PayBills() {
  const navigate = useNavigate();

  const [biller, setBiller] = useState("");
  const [fields, setFields] = useState({});
  const [message, setMessage] = useState("");

  const handleFieldChange = (name, value) => {
    setFields({ ...fields, [name]: value });
  };

  // ⭐ Real-Time Application Fields
  const getFormFields = () => {
    switch (biller) {
      case "Electricity Bill":
        return (
          <>
            <input
              placeholder="🌍 Select State"
              value={fields.state || ""}
              onChange={(e) => handleFieldChange("state", e.target.value)}
            />
            <input
              placeholder="🏢 Electricity Board / Provider"
              value={fields.provider || ""}
              onChange={(e) => handleFieldChange("provider", e.target.value)}
            />
            <input
              placeholder="🔌 Consumer Number / CA Number"
              value={fields.consumer || ""}
              onChange={(e) => handleFieldChange("consumer", e.target.value)}
            />
            <input
              placeholder="📊 Billing Unit (BU)"
              value={fields.bu || ""}
              onChange={(e) => handleFieldChange("bu", e.target.value)}
            />
            <input
              placeholder="💰 Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      case "Water Bill":
        return (
          <>
            <input
              placeholder="🏛️ Water Board"
              value={fields.board || ""}
              onChange={(e) => handleFieldChange("board", e.target.value)}
            />
            <input
              placeholder="💧 Connection Number"
              value={fields.connection || ""}
              onChange={(e) => handleFieldChange("connection", e.target.value)}
            />
            <input
              placeholder="📍 Area / Zone"
              value={fields.area || ""}
              onChange={(e) => handleFieldChange("area", e.target.value)}
            />
            <input
              placeholder="👤 Consumer Name (Optional)"
              value={fields.consumerName || ""}
              onChange={(e) => handleFieldChange("consumerName", e.target.value)}
            />
            <input
              placeholder="💰 Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      case "Gas Bill":
        return (
          <>
            <input
              placeholder="🏭 Gas Provider"
              value={fields.provider || ""}
              onChange={(e) => handleFieldChange("provider", e.target.value)}
            />
            <input
              placeholder="🔥 Customer ID"
              value={fields.customerId || ""}
              onChange={(e) => handleFieldChange("customerId", e.target.value)}
            />
            <input
              placeholder="🆔 LPG ID"
              value={fields.lpgId || ""}
              onChange={(e) => handleFieldChange("lpgId", e.target.value)}
            />
            <input
              placeholder="📱 Registered Mobile"
              value={fields.mobile || ""}
              onChange={(e) => handleFieldChange("mobile", e.target.value)}
            />
            <input
              placeholder="💰 Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      case "Mobile Recharge":
        return (
          <>
            <input
              placeholder="📱 Mobile Number"
              value={fields.mobile || ""}
              onChange={(e) => handleFieldChange("mobile", e.target.value)}
            />
            <input
              placeholder="📡 Operator (Jio, Airtel, VI)"
              value={fields.operator || ""}
              onChange={(e) => handleFieldChange("operator", e.target.value)}
            />
            <input
              placeholder="🌍 Circle (State)"
              value={fields.circle || ""}
              onChange={(e) => handleFieldChange("circle", e.target.value)}
            />
            <input
              placeholder="💰 Recharge Plan Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      case "DTH Recharge":
        return (
          <>
            <input
              placeholder="📺 Subscriber ID"
              value={fields.subId || ""}
              onChange={(e) => handleFieldChange("subId", e.target.value)}
            />
            <input
              placeholder="📡 Operator (TataSky, Airtel, DishTV)"
              value={fields.operator || ""}
              onChange={(e) => handleFieldChange("operator", e.target.value)}
            />
            <input
              placeholder="📱 Registered Mobile"
              value={fields.mobile || ""}
              onChange={(e) => handleFieldChange("mobile", e.target.value)}
            />
            <input
              placeholder="💰 Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      case "Broadband Bill":
        return (
          <>
            <input
              placeholder="🌐 User ID"
              value={fields.userId || ""}
              onChange={(e) => handleFieldChange("userId", e.target.value)}
            />
            <input
              placeholder="🔢 Account Number"
              value={fields.accNo || ""}
              onChange={(e) => handleFieldChange("accNo", e.target.value)}
            />
            <input
              placeholder="🏢 Broadband Provider"
              value={fields.provider || ""}
              onChange={(e) => handleFieldChange("provider", e.target.value)}
            />
            <input
              placeholder="📱 Registered Mobile"
              value={fields.mobile || ""}
              onChange={(e) => handleFieldChange("mobile", e.target.value)}
            />
            <input
              placeholder="💰 Amount"
              type="number"
              value={fields.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </>
        );

      default:
        return <p>Select a biller to continue.</p>;
    }
  };

  const handlePay = (e) => {
    e.preventDefault();

    if (!biller) return setMessage("⚠️ Please select a biller.");
    if (!fields.amount) return setMessage("⚠️ Please enter amount.");

    setMessage(`✅ Successfully paid ₹${fields.amount} for ${biller}!`);
    setFields({});
  };

  return (
    <div className="paybills-wrapper">
      <div className="paybills-card">
        <div className="pb-header">
          <span className="pb-back-btn" onClick={() => navigate(-1)}>← Back</span>
          <h1 className="pb-title">🧾 Pay Bills</h1>
        </div>

        <p>Select a biller and pay instantly</p>

        <div className="biller-grid">
          {billers.map((item) => (
            <div
              key={item.id}
              className={`biller-card ${biller === item.name ? "selected" : ""}`}
              onClick={() => setBiller(item.name)}
            >
              <div className="icon">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </div>

        {/* ⭐ Dynamic Form */}
        <form onSubmit={handlePay}>{getFormFields()}</form>

        {message && <div className="paybills-message">{message}</div>}
      </div>
    </div>
  );
}
