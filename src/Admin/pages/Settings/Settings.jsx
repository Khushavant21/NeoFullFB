import React, { useEffect, useState } from 'react';
import './Settings.css';

const Settings = () => {
  // State to manage form visibility for each section
  const [showGeneralForm, setShowGeneralForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showSecurityForm, setShowSecurityForm] = useState(false);
  const [activeSecurityRec, setActiveSecurityRec] = useState(null);

  // Quick settings state with localStorage persistence
  const [quickSettings, setQuickSettings] = useState({
    biometricLogin: true,
    transactionAlerts: true,
    accountVisibility: false,
    autoLock: true,
  });

  // Photo upload state
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Security features state
  const [securityFeatures, setSecurityFeatures] = useState({
    twoFactorAuth: false,
    biometricLogin: false,
    passwordLastUpdated: null
  });

  // Password update state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Success/error messages
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('adminQuickSettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuickSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (_) {
      // ignore corrupted storage
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('adminQuickSettings', JSON.stringify(quickSettings));
    } catch (_) {
      // ignore quota errors
    }
  }, [quickSettings]);

  const handleToggle = (key) => (e) => {
    const next = e.target.checked;
    setQuickSettings((prev) => ({ ...prev, [key]: next }));
  };

  // Photo upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Security feature handlers
  const handleEnable2FA = () => {
    setSecurityFeatures(prev => ({ ...prev, twoFactorAuth: true }));
    setSecurityMessage({ type: 'success', text: 'Two-Factor Authentication has been enabled successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleDisable2FA = () => {
    setSecurityFeatures(prev => ({ ...prev, twoFactorAuth: false }));
    setSecurityMessage({ type: 'success', text: 'Two-Factor Authentication has been disabled.' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleEnableBiometric = () => {
    setSecurityFeatures(prev => ({ ...prev, biometricLogin: true }));
    setSecurityMessage({ type: 'success', text: 'Biometric Login has been enabled successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleDisableBiometric = () => {
    setSecurityFeatures(prev => ({ ...prev, biometricLogin: false }));
    setSecurityMessage({ type: 'success', text: 'Biometric Login has been disabled.' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match!' });
      setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setSecurityMessage({ type: 'error', text: 'Password must be at least 8 characters long!' });
      setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Simulate password update
    setSecurityFeatures(prev => ({ ...prev, passwordLastUpdated: new Date().toISOString() }));
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSecurityMessage({ type: 'success', text: 'Password updated successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  // Handlers for toggling forms
  const toggleGeneralForm = () => setShowGeneralForm(!showGeneralForm);
  const togglePersonalForm = () => setShowPersonalForm(!showPersonalForm);
  const toggleSecurityForm = () => setShowSecurityForm(!showSecurityForm);

  return (
    <div className="admin-settings-wrapper">
      {/* Admin Header */}
      <header className="admin-settings-header">
        <div className="admin-header-content">
          <h1 className="admin-settings-title">Admin Settings</h1>
          <p className="admin-settings-subtitle">Manage your preferences and security</p>
        </div>
      </header>

      {/* Settings Grid */}
      <div className="admin-settings-grid">
        <div className="admin-settings-card admin-card-general">
          <div className="admin-card-header">
            <div className="admin-card-icon admin-icon-general">⚙️</div>
            <h2 className="admin-card-title">General Settings</h2>
          </div>
          <p className="admin-card-description">App preferences, language, and display settings</p>
          <button className="admin-configure-btn" onClick={toggleGeneralForm}>
            Configure
          </button>
          {showGeneralForm && (
            <div className="admin-settings-form">
              <h3 className="admin-form-title">Edit General Settings</h3>
              <form className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Username / Display Name</label>
                  <input className="admin-form-input" type="text" placeholder="Enter username" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Language Preferences</label>
                  <select className="admin-form-select">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Timezone / Region</label>
                  <select className="admin-form-select">
                    <option value="IST">India Standard Time (UTC+5:30)</option>
                    <option value="PST">Pacific Standard Time (UTC-8:00)</option>
                    <option value="GMT">Greenwich Mean Time (UTC+0:00)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Notifications Preferences</label>
                  <select className="admin-form-select">
                    <option value="all">All Notifications</option>
                    <option value="important">Important Only</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">App/Theme Preferences</label>
                  <select className="admin-form-select">
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-cancel" onClick={toggleGeneralForm}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-save">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="admin-settings-card admin-card-personal">
          <div className="admin-card-header">
            <div className="admin-card-icon admin-icon-personal">👤</div>
            <h2 className="admin-card-title">Personal Details</h2>
          </div>
          <p className="admin-card-description">Update your profile information and contact details</p>
          <button className="admin-configure-btn" onClick={togglePersonalForm}>
            Configure
          </button>
          {showPersonalForm && (
            <div className="admin-settings-form">
              <h3 className="admin-form-title">Edit Personal Details</h3>
              <form className="admin-form">
                <div className="admin-form-group admin-photo-group">
                  <label className="admin-form-label">Profile Photo</label>
                  <div className="admin-photo-upload">
                    <input 
                      type="file" 
                      id="admin-photo-upload" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      style={{display: 'none'}} 
                    />
                    <label htmlFor="admin-photo-upload" className="admin-photo-upload-btn">
                      <div className="admin-upload-icon">📷</div>
                      <span>Upload Photo</span>
                    </label>
                    {photoPreview && (
                      <div className="admin-photo-preview">
                        <img src={photoPreview} alt="Profile preview" className="admin-preview-img" />
                        <button 
                          type="button" 
                          className="admin-remove-photo-btn"
                          onClick={() => {
                            setPhotoPreview(null);
                            setProfilePhoto(null);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name</label>
                  <input className="admin-form-input" type="text" placeholder="Enter full name" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Email ID</label>
                  <input className="admin-form-input" type="email" placeholder="Enter email" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Phone Number</label>
                  <input className="admin-form-input" type="tel" placeholder="Enter phone number" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Date of Birth</label>
                  <input className="admin-form-input" type="date" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Address (Optional)</label>
                  <textarea className="admin-form-textarea" placeholder="Enter address"></textarea>
                </div>
                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-cancel" onClick={togglePersonalForm}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-save">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="admin-settings-card admin-card-security">
          <div className="admin-card-header">
            <div className="admin-card-icon admin-icon-security">🛡️</div>
            <h2 className="admin-card-title">Security</h2>
          </div>
          <p className="admin-card-description">Password, 2FA, and security preferences</p>
          <button className="admin-configure-btn" onClick={toggleSecurityForm}>
            Configure
          </button>
          {showSecurityForm && (
            <div className="admin-settings-form">
              <h3 className="admin-form-title">Edit Security Settings</h3>
              <form className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Password Reset / Change Password</label>
                  <input className="admin-form-input" type="password" placeholder="Enter new password" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Confirm New Password</label>
                  <input className="admin-form-input" type="password" placeholder="Confirm new password" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Two-Factor Authentication (2FA)</label>
                  <select className="admin-form-select">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Security Questions</label>
                  <select className="admin-form-select">
                    <option value="q1">What is your pet's name?</option>
                    <option value="q2">What is your favorite book?</option>
                    <option value="q3">What is your mother's maiden name?</option>
                  </select>
                  <input className="admin-form-input" type="text" placeholder="Enter answer" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Login Activity / Sessions</label>
                  <p className="admin-form-help-text">View and manage active sessions</p>
                  <button type="button" className="admin-btn-secondary">View Sessions</button>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Account Recovery Options</label>
                  <input className="admin-form-input" type="email" placeholder="Recovery email" />
                  <input className="admin-form-input" type="tel" placeholder="Recovery phone number" />
                </div>
                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-cancel" onClick={toggleSecurityForm}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-save">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Quick Settings Section */}
      <section className="admin-quick-settings">
        <h2 className="admin-section-title">Quick Settings</h2>
        <p className="admin-section-description">Frequently used settings for quick access</p>

        <div className="admin-quick-toggles">
          <div className="admin-toggle-item">
            <div className="admin-toggle-icon admin-icon-fingerprint">👆</div>
            <label className="admin-toggle-label">Biometric Login</label>
            <label className="admin-switch">
              <input type="checkbox" checked={quickSettings.biometricLogin} onChange={handleToggle('biometricLogin')} />
              <span className="admin-slider"></span>
            </label>
          </div>

          <div className="admin-toggle-item">
            <div className="admin-toggle-icon admin-icon-bell">🔔</div>
            <label className="admin-toggle-label">Transaction Alerts</label>
            <label className="admin-switch">
              <input type="checkbox" checked={quickSettings.transactionAlerts} onChange={handleToggle('transactionAlerts')} />
              <span className="admin-slider"></span>
            </label>
          </div>

          <div className="admin-toggle-item">
            <div className="admin-toggle-icon admin-icon-eye">👁️</div>
            <label className="admin-toggle-label">Account Visibility</label>
            <label className="admin-switch">
              <input type="checkbox" checked={quickSettings.accountVisibility} onChange={handleToggle('accountVisibility')} />
              <span className="admin-slider"></span>
            </label>
          </div>

          <div className="admin-toggle-item">
            <div className="admin-toggle-icon admin-icon-lock">🔒</div>
            <label className="admin-toggle-label">Auto Lock</label>
            <label className="admin-switch">
              <input type="checkbox" checked={quickSettings.autoLock} onChange={handleToggle('autoLock')} />
              <span className="admin-slider"></span>
            </label>
          </div>
        </div>

        {/* Account Information */}
        <div className="admin-account-info">
          <h3 className="admin-subsection-title">Account Information and Status</h3>
          <p className="admin-subsection-description">Overview of your account settings and status</p>

          <div className="admin-status-table">
            <div className="admin-status-row">
              <span className="admin-status-label">Account Status</span>
              <span className="admin-status-value admin-status-active">Active</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Last Login</span>
              <span className="admin-status-value">Today 10:30 AM</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">KYC Status</span>
              <span className="admin-status-value admin-status-verified">Verified</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Mobile Verified</span>
              <span className="admin-status-value admin-status-yes">Yes</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Two-Factor Auth</span>
              <span className="admin-status-value admin-status-enabled">Enabled</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Email Verified</span>
              <span className="admin-status-value admin-status-yes">Yes</span>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="admin-security-recs">
          <h3 className="admin-subsection-title">Security Recommendations</h3>
          <p className="admin-subsection-description">Improve your account security with these suggestions</p>
          <div className="admin-recs-list">
            <div className="admin-rec-item-container">
              <button
                type="button"
                className={`admin-rec-item admin-rec-button ${activeSecurityRec === '2fa' ? 'admin-rec-active' : ''}`}
                onClick={() => setActiveSecurityRec(activeSecurityRec === '2fa' ? null : '2fa')}
                aria-pressed={activeSecurityRec === '2fa'}
              >
                <div className="admin-rec-icon">🔐</div>
                <div className="admin-rec-content">
                  <span className="admin-rec-title">Enable Two-Factor Authentication</span>
                  <span className="admin-rec-description">Add an extra layer of security to your account</span>
                </div>
              </button>
              {activeSecurityRec === '2fa' && (
                <div className="admin-rec-panel">
                  <h4 className="admin-panel-title">Two-Factor Authentication</h4>
                  <p className="admin-panel-text">
                    Add an extra layer of security to your account by enabling 2FA. 
                    You'll receive a verification code via SMS or authenticator app when signing in.
                  </p>
                  <div className="admin-security-status">
                    Status: <span className={`admin-status-badge ${securityFeatures.twoFactorAuth ? 'admin-badge-enabled' : 'admin-badge-disabled'}`}>
                      {securityFeatures.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="admin-security-actions">
                    {securityFeatures.twoFactorAuth ? (
                      <button className="admin-btn-disable" onClick={handleDisable2FA}>
                        Disable 2FA
                      </button>
                    ) : (
                      <button className="admin-btn-enable" onClick={handleEnable2FA}>
                        Enable 2FA
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="admin-rec-item-container">
              <button
                type="button"
                className={`admin-rec-item admin-rec-button ${activeSecurityRec === 'password' ? 'admin-rec-active' : ''}`}
                onClick={() => setActiveSecurityRec(activeSecurityRec === 'password' ? null : 'password')}
                aria-pressed={activeSecurityRec === 'password'}
              >
                <div className="admin-rec-icon">🔑</div>
                <div className="admin-rec-content">
                  <span className="admin-rec-title">Update Password</span>
                  <span className="admin-rec-description">Use a strong, unique password and change it regularly</span>
                </div>
              </button>
              {activeSecurityRec === 'password' && (
                <div className="admin-rec-panel">
                  <h4 className="admin-panel-title">Update Your Password</h4>
                  <p className="admin-panel-text">
                    Use a strong, unique password and change it regularly. Avoid reusing passwords across services.
                    Consider using a password manager to keep credentials secure.
                  </p>
                  {securityFeatures.passwordLastUpdated && (
                    <div className="admin-security-status">
                      Last Updated: <span className="admin-status-badge admin-badge-enabled">
                        {new Date(securityFeatures.passwordLastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <form onSubmit={handlePasswordUpdate} className="admin-password-form">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Current Password</label>
                      <input 
                        className="admin-form-input"
                        type="password" 
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">New Password</label>
                      <input 
                        className="admin-form-input"
                        type="password" 
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        required
                        minLength="8"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Confirm New Password</label>
                      <input 
                        className="admin-form-input"
                        type="password" 
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button type="submit" className="admin-btn-update">
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            <div className="admin-rec-item-container">
              <button
                type="button"
                className={`admin-rec-item admin-rec-button ${activeSecurityRec === 'biometric' ? 'admin-rec-active' : ''}`}
                onClick={() => setActiveSecurityRec(activeSecurityRec === 'biometric' ? null : 'biometric')}
                aria-pressed={activeSecurityRec === 'biometric'}
              >
                <div className="admin-rec-icon">👆</div>
                <div className="admin-rec-content">
                  <span className="admin-rec-title">Enable Biometric Login</span>
                  <span className="admin-rec-description">Use fingerprint or face recognition for secure access</span>
                </div>
              </button>
              {activeSecurityRec === 'biometric' && (
                <div className="admin-rec-panel">
                  <h4 className="admin-panel-title">Biometric Login</h4>
                  <p className="admin-panel-text">
                    Turn on fingerprint or face recognition to sign in quickly and securely.
                    Your biometric data never leaves your device; we store only a token to verify you.
                  </p>
                  <div className="admin-security-status">
                    Status: <span className={`admin-status-badge ${securityFeatures.biometricLogin ? 'admin-badge-enabled' : 'admin-badge-disabled'}`}>
                      {securityFeatures.biometricLogin ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="admin-security-actions">
                    {securityFeatures.biometricLogin ? (
                      <button className="admin-btn-disable" onClick={handleDisableBiometric}>
                        Disable Biometric
                      </button>
                    ) : (
                      <button className="admin-btn-enable" onClick={handleEnableBiometric}>
                        Enable Biometric
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Security Message Display */}
          {securityMessage.text && (
            <div className={`admin-security-message ${securityMessage.type === 'success' ? 'admin-message-success' : 'admin-message-error'}`}>
              {securityMessage.text}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;