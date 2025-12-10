import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Lock,
  Camera,
  CheckCircle2,
  XCircle,
  Building2,
  Briefcase,
  AlertCircle,
  Monitor,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import "./AdminProfile.css";

function AdminProfile() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    transactionAlerts: true,
    systemNotifications: true,
    newDeviceLogin: true,
    monthlyStatements: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const adminData = {
    name: "Admin",
    employeeId: "ADMIN009874",
    role: "Branch Manager",
    department: "Retail Banking",
    email: "admin@neobank.com",
    phone: "+91-9876543210",
    branch: "Mumbai – Andheri West",
    profileImage:
      "https://img.freepik.com/premium-vector/technology-concept-vector-illustration-featuring-consulting-design-flat-style-elements_1226483-4088.jpg?semt=ais_hybrid&w=740&q=80",
  };

  const accessLogs = [
    { date: "2025-10-09", time: "09:15 AM", device: "Windows Chrome", ip: "192.168.1.45", location: "Mumbai, MH", status: "success" },
    { date: "2025-10-08", time: "02:30 PM", device: "MacBook Safari", ip: "192.168.1.45", location: "Mumbai, MH", status: "success" },
    { date: "2025-10-07", time: "10:45 AM", device: "Android App", ip: "103.212.45.89", location: "Thane, MH", status: "success" },
    { date: "2025-10-06", time: "08:20 PM", device: "Windows Firefox", ip: "103.212.45.90", location: "Unknown", status: "failed" },
  ];

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password updated successfully ✅");
    setShowModal(false);
  };

  return (
    <main className="admin-main">
      <h2 className="page-title">My Account</h2>
      <p className="page-sub">Manage your account information and security preferences</p>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header"></div>
        <div className="profile-body">
          <div className="profile-top">
            <div className="profile-pic-wrapper">
              <img
                src={adminData.profileImage}
                alt="Profile"
                className="profile-pic"
                onError={(e) => {
                  e.target.src = "https://placehold.co/160x160/cccccc/333333?text=AR";
                }}
              />
              <button className="change-photo">
                <Camera size={20} />
                <span>Change Photo</span>
              </button>
            </div>
            <div className="profile-actions">
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <Lock size={16} /> Change Password
              </button>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <User className="info-icon blue" />
              <div>
                <p className="info-label">Admin ID</p>
                <p className="info-value">{adminData.employeeId}</p>
              </div>
            </div>
            <div className="info-card">
              <Mail className="info-icon purple" />
              <div>
                <p className="info-label">Email Address</p>
                <p className="info-value">{adminData.email}</p>
              </div>
            </div>
            <div className="info-card">
              <Phone className="info-icon green" />
              <div>
                <p className="info-label">Phone Number</p>
                <p className="info-value">{adminData.phone}</p>
              </div>
            </div>
            <div className="info-card">
              <Briefcase className="info-icon orange" />
              <div>
                <p className="info-label">Department</p>
                <p className="info-value">{adminData.department}</p>
              </div>
            </div>
            <div className="info-card">
              <Building2 className="info-icon teal" />
              <div>
                <p className="info-label">Branch Location</p>
                <p className="info-value">{adminData.branch}</p>
              </div>
            </div>
            <div className="info-card twofactor">
              <Shield className="info-icon red" />
              <div>
                <p className="info-label">Two-Factor Authentication</p>
                <p className="info-desc">Extra security layer</p>
              </div>
              <button
                className={`toggle-btn ${twoFactorEnabled ? "on" : "off"}`}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                <span className="toggle-circle">
                  {twoFactorEnabled && <CheckCircle2 size={14} color="#900603" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="section-card">
        <h3 className="section-title">
          <Clock size={18} /> Access Log
        </h3>
        <div className="log-list">
          {accessLogs.map((log, i) => (
            <div key={i} className="log-item">
              <div className="log-left">
                <Monitor className="log-icon" />
                <div>
                  <p className="log-device">{log.device}</p>
                  <p className="log-location">{log.location}</p>
                </div>
              </div>
              <div className="log-right">
                <p className="log-time">
                  {log.date} • {log.time}
                </p>
                <div className="log-status">
                  <span>{log.ip}</span>
                  {log.status === "success" ? (
                    <CheckCircle2 size={14} color="green" />
                  ) : (
                    <XCircle size={14} color="red" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="section-card">
        <h3 className="section-title">
          <Bell size={18} /> Notification Preferences
        </h3>
        <div className="notif-list">
          {[
            { key: "transactionAlerts", label: "Transaction Alerts", desc: "Get notified about all transactions" },
            { key: "systemNotifications", label: "System Notifications", desc: "Important system updates" },
            { key: "newDeviceLogin", label: "New Device Login", desc: "Alert when logging from new device" },
            { key: "monthlyStatements", label: "Monthly Statement Emails", desc: "Receive monthly reports via email" },
          ].map((item) => (
            <div key={item.key} className="notif-item-row">
              <div className="notif-text">
                <p className="notif-label">{item.label}</p>
                <p className="notif-desc">{item.desc}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationToggle(item.key)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Note */}
      <div className="security-note">
        <AlertCircle size={18} />
        <div>
          <p className="note-title">Security Reminder</p>
          <p className="note-text">
            Never share your login credentials with anyone. Bank administrators will never ask for your password.
          </p>
        </div>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>
                <Lock size={16} /> Update Password
              </h4>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <XCircle size={18} />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Old Password</label>
                <div className="password-wrapper">
                  <input type={showOldPass ? "text" : "password"} required placeholder="Enter old password" />
                  <button type="button" onClick={() => setShowOldPass(!showOldPass)}>
                    {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="password-wrapper">
                  <input type={showNewPass ? "text" : "password"} required placeholder="Enter new password" />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)}>
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-wrapper">
                  <input type={showConfirmPass ? "text" : "password"} required placeholder="Re-enter new password" />
                  <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Update Password</button>
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminProfile;
