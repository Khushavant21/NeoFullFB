import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaHistory, FaBell, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import "./KYCDashboard11.css";

export default function KYCDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [viewingAlert, setViewingAlert] = useState(null);
  const [monitorTxn, setMonitorTxn] = useState(null);
  const [reviewTxn, setReviewTxn] = useState(null);

  // 🔥 FETCH BACKEND SUMMARY HERE
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/admin/kyc/summary")
      .then((res) => res.json())
      .then((data) => {
        console.log("KYC SUMMARY:", data);
        setSummary(data);
      })
      .catch((err) => console.error("Summary Error:", err));
  }, []);

  const transactions = [
    { id: "TXN001", type: "High Value", amount: "$30,000", status: "pending" },
    { id: "TXN002", type: "Structuring", amount: "$25,000", status: "flagged" },
    { id: "TXN003", type: "Offshore", amount: "$35,000", status: "pending" },
  ];

  const alerts = [
    { id: 1, text: "AML compliance check failed for 3 users", time: "2 hours ago" },
    { id: 2, text: "High transaction volume detected", time: "4 hours ago" },
    { id: 3, text: "Daily backup completed successfully", time: "6 hours ago" },
  ];

  return (
    <>
      {/* ------------ HEADER -------------- */}
      <div className="kdb-header">
        <div className="kdb-header-content">
          <h2 className="kdb-title">KYC & Compliance Dashboard</h2>
          <p className="kdb-description">Monitor and manage compliance operations</p>
        </div>
      </div>

      <div className="kdb-container">

        {/* ------------ SUMMARY CARDS ---------- */}
        <div className="kdb-grid-3">
          {/* CARD 1 — PENDING REVIEW */}
          <div className="kdb-card kdb-card-hover">
            <div className="kdb-card-icon"><FaUserCheck /></div>
            <h6>KYC Approvals</h6>
            <h5>{summary.pending}</h5>
            <p>Pending Review</p>
            <button className="kdb-btn kdb-btn-primary" onClick={() => navigate("review-kyc")}>
              Review KYC
            </button>
          </div>

          {/* CARD 2 — TOTAL HISTORY */}
          <div className="kdb-card kdb-card-hover">
            <div className="kdb-card-icon"><FaHistory /></div>
            <h6>KYC History</h6>
            <h5>{summary.total}</h5>
            <p>History list</p>
            <button className="kdb-btn kdb-btn-primary" onClick={() => navigate("review-transactions")}>
              Review History
            </button>
          </div>

          {/* CARD 3 — ALERTS */}
          <div className="kdb-card kdb-card-hover">
            <div className="kdb-card-icon"><FaBell /></div>
            <h6>System Alerts</h6>
            <h5>0</h5>
            <p>Requires Attention</p>
            <button className="kdb-btn kdb-btn-primary" onClick={() => navigate("view-alerts")}>
              View Alerts
            </button>
          </div>
        </div>

        {/* ---------- TRANSACTIONS + ALERTS ----------- */}
        <div className="kdb-grid-2">
          {/* Transactions */}
          <div className="kdb-card">
            <div className="kdb-card-header">
              <strong>Recent Transactions</strong>
              <button className="kdb-btn kdb-btn-outline" onClick={() => navigate("transactions")}>
                View All
              </button>
            </div>
            <div className="kdb-card-body">
              {transactions.map((txn) => (
                <div key={txn.id} className="kdb-txn-item">
                  <div>
                    <strong>{txn.id}</strong><br />
                    <small>{txn.type}</small>
                  </div>

                  <div className="kdb-txn-actions">
                    <span className="kdb-badge">{txn.amount}</span>

                    {txn.status === "pending" ? (
                      <button className="kdb-btn kdb-btn-dark" onClick={() => setMonitorTxn(txn)}>
                        Monitor
                      </button>
                    ) : (
                      <button className="kdb-btn kdb-btn-warning" onClick={() => setReviewTxn(txn)}>
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="kdb-card">
            <div className="kdb-card-header">
              <strong>System Alerts</strong>
              <button className="kdb-btn kdb-btn-outline" onClick={() => navigate("view-alerts")}>
                Review Now
              </button>
            </div>

            <div className="kdb-card-body">
              {alerts.map((a) => (
                <div key={a.id} className="kdb-alert-item">
                  <div>
                    ⚠️ {a.text}<br />
                    <small>{a.time}</small>
                  </div>
                  <button className="kdb-btn kdb-btn-primary" onClick={() => setViewingAlert(a)}>
                    View Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------- COMPLIANCE OVERVIEW ------- */}
        <div className="kdb-grid-4">
          <div className="kdb-card kdb-compliance-card">
            <div className="kdb-card-icon"><FaExchangeAlt /></div>
            <div className="kdb-card-body">{summary.total}<br />Total Submissions</div>
          </div>

          <div className="kdb-card kdb-compliance-card">
            <div className="kdb-card-icon"><FaUserCheck /></div>
            <div className="kdb-card-body">{summary.approved}<br />Approval Rate</div>
          </div>

          <div className="kdb-card kdb-compliance-card">
            <div className="kdb-card-icon"><FaHistory /></div>
            <div className="kdb-card-body">{summary.pending}<br />Pending Review</div>
          </div>

          <div className="kdb-card kdb-compliance-card">
            <div className="kdb-card-icon"><FaShieldAlt /></div>
            <div className="kdb-card-body">0<br />Active Alerts</div>
          </div>
        </div>
      </div>
    </>
  );
}
