



import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Bell, User, CreditCard, DollarSign,
  Repeat, TrendingUp, Settings, AlertCircle, LayoutDashboard, Menu
} from "lucide-react";
import { useEffect, useState } from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import logo from "../assets/logo.png";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSecondaryOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/client" },
    { name: "My Account", icon: <User size={18} />, path: "/client/myaccount" },
    { name: "Deposit", icon: <CreditCard size={18} />, path: "/client/deposit" },
    { name: "Loan", icon: <DollarSign size={18} />, path: "/client/loan" },
    { name: "Money Transfer", icon: <Repeat size={18} />, path: "/client/money-transfer" },
    { name: "Investment", icon: <TrendingUp size={18} />, path: "/client/investment" },
    { name: "Cards", icon: <CreditCard size={18} />, path: "/client/cards" },
    { name: "Services", icon: <Settings size={18} />, path: "/client/services" },
    { name: "Setting", icon: <Settings size={18} />, path: "/client/setting" },
    { name: "Complaint", icon: <AlertCircle size={18} />, path: "/client/complaintfeedback" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="NeoBank Logo" className="logo" />
            <span className="brand-text">NeoBank</span>
          </Link>


          {/* Search Bar */}
          {/* <form className="search-form">
            <input type="text" className="search-input" placeholder="Search users, transactions..." />
          </form> */}
        </div>

        {/* Right side */}
        <div
          className="navbar-right"
          style={{
            marginLeft: "auto",
            marginRight: "30px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <Link to="/Client/Notifications" className="icon-btn">
            <Bell size={22} />
            <span className="badge">3</span>
          </Link>

          {/* ✅ Profile Button from amit_myAccount branch */}
          <Link
            to="/Client/profile"
            className="d-flex align-items-center px-2 py-1 rounded-pill shadow-sm bg-light text-dark text-decoration-none"
            style={{ transition: "all 0.3s ease" }}
          >
            <User size={20} className="me-2 text-danger" />
            <span className="fw-semibold">Amit Rajput</span>
          </Link>
          {/* keep menu separate so JD is always right-aligned */}
          <button
            className="menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          {/* </div> */}

        </div>
      </nav>

      {/* Secondary Navbar (Desktop) */}
      <div className="secondary-navbar">
        <nav className="secondary-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <span className="icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
