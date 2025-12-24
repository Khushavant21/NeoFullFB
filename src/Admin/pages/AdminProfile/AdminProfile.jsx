import React, { useState, useEffect, useRef } from "react";
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

  const [accessLogs, setAccessLogs] = useState([]);
  const [locationPermissionPrompt, setLocationPermissionPrompt] = useState(false);
  const sessionAdded = useRef(false);

  // Generate a simple session ID to identify this specific browser session
  const getSessionId = () => {
    let id = sessionStorage.getItem("admin_session_id");
    if (!id) {
      id = "sess_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("admin_session_id", id);
    }
    return id;
  };

  const sessionId = getSessionId();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/access-logs/${adminData.email}`);
        if (response.ok) {
          const data = await response.json();
          setAccessLogs(data);
        }
      } catch (error) {
        console.warn("Backend logs not reachable.");
      }
    };

    const recordSession = async () => {
      if (sessionAdded.current) return;
      sessionAdded.current = true;

      try {
        const ua = navigator.userAgent;
        let device = "Windows";
        let browser = "Chrome";

        if (/windows/i.test(ua)) device = "Windows";
        else if (/macintosh|mac os x/i.test(ua)) device = "MacBook";
        else if (/android/i.test(ua)) device = "Android";
        else if (/iphone|ipad|ipod/i.test(ua)) device = "iPhone/iPad";

        if (/chrome|crios/i.test(ua)) browser = "Chrome";
        else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
        else if (/safari/i.test(ua)) browser = "Safari";
        else if (/edg/i.test(ua)) browser = "Edge";

        const deviceInfo = `${device} ${browser}`;

        const logEntry = {
          id: sessionId,
          email: adminData.email,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          device: deviceInfo,
          ip: "Detecting...",
          location: "Detecting...",
          status: "success",
          isIPBased: true
        };

        // Show immediately with placeholders
        setAccessLogs([logEntry]);

        // Helper to update current session log with priority
        const updateCurrentLog = (fields) => {
          setAccessLogs(prev => {
            const currentIdx = prev.findIndex(l => l.id === sessionId);
            if (currentIdx !== -1) {
              const current = prev[currentIdx];
              // Don't overwrite precise with IP-based
              if (!current.isIPBased && fields.isIPBased) return prev;

              const updatedLog = { ...current, ...fields };
              const updatedLogs = [...prev];
              updatedLogs[currentIdx] = updatedLog;

              // Sync to server
              fetch("http://localhost:8080/api/access-logs/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLog)
              }).catch(e => console.warn("Save log fail", e));

              return updatedLogs;
            }
            return prev;
          });
        };

        // Fetch IP-based location (Approximate)
        const fetchIPLocation = async () => {
          try {
            console.log("Fetching IP location...");
            let res = await fetch("https://ipapi.co/json/");
            let data = await res.json();

            if (data.error || !data.ip) {
              res = await fetch("http://ip-api.com/json/");
              data = await res.json();
            }

            if (data) {
              const ip = data.ip || data.query || "Unknown IP";
              const city = data.city || data.region_name || data.region || data.regionName || "";
              const region = data.region_name || data.region || data.regionName || data.country || "";
              const location = city && region ? `${city}, ${region}` : (city || region || "Unknown Location");

              console.log("IP Location detected:", location);
              updateCurrentLog({ ip, location: location.replace("undefined", "Unknown"), isIPBased: true });
            }
          } catch (e) {
            console.warn("IP location fallback fail", e);
            updateCurrentLog({ ip: "Unknown IP", location: "Unknown Location", isIPBased: true });
          }
        };

        if (navigator.geolocation) {
          setLocationPermissionPrompt(true);
          // Try precise location - it handles its own updateCurrentLog logic internally
          requestPreciseLocation();
        }

        // Fetch IP location in parallel/baseline
        fetchIPLocation();
      } catch (error) {
        console.error("Error recording session:", error);
      }
    };

    const saveLogToServer = async (log) => {
      try {
        await fetch("http://localhost:8080/api/access-logs/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(log)
        });
        fetchHistory();
      } catch (error) {
        console.warn("Save log fail", error);
      }
    };

    fetchHistory();
    recordSession();
  }, []);

  const requestPreciseLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
        const data = await res.json();

        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.city_district || "Unknown City";
          const state = data.address.state || data.address.state_district || data.address.country || "Unknown";
          const preciseLocation = `${city}, ${state}`.replace("undefined", "Unknown");

          console.log("Precise Location detected:", preciseLocation);

          setAccessLogs(prev => {
            const currentIdx = prev.findIndex(l => l.id === sessionId);
            if (currentIdx !== -1) {
              const updatedLog = { ...prev[currentIdx], location: preciseLocation, isIPBased: false };
              const updatedLogs = [...prev];
              updatedLogs[currentIdx] = updatedLog;

              // Sync to server
              fetch("http://localhost:8080/api/access-logs/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLog)
              }).catch(e => console.warn("Save log fail", e));

              return updatedLogs;
            }
            return prev;
          });
        }
        setLocationPermissionPrompt(false);
      } catch (e) {
        console.error("Geo update fail", e);
        setLocationPermissionPrompt(false);
      }
    }, (err) => {
      console.warn("Geo denied", err);
      setLocationPermissionPrompt(false);
    }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
  };

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
          {locationPermissionPrompt && (
            <button className="location-allow-btn" onClick={requestPreciseLocation}>
              Enable Precise Location
            </button>
          )}
        </h3>
        <div className="log-list">
          {accessLogs.map((log, i) => (
            <div key={i} className="log-item">
              <div className="log-left">
                <Monitor className="log-icon" />
                <div>
                  <p className="log-device">
                    {log.device} {log.id === sessionId && <span className="current-badge">Current Session</span>}
                  </p>
                  <p className="log-location">
                    {log.location} {log.isIPBased && <span className="approx-text">(Approximate)</span>}
                  </p>
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
