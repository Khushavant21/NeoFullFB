import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";  // ✅ useNavigate added
// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
// Lucide React Icons
import {
  User,
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  CreditCard,
  Send,
  Banknote,
  DollarSign,
  BarChart3,
  FileBarChart,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";
import logo from "../assets/logo.png";
import "./TopNavbar.css";

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Added navigate hook

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/Admin/" },
    { name: "Users", icon: <Users size={18} />, path: "/Admin/users" },
    { name: "KYC", icon: <FileText size={18} />, path: "/Admin/kyc" },
    {
      name: "Accounts & Wallets",
      icon: <Wallet size={18} />,
      path: "/Admin/accountsdashboard",
    },
    { name: "Transactions", icon: <CreditCard size={18} />, path: "/Admin/transactions" },
    {
      name: "Money Transfer Request",
      icon: <Send size={18} />,
      path: "/Admin/moneyrequest",
    },
    {
      name: "Deposit Management",
      icon: <Banknote size={18} />,
      path: "/Admin/depositmanagement",
    },
    {
      name: "Services",
      icon: <Settings size={18} />,
      dropdown: [
        { name: "Investment Products", icon: <BarChart3 size={16} />, path: "/Admin/investment_products" },
        { name: "Complaints & Support", icon: <FileBarChart size={16} />, path: "/Admin/complaints" },
        { name: "Reports & Analytics", icon: <FileBarChart size={16} />, path: "/Admin/reports" },
        { name: "Loans", icon: <DollarSign size={16} />, path: "/Admin/loans" },
        { name: "Cards", icon: <CreditCard size={16} />, path: "/Admin/cards" },
        { name: "Setting", icon: <Settings size={16} />, path: "/Admin/settings" },
      ],
    },
  ];

  return (
    <>
      {/* ---------- Top Navbar ---------- */}
      <nav className="tnb-navbar">
        <div className="tnb-navbar-container">
          {/* Left Side: Logo + Search */}
          <div className="tnb-navbar-left">
            <NavLink to="/" className="tnb-navbar-brand">
              <img src={logo} alt="NeoBank Logo" className="tnb-logo" />
              <span className="tnb-brand-text">NeoBank Admin</span>
            </NavLink>

            {/* Search */}
            <form className="tnb-search-form">
              <input
                type="text"
                className="tnb-search-input"
                placeholder="Search users, transactions..."
              />
            </form>
          </div>

          {/* Right Side: Notification + Profile */}
          <div className="tnb-navbar-right">
           <button
              className="tn-icon-btn"
              onClick={() => navigate("/admin/notifications")} // :white_check_mark: Navigate to AdminNotificationPanel
              title="View Notifications"
            >
              <FontAwesomeIcon icon={faBell} className="tn-bell-icon" />
              <span className="tn-badge">3</span>
            </button>

            <NavLink to="/Admin/adminprofile" className="tnb-profile-btn">
              <User size={20} className="tnb-profile-icon" />
              <span className="tnb-profile-text">Admin</span>
            </NavLink>

            <button
              className="tnb-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Secondary Navbar ---------- */}
      <div className="tnb-secondary-navbar">
        <ul className="tnb-nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className={item.dropdown ? "tnb-dropdown" : ""}>
              {!item.dropdown ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `tnb-nav-item ${isActive ? "tnb-active" : ""}`
                  }
                >
                  <span className="tnb-icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <span className="tnb-nav-item tnb-dropdown-trigger">
                    <span className="tnb-icon">{item.icon}</span>
                    {item.name} <ChevronDown size={14} />
                  </span>
                  <ul className="tnb-dropdown-menu">
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <NavLink to={sub.path} className="tnb-dropdown-item">
                          <span className="tnb-dropdown-icon">{sub.icon}</span>
                          <span className="tnb-dropdown-text">{sub.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {mobileMenuOpen && (
        <div className="tnb-mobile-menu">
          <ul className="tnb-mobile-nav-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                {!item.dropdown ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `tnb-mobile-nav-item ${isActive ? "tnb-mobile-active" : ""}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="tnb-icon">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ) : (
                  <>
                    <div
                      className="tnb-mobile-nav-item tnb-mobile-dropdown-toggle"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      <span className="tnb-icon">{item.icon}</span>
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`tnb-chevron ${servicesOpen ? "tnb-chevron-open" : ""}`}
                      />
                    </div>

                    {servicesOpen && (
                      <ul className="tnb-mobile-dropdown">
                        {item.dropdown.map((sub) => (
                          <li key={sub.name}>
                            <NavLink
                              to={sub.path}
                              className="tnb-mobile-dropdown-item"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="tnb-dropdown-icon">{sub.icon}</span>
                              <span className="tnb-dropdown-text">{sub.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
