import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaIdCard,
  FaExclamationTriangle,
  FaClipboardList,
  FaShieldAlt,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import "./styles/TrustworthySection.css";

export default function TrustworthySection() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(null);

  const services = [
    {
      title: "Track Applications",
      subtitle: "Service Requests",
      icon: <FaClipboardList />,
      key: "track",
      desc: "Easily track the status of your banking applications and service requests in real-time.",
    },
    {
      title: "Smart Lock",
      subtitle: "Advanced Security",
      icon: <FaLock />,
      key: "lock",
      desc: "Protect your account with advanced smart lock features for ultimate security.",
    },
    {
      title: "Block Card",
      subtitle: "Instant Protection",
      icon: <FaIdCard />,
      key: "block",
      desc: "Lost your card? Instantly block it to prevent unauthorized transactions.",
    },
    {
      title: "Report Fraud",
      subtitle: "Stay Protected",
      icon: <FaExclamationTriangle />,
      key: "fraud",
      desc: "Report suspicious activities immediately to keep your money safe.",
    },
  ];

  const trustItems = [
    { 
      title: "Trusted", 
      desc: "Secure banking with end-to-end encryption.",
      icon: <FaShieldAlt />
    },
    { 
      title: "Transparent", 
      desc: "No hidden fees. Clear policies.",
      icon: <FaCheckCircle />
    },
    { 
      title: "Fast", 
      desc: "Instant approvals & 24/7 service.",
      icon: <FaRocket />
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="why" className={`trust-section ${visible ? "show" : ""}`}>
      <div className="trust-container">
        {/* Services */}
        <div className="services-box">
          {services.map((srv, i) => (
            <div
              key={i}
              className={`service-pill ${active === srv.key ? "active" : ""}`}
              onClick={() => {
                setActive(srv.key);
                setModal(srv);
              }}
            >
              <div className="service-icon">{srv.icon}</div>
              <h4>{srv.title}</h4>
              <p className="service-subtitle">{srv.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <div className="title-container">
          <h2 className="trust-title">Why Choose NeoBank</h2>
          <p className="trust-subtitle">Experience the future of banking with our innovative solutions</p>
        </div>

        {/* Trust Cards */}
        <div className="trust-grid">
          {trustItems.map((item, i) => (
            <div className="trust-card" key={i}>
              <div className="trust-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="card-shine"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">{modal.icon}</div>
            <h3>{modal.title}</h3>
            <p className="modal-subtitle">{modal.subtitle}</p>
            <p>{modal.desc}</p>
            <button className="close-btn" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}