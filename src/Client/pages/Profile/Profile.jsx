// src/components/ProfileSection.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  User, Settings, CreditCard, Shield, Bell, Eye, EyeOff, Camera,
  Phone, Mail, MapPin, Calendar, DollarSign, TrendingUp, Clock,
  Download, RefreshCw, Zap, Plus, Trash2, X, Lock, Key, UserCheck,
  Smartphone, Wifi, Home, Film, Heart, CheckCircle, AlertCircle,
  PauseCircle, Edit3, ArrowUpRight, ArrowDownLeft, ChevronRight
} from "lucide-react";
import './Profile.css';
import BASE_URL from '../../../api/apiConfig';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="ps-modal-overlay" role="dialog" aria-modal="true">
      <div className="ps-modal-dialog">
        <div className="ps-modal-content">
          <div className="ps-modal-header">
            <h5 className="ps-modal-title">{title}</h5>
            <button type="button" className="ps-modal-close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <div className="ps-modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    currentPin: '',
    newPin: '',
    confirmPin: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    aadhaar: ''
  });
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    accountNumber: '****1234',
    accountType: 'Premium Savings',
    balance: 48748.00,
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    gender: '',
    aadhaar: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        alert('No user email found. Please login again.');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/auth/profile?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userData = await response.json();

        // Helper to construct full image URL
        const getFullImageUrl = (path) => {
          if (!path) return 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
          if (path.startsWith('http')) return path;
          const baseUrl = 'http://localhost:8080';
          return `${baseUrl}${path}`;
        };

        setUser(prev => ({
          ...prev,
          name: userData.fullName || '',
          email: userData.email || '',
          phone: userData.mobile || '',
          dateOfBirth: userData.dob || '',
          gender: userData.gender || '',
          address: userData.address || '',
          profileImage: getFullImageUrl(userData.profileImageUrl),
          aadhaar: userData.aadhaar || ''
        }));
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to load user profile');
      }
    };

    fetchUserProfile();
  }, []);
  const [autoDebits, setAutoDebits] = useState([
    { id: 1, name: 'Electricity Bill - MSEB', category: 'utilities', amount: 2500, frequency: 'Monthly', nextDate: '2025-02-05', status: 'active', icon: Zap },
    { id: 2, name: 'Mobile Postpaid - Airtel', category: 'telecom', amount: 999, frequency: 'Monthly', nextDate: '2025-02-10', status: 'active', icon: Smartphone },
    { id: 3, name: 'Home Loan EMI - HDFC', category: 'loans', amount: 45000, frequency: 'Monthly', nextDate: '2025-02-07', status: 'active', icon: Home },
    { id: 4, name: 'Netflix Subscription', category: 'entertainment', amount: 645, frequency: 'Monthly', nextDate: '2025-02-15', status: 'active', icon: Film },
    { id: 5, name: 'Life Insurance Premium', category: 'insurance', amount: 12000, frequency: 'Quarterly', nextDate: '2025-03-01', status: 'active', icon: Heart }
  ]);
  const recentTransactions = [
    { id: 1, type: 'credit', amount: 5000, description: 'Salary Credit', date: '2025-01-15', time: '09:30 AM' },
    { id: 2, type: 'debit', amount: 1200, description: 'Online Shopping', date: '2025-01-14', time: '02:15 PM' },
    { id: 3, type: 'debit', amount: 800, description: 'Utility Bills', date: '2025-01-13', time: '11:45 AM' },
    { id: 4, type: 'credit', amount: 2500, description: 'Investment Return', date: '2025-01-12', time: '04:20 PM' }
  ];
  const loginActivity = [
    { id: 1, device: 'Mobile App', location: 'Delhi, India', time: 'Yesterday, 10:00 PM', status: 'success' },
    { id: 2, device: 'Web Browser', location: 'Mumbai, India', time: '2 days ago, 09:15 AM', status: 'success' },
    { id: 3, device: 'Tablet', location: 'Mumbai, India', time: '3 days ago, 03:45 PM', status: 'failed' }
  ];
  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'account', name: 'Account Details', icon: CreditCard },
    { id: 'auto-debit', name: 'Auto Debit Management', icon: RefreshCw },
    { id: 'security', name: 'Security Settings', icon: Shield },
    { id: 'settings', name: 'Application & Communication Settings', icon: Settings }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setActiveModal(null);
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handlePinChange = () => {
    if (formData.newPin !== formData.confirmPin) {
      alert('New PINs do not match!');
      return;
    }
    if (formData.newPin.length !== 4 || isNaN(formData.newPin)) {
      alert('PIN must be exactly 4 digits!');
      return;
    }
    alert('Transaction PIN changed successfully!');
    setActiveModal(null);
    setFormData(prev => ({ ...prev, currentPin: '', newPin: '', confirmPin: '' }));
  };

  const handleProfileEdit = () => {
    setFormData(prev => ({
      ...prev,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      aadhaar: user.aadhaar
    }));
    setActiveModal('edit-profile');
  };

  const handleProfileUpdate = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/profile/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.name,
          mobile: formData.phone,
          address: formData.address,
          dob: formData.dateOfBirth,
          gender: formData.gender,
          aadhaar: formData.aadhaar
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setUser(prev => ({
        ...prev,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        aadhaar: formData.aadhaar
      }));
      alert('Profile updated successfully!');

      // Update localStorage and trigger event for Navbar update
      localStorage.setItem("userFullName", formData.name);
      window.dispatchEvent(new Event("userProfileUpdate"));

      setActiveModal(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'transfer':
        alert('Redirecting to Money Transfer...');
        break;
      case 'statement':
        alert('Downloading account statement...');
        break;
      case 'investments':
        alert('Opening investment portfolio...');
        break;
      case 'auto-debit':
        setActiveTab('auto-debit');
        break;
      default:
        break;
    }
  };

  const handleAutoDebitAction = (action, debitId) => {
    switch (action) {
      case 'add':
        alert('Opening Add New Auto Debit form...');
        break;
      case 'edit':
        alert(`Editing Auto Debit ID: ${debitId}`);
        break;
      case 'pause':
        setAutoDebits(prev => prev.map(debit =>
          debit.id === debitId
            ? { ...debit, status: debit.status === 'active' ? 'paused' : 'active' }
            : debit
        ));
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this auto debit?')) {
          setAutoDebits(prev => prev.filter(debit => debit.id !== debitId));
        }
        break;
      default:
        break;
    }
  };

  const handleSettingToggle = (setting) => {
    alert(`Toggling setting: ${setting}`);
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        alert('No user email found. Please login again.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', email);

      try {
        const response = await fetch(`${BASE_URL}/auth/profile/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();

        // Update user state immediately with the new URL
        const baseUrl = 'http://localhost:8080';
        const newImageUrl = result.profileImageUrl.startsWith('http')
          ? result.profileImageUrl
          : `${baseUrl}${result.profileImageUrl}`;

        setUser(prev => ({
          ...prev,
          profileImage: newImageUrl
        }));

        alert('Profile image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload profile image');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };



  return (
    <>
      <div className="ps-page-wrap">
        {/* Header */}
        <header className="ps-header-fullwidth">
          <div className="ps-header-inner">
            <div className="ps-profile-block">
              <div className="ps-avatar-wrap" onClick={triggerFileInput}>
                <img src={user.profileImage} alt="Profile" className="ps-avatar" />
                <div className="ps-avatar-edit-btn">
                  <Camera size={16} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="ps-user-summary">
                <h1 className="ps-user-name">{user.name}</h1>
                <p className="ps-user-account-type">Savings Account</p>
                <p className="ps-user-email">{user.email}</p>
              </div>
            </div>
            <div className="ps-balance-block">
              <div className="ps-balance-label">
                <span>Available Balance</span>
                <button
                  className="ps-toggle-balance-btn"
                  onClick={() => setShowBalance(!showBalance)}
                  aria-pressed={showBalance}
                >
                  {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div className="ps-balance-amount">
                {showBalance ? formatCurrency(user.balance) : '••••••'}
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <nav className="ps-tabs-wrap">
          <ul className="ps-tabs">
            {tabs.map(tab => (
              <li key={tab.id} className="ps-tab-item">
                <button
                  className={`ps-tab-btn ${activeTab === tab.id ? 'ps-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={activeTab === tab.id}
                >
                  <span className="ps-tab-icon">
                    {React.createElement(tab.icon, { size: 18 })}
                  </span>
                  <span className="ps-tab-label">{tab.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="ps-main">
          <div className="ps-grid">
            {activeTab === 'overview' && (
              <>
                <section className="ps-card ps-card-large">
                  <div className="ps-card-header">
                    <h2>Personal Information</h2>
                    <button className="ps-link-edit" onClick={handleProfileEdit}>
                      <Edit3 size={16} /> Edit
                    </button>
                  </div>
                  <div className="ps-card-body">
                    <div className="ps-row">
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <User size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Full Name</div>
                            <div className="ps-info-value">{user.name}</div>
                          </div>
                        </div>
                      </div>
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <Mail size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Email Address</div>
                            <div className="ps-info-value">{user.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ps-row">
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <Phone size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Phone Number</div>
                            <div className="ps-info-value">{user.phone}</div>
                          </div>
                        </div>
                      </div>
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <Calendar size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Date of Birth</div>
                            <div className="ps-info-value">{user.dateOfBirth}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ps-row">
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <UserCheck size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Gender</div>
                            <div className="ps-info-value" style={{ textTransform: 'capitalize' }}>{user.gender}</div>
                          </div>
                        </div>
                      </div>
                      <div className="ps-col">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <Shield size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Aadhaar Number</div>
                            <div className="ps-info-value">{user.aadhaar || 'Not updated'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ps-row">
                      <div className="ps-col-full">
                        <div className="ps-info-item">
                          <div className="ps-info-icon">
                            <MapPin size={20} />
                          </div>
                          <div className="ps-info-text">
                            <div className="ps-info-label">Address</div>
                            <div className="ps-info-value">{user.address}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="ps-card ps-card-quickactions">
                  <h3>Quick Actions</h3>
                  <div className="ps-quick-grid">
                    <button className="ps-quick-btn" onClick={() => handleQuickAction('transfer')}>
                      <DollarSign size={18} /> Transfer Money
                    </button>
                    <button className="ps-quick-btn" onClick={() => handleQuickAction('auto-debit')}>
                      <RefreshCw size={18} /> Manage Auto Debit
                    </button>
                    <button className="ps-quick-btn" onClick={() => handleQuickAction('statement')}>
                      <Download size={18} /> Download Statement
                    </button>
                    <button className="ps-quick-btn" onClick={() => handleQuickAction('investments')}>
                      <TrendingUp size={18} /> View Investments
                    </button>
                  </div>
                </aside>

                <section className="ps-card ps-card-transactions">
                  <div className="ps-card-header">
                    <h3>Recent Transactions</h3>
                    <button className="ps-link-small" onClick={() => alert('Showing all transactions')}>
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="ps-card-body">
                    <div className="ps-transaction-list">
                      {recentTransactions.map(tx => (
                        <div key={tx.id} className="ps-transaction-item">
                          <div className="ps-transaction-left">
                            <div className={`ps-transaction-icon ${tx.type === 'credit' ? 'ps-credit' : 'ps-debit'}`}>
                              {tx.type === 'credit' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                            </div>
                            <div>
                              <div className="ps-transaction-title">{tx.description}</div>
                              <div className="ps-transaction-meta">
                                <Calendar size={14} /> {tx.date} • <Clock size={14} /> {tx.time}
                              </div>
                            </div>
                          </div>
                          <div className={`ps-transaction-amount ${tx.type === 'credit' ? 'ps-text-success' : 'ps-text-danger'}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'account' && (
              <section className="ps-card ps-card-fullwidth">
                <h2>Account Details</h2>
                <div className="ps-fullwidth-grid">
                  <div className="ps-fullwidth-col">
                    <div className="ps-summary ps-gradient">
                      <h4>Account Information</h4>
                      <div className="ps-summary-item">
                        <div className="ps-summary-label">Account Number</div>
                        <div className="ps-summary-value font-mono">{user.accountNumber}</div>
                      </div>
                      <div className="ps-summary-item">
                        <div className="ps-summary-label">Account Type</div>
                        <div className="ps-summary-value">{user.accountType}</div>
                      </div>
                      <div className="ps-summary-item">
                        <div className="ps-summary-label">Branch</div>
                        <div className="ps-summary-value">Mumbai Central</div>
                      </div>
                    </div>
                  </div>

                  <div className="ps-fullwidth-col">
                    <div className="ps-summary ps-light">
                      <h4>Banking Services</h4>
                      <div className="ps-summary-item"><span>Internet Banking</span><strong>Active</strong></div>
                      <div className="ps-summary-item"><span>Mobile Banking</span><strong>Active</strong></div>
                      <div className="ps-summary-item"><span>SMS Alerts</span><strong>Enabled</strong></div>
                      <div className="ps-summary-item"><span>Email Notifications</span><strong>Enabled</strong></div>
                    </div>
                  </div>

                  <div className="ps-fullwidth-col">
                    <div className="ps-summary ps-light">
                      <h4>Account Limits</h4>
                      <div className="ps-summary-item"><span>Daily Transfer Limit</span><strong>₹1,00,000</strong></div>
                      <div className="ps-summary-item"><span>ATM Withdrawal Limit</span><strong>₹50,000</strong></div>
                      <div className="ps-summary-item"><span>Online Purchase Limit</span><strong>₹2,00,000</strong></div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'auto-debit' && (
              <section className="ps-card ps-card-fullwidth">
                <div className="ps-card-header">
                  <h2>Auto Debit Management</h2>
                  <button className="ps-btn-small" onClick={() => handleAutoDebitAction('add')}>
                    <Plus size={18} /> Add New
                  </button>
                </div>

                <div className="ps-fullwidth-grid ps-summary-cards">
                  <div className="ps-fullwidth-col">
                    <div className="ps-stat ps-gradient">
                      <div className="ps-stat-icon">
                        <RefreshCw size={24} />
                      </div>
                      <div>
                        <div className="ps-stat-label">Active Auto Debits</div>
                        <div className="ps-stat-value">{autoDebits.filter(d => d.status === 'active').length}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ps-fullwidth-col">
                    <div className="ps-stat ps-light">
                      <div className="ps-stat-icon">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <div className="ps-stat-label">Monthly Total</div>
                        <div className="ps-stat-value">
                          {formatCurrency(autoDebits.filter(d => d.status === 'active' && d.frequency === 'Monthly').reduce((sum, d) => sum + d.amount, 0))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ps-fullwidth-col">
                    <div className="ps-stat ps-light">
                      <div className="ps-stat-icon">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <div className="ps-stat-label">Next Payment</div>
                        <div className="ps-stat-value">Feb 01, 2025</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ps-autodebit-list">
                  {autoDebits.map(debit => (
                    <div key={debit.id} className="ps-autodebit-item">
                      <div className="ps-autodebit-left">
                        <div className="ps-autodebit-icon">
                          {React.createElement(debit.icon, { size: 20 })}
                        </div>
                        <div>
                          <div className="ps-autodebit-name">{debit.name}</div>
                          <div className="ps-autodebit-meta">{formatCurrency(debit.amount)} • {debit.frequency} • Next: {debit.nextDate}</div>
                        </div>
                      </div>
                      <div className="ps-autodebit-right">
                        <span className={`ps-badge ${debit.status === 'active' ? 'ps-success' : debit.status === 'paused' ? 'ps-warning' : 'ps-danger'}`}>
                          {debit.status === 'active' ? <CheckCircle size={14} /> : debit.status === 'paused' ? <PauseCircle size={14} /> : <AlertCircle size={14} />}
                          {debit.status === 'active' ? ' Active' : debit.status === 'paused' ? ' Paused' : ' ' + debit.status}
                        </span>
                        <div className="ps-action-group">
                          <button className="ps-icon-btn" title="Edit" onClick={() => handleAutoDebitAction('edit', debit.id)}>
                            <Edit3 size={16} />
                          </button>
                          <button className="ps-icon-btn" title={debit.status === 'active' ? 'Pause' : 'Resume'} onClick={() => handleAutoDebitAction('pause', debit.id)}>
                            {debit.status === 'active' ? <PauseCircle size={16} /> : <CheckCircle size={16} />}
                          </button>
                          <button className="ps-icon-btn ps-danger" title="Delete" onClick={() => handleAutoDebitAction('delete', debit.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'security' && (
              <section className="ps-card ps-card-fullwidth">
                <h2>Security Settings</h2>
                <div className="ps-fullwidth-grid">
                  <div className="ps-fullwidth-col">
                    <div className="ps-security-item">
                      <div className="ps-security-head">
                        <h4>Two-Factor Authentication</h4>
                        <span className="ps-badge ps-success">Enabled</span>
                      </div>
                      <p className="ps-text-muted">Add an extra layer of security to your account</p>
                      <button className="ps-link-small">Manage Settings</button>
                    </div>

                    <div className="ps-security-item">
                      <div className="ps-security-head">
                        <h4>Login Password</h4>
                        <span className="ps-text-muted small">Last updated 30 days ago</span>
                      </div>
                      <p className="ps-text-muted">Keep your password strong and unique</p>
                      <button className="ps-link-small" onClick={() => setActiveModal('change-password')}>
                        Change Password
                      </button>
                    </div>

                    <div className="ps-security-item">
                      <div className="ps-security-head">
                        <h4>Transaction PIN</h4>
                        <span className="ps-text-muted small">Last updated 15 days ago</span>
                      </div>
                      <p className="ps-text-muted">Secure your transactions with a unique PIN</p>
                      <button className="ps-link-small" onClick={() => setActiveModal('change-pin')}>
                        Change PIN
                      </button>
                    </div>
                  </div>

                  <div className="ps-fullwidth-col">
                    <h4>Recent Login Activity</h4>
                    <div className="ps-login-list">
                      <div className="ps-login-current">
                        <div>
                          <div className="ps-login-title">Web Browser</div>
                          <div className="ps-login-sub">Chrome on Windows</div>
                        </div>
                        <div className="ps-login-meta">
                          <div className="ps-login-status">Current Session</div>
                          <div className="ps-login-location">Mumbai, India</div>
                        </div>
                      </div>

                      {loginActivity.map(activity => (
                        <div key={activity.id} className="ps-login-item">
                          <div>
                            <div className="ps-login-title">{activity.device}</div>
                            <div className="ps-login-sub">{activity.location}</div>
                          </div>
                          <div className="ps-login-meta">
                            <div className={`ps-login-result ${activity.status === 'success' ? 'ps-success' : 'ps-danger'}`}>
                              {activity.status === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                              {activity.status === 'success' ? ' Successful' : ' Failed'}
                            </div>
                            <div className="ps-login-time">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'settings' && (
              <section className="ps-card ps-card-fullwidth">
                <h2>Application & Communication Settings</h2>
                <div className="ps-fullwidth-grid">
                  <div className="ps-fullwidth-col">
                    <h4>Notifications</h4>

                    <div className="ps-setting-item">
                      <div>
                        <div className="ps-setting-title">Email Transaction Alerts</div>
                        <div className="ps-setting-desc">Receive email notification for all transactions.</div>
                      </div>
                      <label className="ps-switch">
                        <input type="checkbox" defaultChecked onChange={() => handleSettingToggle('email-alerts')} />
                        <span className="ps-slider"></span>
                      </label>
                    </div>

                    <div className="ps-setting-item">
                      <div>
                        <div className="ps-setting-title">Promotional Offers</div>
                        <div className="ps-setting-desc">Receive special offers and marketing communication.</div>
                      </div>
                      <label className="ps-switch">
                        <input type="checkbox" onChange={() => handleSettingToggle('promotional-offers')} />
                        <span className="ps-slider"></span>
                      </label>
                    </div>

                    <div className="ps-setting-item">
                      <div>
                        <div className="ps-setting-title">Push Notifications</div>
                        <div className="ps-setting-desc">Allow app to send push notifications for banking activities.</div>
                      </div>
                      <label className="ps-switch">
                        <input type="checkbox" defaultChecked onChange={() => handleSettingToggle('push-notifications')} />
                        <span className="ps-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="ps-fullwidth-col">
                    <h4>Account Management</h4>

                    <div className="ps-setting-row">
                      <div>
                        <div className="ps-setting-title">Set Default Language</div>
                      </div>
                      <select className="ps-select" defaultValue="en">
                        <option value="en">English (US)</option>
                        <option value="hi">Hindi (IN)</option>
                        <option value="mr">Marathi (IN)</option>
                      </select>
                    </div>

                    <div className="ps-setting-row">
                      <div>
                        <div className="ps-setting-title">Download Terms & Conditions</div>
                      </div>
                      <button className="ps-btn-outline" onClick={() => alert('Downloading PDF')}>
                        <Download size={16} /> Download PDF
                      </button>
                    </div>

                    <div className="ps-setting-row">
                      <div>
                        <div className="ps-setting-title">Deactivate Account</div>
                        <div className="ps-setting-desc">Permanently close your account and services.</div>
                      </div>
                      <button className="ps-btn-danger" onClick={() => alert('Deactivate flow')}>
                        <X size={16} /> Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}

      <Modal isOpen={activeModal === 'edit-profile'} onClose={() => setActiveModal(null)} title="Edit Personal Information">
        <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }}>
          <div className="ps-form-row">
            <label htmlFor="editName">Full Name</label>
            <input id="editName" type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
          </div>

          <div className="ps-form-row">
            <label htmlFor="editEmail">Email Address</label>
            <input id="editEmail" type="email" value={formData.email} readOnly />
          </div>

          <div className="ps-form-row">
            <label htmlFor="editPhone">Phone Number</label>
            <input id="editPhone" type="tel" value={formData.phone} readOnly />
          </div>

          <div className="ps-form-row">
            <label htmlFor="editDob">Date of Birth</label>
            <input id="editDob" type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} />
          </div>

          <div className="ps-form-row">
            <label htmlFor="editGender">Gender</label>
            <select id="editGender" className="ps-select" value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="ps-form-row">
            <label htmlFor="editAadhaar">Aadhaar Number</label>
            <input
              id="editAadhaar"
              type="text"
              value={formData.aadhaar}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder={user.aadhaar ? "Verified - Cannot Change" : "Update your Aadhaar Number"}
              readOnly={!!user.aadhaar && user.aadhaar.trim().toLowerCase() !== "aadhaar"} // Lock if set and not the bugged "aadhaar" string
              className={!!user.aadhaar && user.aadhaar.trim().toLowerCase() !== "aadhaar" ? "ps-input ps-input-readonly" : "ps-input"}
            />
          </div>

          <div className="ps-form-row">
            <label htmlFor="editAddress">Address</label>
            <textarea id="editAddress" rows="3" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} required />
          </div>

          <div className="ps-form-actions">
            <button type="submit" className="ps-btn-primary">Save Changes</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'change-password'} onClose={() => setActiveModal(null)} title="Change Login Password">
        <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
          <div className="ps-form-row">
            <label htmlFor="currentPassword">Current Password</label>
            <input id="currentPassword" type="password" value={formData.currentPassword} onChange={(e) => handleInputChange('currentPassword', e.target.value)} required />
          </div>

          <div className="ps-form-row">
            <label htmlFor="newPassword">New Password (Min 8 characters)</label>
            <input id="newPassword" type="password" value={formData.newPassword} onChange={(e) => handleInputChange('newPassword', e.target.value)} required />
          </div>

          <div className="ps-form-row">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} required />
          </div>

          <div className="ps-form-actions">
            <button type="submit" className="ps-btn-primary">Change Password</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'change-pin'} onClose={() => setActiveModal(null)} title="Change Transaction PIN">
        <form onSubmit={(e) => { e.preventDefault(); handlePinChange(); }}>
          <div className="ps-form-row">
            <label htmlFor="currentPin">Current PIN</label>
            <input id="currentPin" type="password" maxLength="4" value={formData.currentPin} onChange={(e) => handleInputChange('currentPin', e.target.value.replace(/[^0-9]/g, ''))} required />
          </div>

          <div className="ps-form-row">
            <label htmlFor="newPin">New 4-Digit PIN</label>
            <input id="newPin" type="password" maxLength="4" value={formData.newPin} onChange={(e) => handleInputChange('newPin', e.target.value.replace(/[^0-9]/g, ''))} required />
          </div>

          <div className="ps-form-row">
            <label htmlFor="confirmPin">Confirm New PIN</label>
            <input id="confirmPin" type="password" maxLength="4" value={formData.confirmPin} onChange={(e) => handleInputChange('confirmPin', e.target.value.replace(/[^0-9]/g, ''))} required />
          </div>

          <div className="ps-form-actions">
            <button type="submit" className="ps-btn-primary">Change PIN</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProfileSection;