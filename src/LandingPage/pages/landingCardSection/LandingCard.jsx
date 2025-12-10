import React from "react";
import "./LandingCard.css";
import neobankLogo from "../../assets/neobank-logo.png";

// ================================
// 🔹 Main Landing Section
// ================================
const LandingCard = () => {
  return (
    <>
      <section className="personal4-section">
        <div className="personal4-container">
          <h1 className="personal4-title">
            Premium Cards for Every LifeStyle
          </h1>
          <p className="personal4-subtitle">
            Discover credit and debit cards designed to match your spending habits and
            reward your lifestyle choices.
          </p>
          <div className="personal4-buttons">
            <button className="btn-primary4">Apply for Credit Card</button>
            <button className="btn-secondary4">Compare Cards</button>
          </div>
        </div>
      </section>

      {/* =====================================
          🟢 CREDIT CARD SECTION STARTS HERE
      ====================================== */}
      <CreditCard />

      {/* =====================================
          🟠 DEBIT CARD SECTION STARTS HERE
      ====================================== */}
      <DebitCard />

      <CardFeatures />
      <ExclusiveCardOffers />
      <WhyChooseNeoBank />
    </>
  );
};

export default LandingCard;

// ====================================================
// 🟩 CREDIT CARD COMPONENT
// ====================================================
const CreditCard = () => {
  const cards = [
    {
      title: "Neo Platinum",
      type: "Premium Credit Card",
      color: "#1a237e",
      gradient: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #303f9f 100%)",
      fee: "₹999",
      tag: "BEST FOR TRAVEL",
      benefits: [
        "5% cashback on dining",
        "Complimentary airport lounge access",
        "Travel insurance up to ₹50 Lakhs",
        "Welcome bonus: 5,000 reward points",
      ],
    },
    {
      title: "Neo Gold",
      type: "Rewards Credit Card",
      color: "#c62828",
      gradient: "linear-gradient(135deg, #c62828 0%, #d32f2f 50%, #f44336 100%)",
      fee: "₹499",
      tag: "BEST FOR REWARDS",
      benefits: [
        "2X rewards on online shopping",
        "Fuel surcharge waiver",
        "Movie ticket discounts",
        "Welcome bonus: 2,000 reward points",
      ],
    },
    {
      title: "Neo Classic",
      type: "Lifestyle Credit Card",
      color: "#00695c",
      gradient: "linear-gradient(135deg, #00695c 0%, #00796b 50%, #00897b 100%)",
      fee: "Free",
      tag: "BEST FOR BEGINNERS",
      benefits: [
        "Zero annual fee lifetime",
        "1% cashback on all spends",
        "Low interest rate @11%",
        "Zero joining fee",
      ],
    },
  ];

  return (
    <section className="cc-section-container">
      <h2 className="cc-section-title">Credit Cards</h2>
      <p className="cc-section-subtitle">Choose the card that fits your lifestyle</p>

      <div className="cc-cards-container">
        {cards.map((card, i) => (
          <div className="cc-card-item" key={i}>
            {/* CARD TOP VISUAL AREA */}
            <div className="cc-card-visual" style={{ background: card.gradient }}>
              <div className="cc-card-pattern"></div>
              <div className="cc-card-logo-container">
                <img src={neobankLogo} alt="NeoBank" className="cc-card-logo-img" />
              </div>
              <p className="cc-card-type">{card.type}</p>
              <h2 className="cc-card-name">{card.title}</h2>

              {/* Card Number */}
              <p className="cc-card-number">.... .... .... 3456</p>

              {/* Valid Thru */}
              <p className="cc-card-valid">
                VALID THRU <span>12/29</span>
              </p>

              <div className="cc-card-chip">
                <div className="cc-card-chip-inner"></div>
                <div className="cc-card-chip-lines"></div>
              </div>
              
              {/* Contactless Icon */}
              <div className="cc-card-contactless">
                <div className="cc-contactless-waves"></div>
              </div>
            </div>

            {/* OUTSIDE CARD DETAILS */}
            <div className="cc-card-info">
              <div className="cc-card-header">
                <h3 className="cc-card-title-text">{card.title}</h3>
                <span className="cc-card-tag">{card.tag}</span>
              </div>

              <p className="cc-card-fee">
                Annual Fee: ₹{card.fee}
              </p>

              <ul className="cc-card-benefits">
                {card.benefits.map((b, j) => (
                  <li key={j}>
                    <span className="cc-card-tick">✓</span> {b}
                  </li>
                ))}
              </ul>

              <div className="cc-card-actions">
                <button className="cc-card-apply-btn">Apply Now</button>
                <button className="cc-card-details-btn">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ====================================================
// 🟦 DEBIT CARD COMPONENT
// ====================================================
const DebitCard = () => {
  const debitCards = [
    {
      title: "Platinum Debit Card",
      color: "#4a148c",
      gradient: "linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)",
      number: ".... 5657",
      benefits: [
        "Unlimited free ATM withdrawals",
        "Contactless payments",
        "Travel insurance",
      ],
    },
    {
      title: "Gold Debit Card",
      color: "#e65100",
      gradient: "linear-gradient(135deg, #e65100 0%, #ef6c00 50%, #f57c00 100%)",
      number: ".... 8874",
      benefits: [
        "5 free ATM withdrawals/month",
        "Online shopping protection",
        "Rewards program",
      ],
    },
    {
      title: "Classic Debit Card",
      color: "#263238",
      gradient: "linear-gradient(135deg, #263238 0%, #37474f 50%, #455a64 100%)",
      number: ".... 2234",
      benefits: [
        "3 free ATM withdrawals/month",
        "Basic insurance cover",
        "Secure chip & PIN",
      ],
    },
  ];

  return (
    <section className="dbt-section-container">
      <h2 className="dbt-section-title">Debit Cards</h2>
      <p className="dbt-section-subtitle">
        Secure and convenient debit cards for everyday banking
      </p>

      {/* 🧩 Debit cards grid layout */}
      <div className="dbt-cards-container">
        {debitCards.map((card, index) => (
          <div className="dbt-card-item" key={index}>
            {/* 💳 Top Card Layout */}
            <div className="dbt-card-visual" style={{ background: card.gradient }}>
              <div className="dbt-card-pattern"></div>
              <div className="dbt-card-logo-container">
                <img src={neobankLogo} alt="NeoBank" className="dbt-card-logo-img" />
              </div>
              <h2 className="dbt-card-name">{card.title}</h2>
              <div className="dbt-card-info-container">
                <p className="dbt-card-number">{card.number}</p>
                <div className="dbt-card-chip">
                  <div className="dbt-card-chip-inner"></div>
                  <div className="dbt-card-chip-lines"></div>
                </div>
              </div>
              
              {/* Contactless Icon */}
              <div className="dbt-card-contactless">
                <div className="dbt-contactless-waves"></div>
              </div>
            </div>

            {/* ✅ Debit Card Benefits */}
            <ul className="dbt-card-benefits">
              {card.benefits.map((benefit, i) => (
                <li key={i}>
                  <span className="dbt-card-tick">✓</span> {benefit}
                </li>
              ))}
            </ul>

            <button className="dbt-card-apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

const CardFeatures = () => {
  const features = [
    {
      icon: "🛡️",
      title: "Secure & Protected",
      desc: "EMV chip technology and 3D secure authentication",
    },
    {
      icon: "📱",
      title: "Digital Wallet",
      desc: "Add to Apple Pay, Google Pay, Samsung Pay",
    },
    {
      icon: "🎁",
      title: "Rewards Program",
      desc: "Earn points on every transaction",
    },
    {
      icon: "⭐",
      title: "Exclusive Offers",
      desc: "Access to premium lifestyle benefits",
    },
  ];

  return (
    <section className="features-section-container">
      <h2 className="features-section-title">Card Features</h2>
      <div className="features-grid-container">
        {features.map((feature, index) => (
          <div className="feature-card-item" key={index}>
            <div className="feature-icon-container">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


// ====================================================
// 🔴 EXCLUSIVE CARD OFFERS SECTION (NEWLY ADDED)
// ====================================================


const ExclusiveCardOffers = () => {
  const offers = [
    { icon: "✈️", title: "Travel", desc: "Up to 20% off" },
    { icon: "☕", title: "Dining", desc: "15% cashback" },
    { icon: "🛍️", title: "Shopping", desc: "10% discount" },
    { icon: "⭐", title: "Entertainment", desc: "Buy 1 Get 1" },
  ];

  return (
    <section className="offers-section-container">
      <h2 className="offers-section-title">Exclusive Card Offers</h2>
      <p className="offers-section-subtitle">
        Enjoy amazing deals across categories
      </p>

      <div className="offers-grid-container">
        {offers.map((offer, i) => (
          <div className="offer-card-item" key={i}>
            <div className="offer-icon-container">{offer.icon}</div>
            <h3>{offer.title}</h3>
            <p>{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


// ====================================================
// 🟣 WHY CHOOSE NEOBANK CARDS SECTION (ADD BELOW THIS LINE)
// ====================================================
const WhyChooseNeoBank = () => {
  const features = [
    {
      icon: "⚡",
      title: "Instant Approval",
      desc: "Get approved in minutes, not days",
      bgColor: "#fff6ee",
    },
    {
      icon: "🏆",
      title: "Best Rewards",
      desc: "Industry-leading reward rates",
      bgColor: "#e6fcff",
    },
    {
      icon: "🛡️",
      title: "Zero Fraud Liability",
      desc: "Complete protection guaranteed",
      bgColor: "#fff1f8",
    },
  ];

  return (
    <section className="whychoose-section-container">
      <h2 className="whychoose-section-title">Why Choose NeoBank Cards?</h2>
      <div className="whychoose-grid-container">
        {features.map((feature, i) => (
          <div
            className="whychoose-card-item"
            style={{ backgroundColor: feature.bgColor }}
            key={i}
          >
            <div className="whychoose-icon-container">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};