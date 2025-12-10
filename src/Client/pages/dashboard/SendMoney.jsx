import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css";

export default function SendMoney() {
  const navigate = useNavigate();

  const [recipientType, setRecipientType] = useState("mobile");

  const [mobile, setMobile] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState({ acc: "", confirmAcc: "", ifsc: "" });

  // ⭐ Beneficiary State
  const [beneficiary, setBeneficiary] = useState({
    name: "",
    mobile: "",
    acc: "",
    confirmAcc: "",
    ifsc: "",
    nickname: "",
  });

  // ⭐ Self Transfer State
  const [selfTransfer, setSelfTransfer] = useState({
    acc: "",
    confirmAcc: "",
    ifsc: "",
  });

  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  // ⭐ Validation
  const validate = () => {
    setError("");

    if (!amount || Number(amount) <= 0)
      return setError("Enter valid amount.");

    // ⭐ MOBILE
    if (recipientType === "mobile" && !/^\d{10}$/.test(mobile))
      return setError("Enter valid 10-digit mobile number.");

    // ⭐ UPI
    if (recipientType === "upi" && !/^[\w.+-]+@[\w]+$/.test(upiId))
      return setError("Enter valid UPI ID.");

    // ⭐ BANK
    if (recipientType === "bank") {
      if (!bank.acc || !bank.confirmAcc || bank.acc !== bank.confirmAcc)
        return setError("Account numbers do not match.");
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifsc))
        return setError("Enter valid IFSC code.");
    }

    // ⭐ BENEFICIARY
    if (recipientType === "beneficiary") {
      if (!beneficiary.name.trim())
        return setError("Beneficiary name is required.");

      if (!/^\d{10}$/.test(beneficiary.mobile))
        return setError("Enter valid 10-digit mobile number.");

      if (!beneficiary.acc || beneficiary.acc !== beneficiary.confirmAcc)
        return setError("Account numbers do not match.");

      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(beneficiary.ifsc))
        return setError("Enter valid IFSC code.");
    }

    // ⭐ SELF TRANSFER
    if (recipientType === "self") {
      if (!selfTransfer.acc || !selfTransfer.confirmAcc)
        return setError("Enter both account numbers.");

      if (selfTransfer.acc !== selfTransfer.confirmAcc)
        return setError("Account numbers do not match.");

      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(selfTransfer.ifsc))
        return setError("Enter valid IFSC code.");
    }

    return true;
  };

  const handleSend = () => {
    if (!validate()) return;

    alert(`✅ Sent ₹${amount} via ${recipientType.toUpperCase()}`);

    // Reset All
    setMobile("");
    setUpiId("");
    setBank({ acc: "", confirmAcc: "", ifsc: "" });
    setBeneficiary({
      name: "",
      mobile: "",
      acc: "",
      confirmAcc: "",
      ifsc: "",
      nickname: "",
    });
    setSelfTransfer({ acc: "", confirmAcc: "", ifsc: "" });
    setAmount("");
    setRemark("");
  };

  return (
    <div className="sendmoney-wrapper">
      <div className="sendmoney-card">
        {/* Header */}
        <div className="sm-header">
          <span className="sm-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </span>
          <h1 className="sm-title">💸 Send Money</h1>
        </div>

        {/* Recipient Type */}
        <span>Send To</span>
        <div className="recipient-types">
          {["mobile", "upi", "bank", "beneficiary", "self"].map((type) => (
            <button
              key={type}
              className={recipientType === type ? "selected" : ""}
              onClick={() => setRecipientType(type)}
            >
              {type === "mobile"
                ? "📱 Mobile"
                : type === "upi"
                ? "💳 UPI ID"
                : type === "bank"
                ? "🏦 Bank"
                : type === "beneficiary"
                ? "👤 Beneficiary"
                : "🔁 Self Transfer"}
            </button>
          ))}
        </div>

        {/* Mobile */}
        {recipientType === "mobile" && (
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="📱 Enter Mobile Number"
          />
        )}

        {/* UPI */}
        {recipientType === "upi" && (
          <input
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="💳 Enter UPI ID (e.g. name@upi)"
          />
        )}

        {/* Bank */}
        {recipientType === "bank" && (
          <>
            <input
              value={bank.acc}
              onChange={(e) =>
                setBank((s) => ({ ...s, acc: e.target.value }))
              }
              placeholder="🏦 Account Number"
            />
            <input
              value={bank.confirmAcc}
              onChange={(e) =>
                setBank((s) => ({ ...s, confirmAcc: e.target.value }))
              }
              placeholder="🔁 Confirm Account Number"
            />
            <input
              value={bank.ifsc}
              onChange={(e) =>
                setBank((s) => ({ ...s, ifsc: e.target.value.toUpperCase() }))
              }
              placeholder="🔑 IFSC Code"
            />
          </>
        )}

        {/* Beneficiary */}
        {recipientType === "beneficiary" && (
          <>
            <input
              value={beneficiary.name}
              onChange={(e) =>
                setBeneficiary((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="👤 Beneficiary Name"
            />
            <input
              value={beneficiary.mobile}
              onChange={(e) =>
                setBeneficiary((s) => ({ ...s, mobile: e.target.value }))
              }
              placeholder="📱 Mobile Number"
            />
            <input
              value={beneficiary.acc}
              onChange={(e) =>
                setBeneficiary((s) => ({ ...s, acc: e.target.value }))
              }
              placeholder="🏦 Account Number"
            />
            <input
              value={beneficiary.confirmAcc}
              onChange={(e) =>
                setBeneficiary((s) => ({ ...s, confirmAcc: e.target.value }))
              }
              placeholder="🔁 Confirm Account Number"
            />
            <input
              value={beneficiary.ifsc}
              onChange={(e) =>
                setBeneficiary((s) => ({
                  ...s,
                  ifsc: e.target.value.toUpperCase(),
                }))
              }
              placeholder="🔑 IFSC Code"
            />
            <input
              value={beneficiary.nickname}
              onChange={(e) =>
                setBeneficiary((s) => ({ ...s, nickname: e.target.value }))
              }
              placeholder="🏷️ Nickname (Optional)"
            />
          </>
        )}

        {/* ⭐ SELF TRANSFER */}
        {recipientType === "self" && (
          <>
            <input
              value={selfTransfer.acc}
              onChange={(e) =>
                setSelfTransfer((s) => ({ ...s, acc: e.target.value }))
              }
              placeholder="🏦 Your Account Number"
            />
            <input
              value={selfTransfer.confirmAcc}
              onChange={(e) =>
                setSelfTransfer((s) => ({ ...s, confirmAcc: e.target.value }))
              }
              placeholder="🔁 Confirm Account Number"
            />
            <input
              value={selfTransfer.ifsc}
              onChange={(e) =>
                setSelfTransfer((s) => ({
                  ...s,
                  ifsc: e.target.value.toUpperCase(),
                }))
              }
              placeholder="🔑 IFSC Code"
            />
          </>
        )}

        {/* Amount */}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="💰 Enter Amount"
        />

        {/* Remark */}
        <input
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="📝 Remark (optional)"
        />

        {/* Error */}
        {error && <div className="sendmoney-error">⚠️ {error}</div>}

        {/* Button */}
        <button onClick={handleSend} className="send-btn">
          🚀 Send ₹{amount || "0"} Now
        </button>
      </div>
    </div>
  );
}
