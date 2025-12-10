import React, { useState } from "react";
import "./styles/Header.css";
import logoSrc from "../assets/neobank-logoo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header({ headerLogoRef }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Personal", path: "/personal" },
    { label: "Card", path: "/landCard" },
    { label: "Business", path: "/business" },
    { label: "NShop", path: "/nshop" },
    { label: "Resources", path: "/resources" },
    { label: "About", path: "/about" },
    { label: "Help", path: "/help" },
    { label: "Complaints", path: "/complaint" },
  ];

  // ✅ Proper navigation on login buttons
  const handleClientLogin = () => {
    setOpenLogin(false);
    navigate("/client");
  };

  const handleAdminLogin = () => {
    setOpenLogin(false);
    navigate("/admin");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Left Section: Logo + Brand */}
        <div className="header-left" onClick={handleLogoClick}>
          <img
            ref={headerLogoRef}
            src={logoSrc}
            alt="NeoBank"
            className="brand-mark"
          />
          <div className="brand-text">
            <div className="brand-name">NeoBank</div>
            <div className="brand-id">Digital Partner</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`main-nav ${mobileMenu ? "open" : ""}`}>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`menu-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Phone + Login */}
        <div className="header-right">
          <div className="phone">📞 1800 1080</div>

          <div className="login-wrap">
            <button
              className="login-btn"
              onClick={() => setOpenLogin((s) => !s)}
              aria-haspopup="true"
              aria-expanded={openLogin}
            >
              Login <span className="arrow">{openLogin ? "▲" : "▼"}</span>
            </button>

            {openLogin && (
              <div
                className="login-dropdown"
                onMouseLeave={() => setOpenLogin(false)}
              >
                <button className="login-option" onClick={handleClientLogin}>
                  Client Login
                </button>
                <button className="login-option" onClick={handleAdminLogin}>
                  Admin Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu((s) => !s)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
