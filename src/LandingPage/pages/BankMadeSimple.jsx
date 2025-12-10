import React, { useState, useEffect } from "react";
import "./styles/BankingMadeSimple.css";

export default function BankMadeSimple() {
  const features = [
    {
      title: "Mobile First Banking",
      desc: "Complete banking experience in your pocket with our award-winning mobile app",
      color: "#2563EB", // blue
    },
    {
      title: "Bank Grade Security",
      desc: "Multi-layer encryption and biometric authentication to keep your money safe",
      color: "#16A34A", // green
    },
    {
      title: "Instant Transactions",
      desc: "Real-time payments and instant fund transfers 24/7 with zero downtime",
      color: "#CA8A04", // yellow
    },
    {
      title: "Rewards & Cashback",
      desc: "Earn rewards on every transaction and enjoy exclusive cashback offers",
      color: "#8B5CF6", // purple
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock customer support via chat, call, or email in multiple languages",
      color: "#EC4899", // pink
    },
    {
      title: "Global Reach",
      desc: "Access your account worldwide with international debit cards and forex services",
      color: "#4F46E5", // indigo
    },
  ];

  // Fade-in animation on scroll
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={`bank-section ${visible ? "show" : ""}`}>
      <h2 className="bank-main-title">Banking Made Simple</h2>
      <p className="bank-subtitle">
        Experience modern banking with features designed to make your financial
        life easier
      </p>
      <div className="bank-grid">
        {features.map((f, i) => (
          <div
            key={i}
            className="bank-card"
            style={{ "--circle-color": f.color }}
          >
            <div className="bank-icon" style={{ backgroundColor: f.color }}>
              {f.title.charAt(0)}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>

        ))}
      </div>
    </section>
  );
}
