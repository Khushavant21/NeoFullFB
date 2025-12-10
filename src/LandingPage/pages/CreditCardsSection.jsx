import React, { useState } from "react";
import "./styles/CreditCards.css";

export default function CreditCardsSection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  const cards = [
    { 
      name: "Neo Platinum", 
      perks: "Dining • Travel • Cashback",
      gradient: "linear-gradient(135deg, #900603, #c41e3a)",
      annualFee: "$0",
      rewards: "5x points",
      cardClass: "platinum"
    },
    { 
      name: "Neo Gold", 
      perks: "Rewards • Lounge access",
      gradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      annualFee: "$95",
      rewards: "3x points",
      cardClass: "gold"
    },
    { 
      name: "Neo Classic", 
      perks: "Essentials • Low fee",
      gradient: "linear-gradient(135deg, #059669, #10b981)",
      annualFee: "$0",
      rewards: "1x points",
      cardClass: "classic"
    },
  ];

  const handleApply = (cardName) => {
    setSelectedCard(cardName);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="differentcard-toast-notification">
          <div className="differentcard-toast-content">
            <span className="differentcard-toast-icon">✓</span>
            <div>
              <div className="differentcard-toast-title">Application Started</div>
              <div className="differentcard-toast-message">Redirecting to {selectedCard} application...</div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== Credit Cards Section ===================== */}
      <section className="differentcard-section">
        <div className="differentcard-container">
          <div className="differentcard-section-header">
            <h2 className="differentcard-section-title">Choose Your Credit Card</h2>
            <p className="differentcard-section-subtitle">Find the perfect card for your lifestyle</p>
          </div>
          
          <div className="differentcard-cards-row">
            {cards.map((card, index) => (
              <div 
                className={`differentcard-card-wrapper differentcard-${card.cardClass}`} 
                key={index}
                onMouseEnter={() => setSelectedCard(card.name)}
                onMouseLeave={() => setSelectedCard(null)}
              >
                <div 
                  className={`differentcard-card-visual differentcard-${card.cardClass}-visual`} 
                  style={{ background: card.gradient }}
                >
                  <div className="differentcard-card-header">
                    <div className="differentcard-neo-logo">
                      <div className="differentcard-logo-icon">N</div>
                      <span className="differentcard-logo-text">NeoBank</span>
                    </div>
                    <div className="differentcard-contactless-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                      </svg>
                    </div>
                  </div>

                  <div className="differentcard-chip-container">
                    <div className="differentcard-chip">
                      <div className="differentcard-chip-lines">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  <div className="differentcard-card-number">
                    <span>1234 5678 9012 3456</span>
                  </div>

                  <div className="differentcard-card-details">
                    <div className="differentcard-valid-thru">
                      <span className="differentcard-label">VALID<br/>THRU</span>
                      <span className="differentcard-date">01/29</span>
                    </div>
                    <div className="differentcard-cardholder">
                      <span>CARDHOLDER</span>
                    </div>
                    <div className="differentcard-network-logo">
                      <span>VISA</span>
                    </div>
                  </div>
                </div>

                <div className="differentcard-card-info">
                  <div className="differentcard-card-name-row">
                    <h3>{card.name}</h3>
                    <div className="differentcard-card-highlights">
                      <span className="differentcard-highlight-badge">{card.annualFee} annual fee</span>
                      <span className="differentcard-highlight-badge">{card.rewards} rewards</span>
                    </div>
                  </div>
                  
                  <div className="differentcard-perks-container">
                    <span className="differentcard-best-for-badge">BEST FOR</span>
                    <p className="differentcard-card-perks">{card.perks}</p>
                  </div>
                  
                  <div className="differentcard-card-actions">
                    <button 
                      className={`differentcard-btn differentcard-primary ${selectedCard === card.name ? 'differentcard-pulse' : ''}`}
                      onClick={() => handleApply(card.name)}
                    >
                      Apply Now
                    </button>
                    <button className="differentcard-btn differentcard-ghost">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}