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
      .catch(err => console.error(err));
  }, []);

  const handleView = (imgUrl) => {
    setSelectedDoc(imgUrl);
    setShowModal(true);
  };

  const handleDownload = (imgUrl) => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "document.png";
    link.click();
  };

  const approveUser = async (customerId) => {
    await axios.post(`http://localhost:8080/api/auth/admin/kyc/approve/${customerId}`);
    setAlert({ type: "success", msg: "KYC Approved" });

    setUsers(users.map(u =>
      u.customerId === customerId ? { ...u, status: "APPROVED" } : u
    ));
  };

  const rejectUser = async (customerId) => {
    await axios.post(`http://localhost:8080/api/auth/admin/kyc/reject/${customerId}`, {
      reason: "Document mismatch"
    });
    setAlert({ type: "danger", msg: "KYC Rejected" });

    setUsers(users.map(u =>
      u.customerId === customerId ? { ...u, status: "REJECTED" } : u
    ));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="kyc-review-header">
        <div className="kyc-header-content">
          <h2>KYC Approve</h2>
          <p>Efficiently review and manage all KYC submissions</p>
        </div>
        <button className="kyc-back-btn" onClick={() => navigate('/Admin/kyc')}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="kyc-review-container">
        <div className="kyc-search-bar">
          <input
            type="text"
            placeholder="Search Name or Customer ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch />
        </div>

        {alert && <div className={`kyc-alert kyc-alert-${alert.type}`}>{alert.msg}</div>}

        {filteredUsers.map((user) => (
          <div className="kyc-user-card" key={user.id}>
            <div className="kyc-user-info">
              <h5>{user.name}</h5>
              <small>{user.email} | Customer ID: {user.customerId}</small>
              <span className={`kyc-status-badge kyc-status-${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </div>

            <div className="kyc-documents-grid">
              <div className="kyc-document-card">
                <h6>Aadhaar Photo</h6>
                <button onClick={() => handleView(user.aadhaarPhotoUrl)}>View</button>
                <button onClick={() => handleDownload(user.aadhaarPhotoUrl)}>Download</button>
              </div>

              <div className="kyc-document-card">
                <h6>Signature</h6>
                <button onClick={() => handleView(user.signatureUrl)}>View</button>
                <button onClick={() => handleDownload(user.signatureUrl)}>Download</button>
              </div>
            </div>

            <div className="kyc-action-buttons">
              <button className="approve" onClick={() => approveUser(user.customerId)}>
                <FaUserCheck /> Approve
              </button>
              <button className="reject" onClick={() => rejectUser(user.customerId)}>
                <FaBan /> Reject
              </button>
            </div>
          </div>
        ))}

        {showModal && (
          <div className="kyc-modal-overlay">
            <div className="kyc-modal-content">
              <img src={selectedDoc} />
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
