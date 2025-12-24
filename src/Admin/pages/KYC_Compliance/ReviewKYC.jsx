import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserCheck,
  FaBan,
  FaRegFileAlt,
  FaStickyNote,
  FaUserShield,
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReviewKYC.css";

export default function ReviewKYC() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // LOAD USERS FROM BACKEND
  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/admin/kyc/all")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleView = (imgUrl) => {
    setSelectedDoc(imgUrl);
    setShowModal(true);
  };

  const handleDownload = (imgUrl) => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "kyc_document.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const approveUser = async (customerId) => {
    try {
      await axios.post(`http://localhost:8080/api/auth/admin/kyc/approve/${customerId}`);
      setAlert({ type: "success", msg: "KYC submission approved successfully." });

      setUsers(users.map(u =>
        u.customerId === customerId ? { ...u, status: "APPROVED" } : u
      ));

      setTimeout(() => setAlert(null), 4000);
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", msg: "Failed to approve KYC submission." });
    }
  };

  const rejectUser = async (customerId) => {
    try {
      await axios.post(`http://localhost:8080/api/auth/admin/kyc/reject/${customerId}`, {
        reason: "Document mismatch / Verification failure"
      });
      setAlert({ type: "danger", msg: "KYC submission has been rejected." });

      setUsers(users.map(u =>
        u.customerId === customerId ? { ...u, status: "REJECTED" } : u
      ));

      setTimeout(() => setAlert(null), 4000);
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", msg: "Failed to reject KYC submission." });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="kyc-review-container">

      {/* Red Matching Header */}
      <header className="kyc-review-header">
        <div className="kyc-header-content">
          <h2>KYC Reviews</h2>
          <p>Review and manage customer identity verifications with precision.</p>
        </div>
        <button className="kyc-back-btn" onClick={() => navigate('/Admin/kyc')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </header>

      <main className="kyc-page-body">

        {/* Search Bar */}
        <div className="kyc-search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by Name or Customer ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Alerts */}
        {alert && (
          <div className={`kyc-notification notify-${alert.type}`}>
            {alert.type === 'success' ? <FaUserCheck size={18} /> : <FaBan size={18} />}
            <span>{alert.msg}</span>
          </div>
        )}

        {/* User Card Feed */}
        {filteredUsers.length === 0 ? (
          <div className="kyc-empty-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <FaRegFileAlt size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#64748b' }}>No pending KYC submissions found.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <section className="kyc-user-card" key={user.customerId || user.id}>

              <div className="kyc-card-header">
                <div className="user-main-info">
                  <h5>{user.name}</h5>
                  <small>{user.email} &bull; ID: {user.customerId}</small>
                </div>
                <div className={`kyc-status-chip status-${user.status?.toLowerCase() || 'pending'}`}>
                  {user.status || 'PENDING'}
                </div>
              </div>

              <div className="kyc-docs-grid">

                {/* Aadhaar Section - Red Box */}
                <div className="doc-item-card">
                  <div className="doc-header">
                    <FaUserShield size={20} color="white" />
                    <span>Aadhaar Identity Proof</span>
                  </div>
                  <div className="doc-button-row">
                    <button className="doc-btn" onClick={() => handleView(user.aadhaarPhotoUrl)}>
                      <FaRegFileAlt /> Preview
                    </button>
                    <button className="doc-btn" onClick={() => handleDownload(user.aadhaarPhotoUrl)}>
                      <FaStickyNote /> Download
                    </button>
                  </div>
                </div>

                {/* Signature Section - Red Box */}
                <div className="doc-item-card">
                  <div className="doc-header">
                    <FaStickyNote size={20} color="white" />
                    <span>Customer Signature</span>
                  </div>
                  <div className="doc-button-row">
                    <button className="doc-btn" onClick={() => handleView(user.signatureUrl)}>
                      <FaRegFileAlt /> Preview
                    </button>
                    <button className="doc-btn" onClick={() => handleDownload(user.signatureUrl)}>
                      <FaStickyNote /> Download
                    </button>
                  </div>
                </div>

              </div>

              <div className="kyc-card-footer">
                {user.status !== "APPROVED" && (
                  <button className="action-btn btn-success" onClick={() => approveUser(user.customerId)}>
                    <FaUserCheck /> Approve Submission
                  </button>
                )}
                {user.status !== "REJECTED" && (
                  <button className="action-btn btn-danger" onClick={() => rejectUser(user.customerId)}>
                    <FaBan /> Reject Submission
                  </button>
                )}
              </div>

            </section>
          ))
        )}
      </main>

      {/* Preview Modal */}
      {showModal && (
        <div className="kyc-modal-blur" onClick={() => setShowModal(false)}>
          <div className="kyc-modal-wrap" onClick={(e) => e.stopPropagation()}>
            <button className="kyc-close-x" onClick={() => setShowModal(false)}>
              <FaBan size={16} />
            </button>
            <img src={selectedDoc} alt="KYC Document Preview" />
          </div>
        </div>
      )}

    </div>
  );
}
