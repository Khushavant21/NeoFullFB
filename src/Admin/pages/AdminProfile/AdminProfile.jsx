// AdminProfile.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  Bell,
  Lock,
  CheckCircle2,
  Briefcase,
  Monitor,
  Clock,
  TrendingUp,
  Users,
  Activity,
  MapPin,
  Globe,
  X,
  Calendar,
  FileText,
  Smartphone,
  Tablet,
  Laptop
} from "lucide-react";
import "./AdminProfile.css";

function AdminProfile() {
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    transactionAlerts: true,
    systemNotifications: true,
    newDeviceLogin: true,
    monthlyStatements: false,
  });

  const adminData = {
    name: "Admin Kumar",
    employeeId: "ADMIN009874",
    role: "Branch Manager",
    department: "Retail Banking",
    email: "admin@neobank.com",
    branch: "Mumbai – Andheri West",
    status: "Active",
    profileImage:
      "https://img.freepik.com/premium-vector/technology-concept-vector-illustration-featuring-consulting-design-flat-style-elements_1226483-4088.jpg?semt=ais_hybrid&w=740&q=80",
  };

  const stats = [
    { label: "Active Sessions", value: "3", icon: Activity, color: "success" },
    { label: "Approvals Pending", value: "12", icon: FileText, color: "warning" },
    { label: "Team Members", value: "24", icon: Users, color: "info" },
    { label: "This Month", value: "156", icon: TrendingUp, color: "primary" },
  ];

  const recentActivity = [
    { action: "Approved transaction #TXN-45891", time: "2 hours ago", type: "success" },
    { action: "Updated security settings", time: "5 hours ago", type: "info" },
    { action: "Generated monthly report", time: "1 day ago", type: "success" },
    { action: "Reviewed customer complaint", time: "2 days ago", type: "warning" },
  ];

  const [loading, setLoading] = useState(true);
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        // Detect OS and Browser
        const userAgent = navigator.userAgent;
        let os = "Unknown OS";
        let browser = "Unknown Browser";
        let deviceType = "Desktop";

        if (userAgent.indexOf("Win") !== -1) os = "Windows";
        if (userAgent.indexOf("Mac") !== -1) os = "macOS";
        if (userAgent.indexOf("Linux") !== -1) os = "Linux";
        if (userAgent.indexOf("Android") !== -1) { os = "Android"; deviceType = "Mobile"; }
        if (userAgent.indexOf("like Mac") !== -1) { os = "iOS"; deviceType = "Mobile"; }

        if (userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
        else if (userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
        else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
        else if (userAgent.indexOf("Edge") !== -1) browser = "Edge";

        // Fetch Location & IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const currentSession = {
          id: "sess_current",
          browser: browser,
          os: os,
          deviceType: deviceType,
          location: {
            city: data.city || "Unknown",
            state: data.region || "Unknown",
            country: data.country_name || "Unknown"
          },
          ip: data.ip || "0.0.0.0",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timezone: data.timezone || "UTC",
          status: "success"
        };

        const previousLogs = [
          {
            id: "sess_2",
            browser: "Safari",
            os: "iOS 17.2",
            deviceType: "Mobile",
            location: {
              city: "Bengaluru",
              state: "Karnataka",
              country: "India"
            },
            ip: "106.51.78.204",
            date: "Dec 28, 2025",
            time: "18:45",
            timezone: "IST",
            status: "success"
          }
        ];

        // Only display 2 logs: Current Session + Most Recent Previous
        setAccessLogs([currentSession, ...previousLogs]);
      } catch (error) {
        console.error("Error fetching session info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionInfo();
  }, []);

  const getDeviceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'mobile': return <Smartphone size={18} />;
      case 'tablet': return <Tablet size={18} />;
      case 'laptop': return <Laptop size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="admin-profile-container">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src={adminData.profileImage}
                alt="Admin Avatar"
                className="admin-avatar"
                onError={(e) => {
                  e.target.src = "https://placehold.co/160x160/900603/ffffff?text=AD";
                }}
              />
              <div className="status-badge">
                <span className="status-ping"></span>
                <span className="status-text">{adminData.status}</span>
              </div>
            </div>
          </div>
          <div className="hero-text">
            <h1 className="admin-name">{adminData.name}</h1>
            <p className="admin-role">{adminData.role}</p>
            <div className="hero-badges">
              <span className="hero-badge">
                <Briefcase size={14} /> {adminData.department}
              </span>
              <span className="hero-badge">
                <MapPin size={14} /> {adminData.branch}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`stat-card stat-card-${stat.color}`}>
              <div className={`stat-icon stat-icon-${stat.color}`}>
                <Icon size={22} />
              </div>
              <div className="stat-content">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Account Information */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">
              <div className="icon-box icon-box-primary">
                <User size={20} />
              </div>
              <h3 className="card-heading">Account Information</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Admin ID</span>
                <span className="info-value">{adminData.employeeId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{adminData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Branch Location</span>
                <span className="info-value">{adminData.branch}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">
              <div className="icon-box icon-box-success">
                <Shield size={20} />
              </div>
              <h3 className="card-heading">Security Settings</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="security-item">
              <div className="security-info">
                <Lock size={18} className="security-icon" />
                <div>
                  <h4 className="security-title">Two-Factor Authentication</h4>
                  <p className="security-desc">Add an extra layer of security</p>
                </div>
              </div>
              <button
                className={`toggle ${twoFactorEnabled ? "toggle-active" : ""}`}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                <div className="toggle-thumb">
                  {twoFactorEnabled && <CheckCircle2 size={12} />}
                </div>
              </button>
            </div>

            <div className="divider"></div>

            <div className="security-item">
              <div className="security-info">
                <Bell size={18} className="security-icon-warning" />
                <div>
                  <h4 className="security-title">Login Alerts</h4>
                  <p className="security-desc">Get notified of new device logins</p>
                </div>
              </div>
              <button
                className={`toggle ${notifications.newDeviceLogin ? "toggle-active" : ""}`}
                onClick={() => handleNotificationToggle('newDeviceLogin')}
              >
                <div className="toggle-thumb">
                  {notifications.newDeviceLogin && <CheckCircle2 size={12} />}
                </div>
              </button>
            </div>

            <button className="change-password-btn">
              <Lock size={16} />
              Change Password
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">
              <div className="icon-box icon-box-info">
                <Activity size={20} />
              </div>
              <h3 className="card-heading">Recent Activity</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="activity-list">
              {recentActivity.map((activity, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot activity-dot-${activity.type}`}></div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">
              <div className="icon-box icon-box-warning">
                <Bell size={20} />
              </div>
              <h3 className="card-heading">Notification Preferences</h3>
            </div>
          </div>
          <div className="card-body">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="notif-item">
                <div>
                  <h4 className="notif-title">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                </div>
                <button
                  className={`toggle ${value ? "toggle-active" : ""}`}
                  onClick={() => handleNotificationToggle(key)}
                >
                  <div className="toggle-thumb">
                    {value && <CheckCircle2 size={12} />}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Access Log - Full Width */}
        <div className="profile-card access-log-card">
          <div className="card-header">
            <div className="card-title">
              <div className="icon-box icon-box-pink">
                <Clock size={20} />
              </div>
              <h3 className="card-heading">Recent Access Log (Last 2)</h3>
            </div>
            <span className="view-all-link" onClick={() => setShowAllLogs(true)}>View All →</span>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Detecting current session details...</p>
              </div>
            ) : (
              <div className="access-list">
                {accessLogs.slice(0, 2).map((log, i) => (
                  <div key={i} className="access-row">
                    <div className="access-info">
                      <div className="device-icon-wrapper">
                        <div className="device-icon">
                          {getDeviceIcon(log.deviceType)}
                        </div>
                      </div>
                      <div className="access-details">
                        <div className="device-header">
                          <p className="access-device">
                            {log.deviceType}
                            {log.id === 'sess_current' && (
                              <span className="current-badge">Current Session</span>
                            )}
                          </p>
                        </div>
                        <div className="location-info">
                          <p className="access-location">
                            <MapPin size={12} />
                            {log.location.city}, {log.location.state}, {log.location.country}
                          </p>
                          <p className="access-ip">
                            <Globe size={12} />
                            {log.ip}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="access-meta">
                      <div className="time-info">
                        <Clock size={14} />
                        <div className="time-details">
                          <p className="access-date">{log.date}</p>
                          <p className="access-time">{log.time} <span className="timezone-tag">{log.timezone}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Access Log Modal */}
      {showAllLogs && (
        <div className="modal-overlay" onClick={() => setShowAllLogs(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">All Access Logs</h3>
              <button className="modal-close-btn" onClick={() => setShowAllLogs(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="access-list">
                {accessLogs.map((log, i) => (
                  <div key={i} className="access-row">
                    <div className="access-info">
                      <div className="device-icon-wrapper">
                        <div className="device-icon">
                          {getDeviceIcon(log.deviceType)}
                        </div>
                      </div>
                      <div className="access-details">
                        <div className="device-header">
                          <p className="access-device">
                            {log.deviceType}
                            {log.id === 'sess_current' && (
                              <span className="current-badge">Current Session</span>
                            )}
                          </p>
                        </div>
                        <div className="location-info">
                          <p className="access-location">
                            <MapPin size={12} />
                            {log.location.city}, {log.location.state}, {log.location.country}
                          </p>
                          <p className="access-ip">
                            <Globe size={12} />
                            {log.ip}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="access-meta">
                      <div className="time-info">
                        <Clock size={14} />
                        <div className="time-details">
                          <p className="access-date">{log.date}</p>
                          <p className="access-time">{log.time} <span className="timezone-tag">{log.timezone}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;