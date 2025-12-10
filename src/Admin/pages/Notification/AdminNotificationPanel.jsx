import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNotificationPanel.css";

const AdminNotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          fullName: "Amit Sharma",
          message: "New client registration request pending approval.",
          type: "CLIENT_REQUEST",
          date: "2025-11-11T10:00:00",
          details: {
            email: "amit.sharma@example.com",
            phone: "+91 9876543210",
            address: "New Delhi, India",
            kycStatus: "Pending",
          },
        },
        {
          id: 2,
          fullName: "System",
          message: "KYC verification completed for client #C12345.",
          type: "KYC_APPROVED",
          date: "2025-11-10T14:30:00",
        },
        {
          id: 3,
          fullName: "Riya Verma",
          message: "Customer ID sent successfully to client via email.",
          type: "CUSTOMER_ID_SENT",
          date: "2025-11-09T09:45:00",
        },
      ];
      setNotifications(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (id) => {
    if (!window.confirm("Approve this client request?")) return;
    setNotifications((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              type: "KYC_APPROVED",
              message: "✅ Client request approved successfully.",
            }
          : note
      )
    );
    alert("✅ Approved successfully! Customer ID sent.");
    setSelectedClient(null);
  };

  const handleReject = (id) => {
    if (!window.confirm("Reject this client request?")) return;
    setNotifications((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              type: "KYC_REJECTED",
              message: "❌ Client request rejected by admin.",
            }
          : note
      )
    );
    alert("❌ Request rejected successfully.");
    setSelectedClient(null);
  };

  const getTypeBadge = (type) => {
    const map = {
      CLIENT_REQUEST: { text: "Client Request", color: "#900603" },
      KYC_APPROVED: { text: "KYC Approved", color: "#28a745" },
      KYC_REJECTED: { text: "KYC Rejected", color: "#dc3545" },
      CUSTOMER_ID_SENT: { text: "Customer ID Sent", color: "#0dcaf0" },
      ACCOUNT_SUSPENDED: { text: "Account Suspended", color: "#6c757d" },
    };
    return (
      <span
        className="admin-notify-type"
        style={{ backgroundColor: map[type]?.color || "#900603" }}
      >
        {map[type]?.text || "Notification"}
      </span>
    );
  };

  return (
    <div className="admin-notify-container">
      <header className="admin-notify-header">
        <div className="admin-header-top">
          <h2>Admin Notifications Center</h2>
          <button
            className="admin-btn-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
        <p className="admin-notify-desc">
          Approve, reject, or view client registration details.
        </p>
      </header>

      {loading ? (
        <div className="admin-notify-loading">
          Fetching latest notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="admin-notify-empty">🎉 No new notifications.</div>
      ) : (
        <div className="admin-notify-list">
          {notifications.map((note) => (
            <div key={note.id} className="admin-notify-card">
              <div className="admin-notify-left">
                <div className="admin-notify-avatar">
                  {note.fullName ? note.fullName.charAt(0).toUpperCase() : "N"}
                </div>
                <div className="admin-notify-info">
                  <h4>{note.fullName || "System Notification"}</h4>
                  <p>{note.message}</p>
                  <div className="admin-notify-meta">
                    {getTypeBadge(note.type)}
                    <span className="admin-notify-date">
                      {new Date(note.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {note.type === "CLIENT_REQUEST" && (
                <div className="admin-notify-right">
                  <button
                    className="admin-btn-view"
                    onClick={() => setSelectedClient(note)}
                  >
                    View Details
                  </button>
                  <button
                    className="admin-btn-approve"
                    onClick={() => handleApprove(note.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="admin-btn-reject"
                    onClick={() => handleReject(note.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {selectedClient && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Client Details</h3>
            <p><strong>Name:</strong> {selectedClient.fullName}</p>
            <p><strong>Email:</strong> {selectedClient.details?.email}</p>
            <p><strong>Phone:</strong> {selectedClient.details?.phone}</p>
            <p><strong>Address:</strong> {selectedClient.details?.address}</p>
            <p><strong>KYC Status:</strong> {selectedClient.details?.kycStatus}</p>

            <div className="admin-modal-actions">
              <button
                className="admin-btn-approve"
                onClick={() => handleApprove(selectedClient.id)}
              >
                Approve
              </button>
              <button
                className="admin-btn-reject"
                onClick={() => handleReject(selectedClient.id)}
              >
                Reject
              </button>
              <button
                className="admin-btn-close"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationPanel;
