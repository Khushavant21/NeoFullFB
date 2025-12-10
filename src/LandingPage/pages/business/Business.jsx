import React, { useState, useEffect } from "react";
import "./Business.css";
import { FaCreditCard, FaGlobe, FaUsers, FaShieldAlt, FaBolt, FaChartBar, FaCheck, FaClock, FaHeart, FaStar, FaDownload, } from "react-icons/fa";

const Business = () => {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [highlightedTestimonial, setHighlightedTestimonial] = useState(1);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedTestimonial(prev => (prev >= 4 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="business-section">

      <div className="business-content">
        <h1>Business Banking Solutions</h1>
        <p>
          Comprehensive banking services to help your business grow. From current
          accounts to business loans, we're your financial partner.
        </p>
        <div className="business-buttons">
          <button
            className={`btn-primary ${hoveredBtn === "open" ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredBtn("open")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => {
              setShowPopup(true);

            }}
          >
            Open Business Account
          </button>
          <button
            className={`btn-secondary ${hoveredBtn === "loan" ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredBtn("loan")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => setShowPopup(true)}
          >
            Apply for Loan
          </button>
        </div>
      </div>



      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="popup-window"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Welcome to Neo Bank</h2>
            <p>Please login to continue.</p>
            <button
              className="btn-continue"
              onClick={() => setShowPopup(false)}
            >
              Continue
            </button>
            <button
              className="btn-close"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Business Accounts Section */}
      <div className="business-accounts">
        <h2>Business Accounts</h2>
        <p className="subtitle">Flexible banking solutions for businesses of all sizes</p>

        <div className="account-cards">
          {/* Current Account */}
          <div className="account-card">
            <div className="account-icon">🏢</div>
            <h3>Current Account</h3>
            <p>Designed for your day-to-day business transactions</p>
            <ul>
              <li>✔ Free cash deposits up to ₹5 Lakhs</li>
              <li>✔ Free RTGS/NEFT transactions</li>
              <li>✔ Overdraft facility available</li>
              <li>✔ Dedicated relationship manager</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Open Account
            </button>
          </div>

          {/* Business Savings */}
          <div className="account-card">
            <div className="account-icon">📈</div>
            <h3>Business Savings</h3>
            <p>Earn interest while maintaining liquidity</p>
            <ul>
              <li>✔ Interest rate up to 6%</li>
              <li>✔ Monthly interest credit</li>
              <li>✔ Free cheque book</li>
              <li>✔ 24/7 online banking</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Open Account
            </button>
          </div>
          {/* RERA Account */}
          <div className="account-card">
            <div className="account-icon">🏗️</div>
            <h3>RERA Account</h3>
            <p>Compliant account for real estate regulatory authority</p>
            <ul>
              <li>✔ Secure fund management</li>
              <li>✔ Easy project tracking</li>
              <li>✔ Transparent accounting</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Open Account
            </button>
          </div>

          {/* GEM Account */}
          <div className="account-card">
            <div className="account-icon">🛒</div>
            <h3>GEM Account</h3>
            <p>Optimized for Government e-Marketplace transactions</p>
            <ul>
              <li>✔ Seamless GEM integration</li>
              <li>✔ Quick vendor payments</li>
              <li>✔ Transaction tracking</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Open Account
            </button>
          </div>
        </div>
      </div>




      {/*  Business Loans Section */}
      <div className="business-loans">
        <h2>Business Loans</h2>
        <p className="subtitle">
          Empower your business with flexible loan options and quick approvals.
        </p>

        <div className="loan-cards">
          <div className="loan-card">
            <div className="loan-icon">💰</div>
            <h3>Working Capital Loan</h3>
            <p>Manage day-to-day operations with ease.</p>
            <ul>
              <li>✔ Quick processing</li>
              <li>✔ Minimal documentation</li>
              <li>✔ Flexible repayment options</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>

          <div className="loan-card">
            <div className="loan-icon">🏗️</div>
            <h3>Equipment Financing</h3>
            <p>Upgrade your business with modern equipment.</p>
            <ul>
              <li>✔ Up to ₹50 Lakhs funding</li>
              <li>✔ Low interest rates</li>
              <li>✔ No hidden charges</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>

          <div className="loan-card">
            <div className="loan-icon">📊</div>
            <h3>Term Loan</h3>
            <p>Perfect for expansion and long-term goals.</p>
            <ul>
              <li>✔ Flexible tenure up to 5 years</li>
              <li>✔ Attractive interest rates</li>
              <li>✔ Instant eligibility check</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>

          <div className="loan-card">
            <div className="loan-icon">🏭</div>
            <h3>Machinery Loan</h3>
            <p>Upgrade your business equipment</p>
            <ul>
              <li>✔ Amount: Up to ₹1 Crore</li>
              <li>✔ Rate: 9.75% onwards</li>
              <li>✔ Tenure: Up to 7 years</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>

          <div className="loan-card">
            <div className="loan-icon">🏢</div>
            <h3>Commercial Property Loan</h3>
            <p>Own your business premises</p>
            <ul>
              <li>✔ Amount: Up to ₹5 Crores</li>
              <li>✔ Rate: 9% onwards</li>
              <li>✔ Tenure: Up to 15 years</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>

          <div className="loan-card">
            <div className="loan-icon">🚀</div>
            <h3>Startup Loan</h3>
            <p>Fuel your entrepreneurial journey</p>
            <ul>
              <li>✔ Amount: Up to ₹50 Lakhs</li>
              <li>✔ Rate: 10.25% onwards</li>
              <li>✔ Tenure: Up to 5 years</li>
            </ul>
            <button
              className="btn-primary small"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>


      {/* Business Services Section */}
      <div className="business-services">
        <h2>Business Services</h2>
        <p className="subtitle">Complete financial solutions for your business needs</p>

        <div className="services-cards">
          <div className="service-card">
            <div className="service-icon"><FaCreditCard /></div>
            <h3>Payment Solutions</h3>
            <p>Accept payments via POS, QR codes, and online gateways</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><FaGlobe /></div>
            <h3>Trade Finance</h3>
            <p>Import/export financing and foreign exchange services</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><FaUsers /></div>
            <h3>Payroll Services</h3>
            <p>Automated salary processing and employee benefits</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><FaShieldAlt /></div>
            <h3>Business Insurance</h3>
            <p>Protect your business against risks and uncertainties</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><FaBolt /></div>
            <h3>Quick Loans</h3>
            <p>Fast approval for short-term business funding</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><FaChartBar /></div>
            <h3>Analytics Dashboard</h3>
            <p>Track your business performance in real-time</p>
          </div>
        </div>
      </div>

      {/* Why Choose NeoBank Section */}
      <div className="business-why-choose">
        <h2>Why Choose NeoBank for Business?</h2>
        <div className="choose-options-grid">
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Zero balance current account option</p></div>
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Dedicated business banking team</p></div>
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Priority customer service</p></div>
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Customized financial solutions</p></div>
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Business credit card with high limits</p></div>
          <div className="choose-option-card"><FaCheck className="check-icon" /><p>Integrated payment collection</p></div>
        </div>
        <button
          className="btn-primary schedule-btn"
          onClick={() => setShowPopup(true)}
        >
          Schedule a Consultation
        </button>
      </div>

      {/*Built for Business Success */}
      <div className="business-success-section">
        <h2 className="section-title">Built for Business Success</h2>
        <div className="success-cards-container">
          <div className="success-card setup-card">
            <div className="card-icon"><FaClock /></div>
            <h3>Quick Setup</h3>
            <p>Open your business account in 10 minutes</p>
          </div>
          <div className="success-card support-card">
            <div className="card-icon"><FaHeart /></div>
            <h3>Dedicated Support</h3>
            <p>Relationship manager for your business</p>
          </div>
          <div className="success-card growth-card">
            <div className="card-icon"><FaChartBar /></div>
            <h3>Growth Tools</h3>
            <p>Analytics to help your business grow</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}


      {/* <div class="trusted-section">
        <h2 class="trusted-title">Trusted by Millions</h2>
        <p class="trusted-subtitle">
          See what our customers have to say about their NeoBank experience
        </p>

        <div className="testimonial-cards-grid">

       
          <div className={`testimonial-card ${highlightedTestimonial === 1 ? "highlight" : ""}`}>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
            <p className="quote">"NeoBank transformed how I manage my business finances. The instant loan approval helped me expand my boutique at the perfect time!"</p>
            <div className="customer-info"><div className="avatar">👩🏻‍💼</div>
              <div className="details"><p className="name">Priya Sharma</p><p className="title">Small Business Owner</p></div>
            </div>
          </div>

         
          <div className={`testimonial-card ${highlightedTestimonial === 2 ? "highlight" : ""}`}>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
            <p className="quote">"Best banking experience ever! Zero balance account, amazing credit card rewards, and customer service that actually cares."</p>
            <div className="customer-info"><div className="avatar">👨🏻‍💻</div>
              <div className="details"><p className="name">Rajesh Kumar</p><p className="title">IT Professional</p></div>
            </div>
          </div>

          
          <div className={`testimonial-card ${highlightedTestimonial === 3 ? "highlight" : ""}`}>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
            <p className="quote">"The mobile app is incredibly intuitive. I can manage everything from payments to investments without visiting a branch."</p>
            <div className="customer-info"><div className="avatar">👩🏻‍🎨</div>
              <div className="details"><p className="name">Anita Desai</p><p className="title">Freelance Designer</p></div>
            </div>
          </div>

          
          <div className={`testimonial-card ${highlightedTestimonial === 4 ? "highlight" : ""}`}>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
            <p className="quote">"NeoBank's business banking solutions are perfect for startups. Quick setup, great support, and tools that scale with growth."</p>
            <div className="customer-info"><div className="avatar">👨🏻‍💼</div>
              <div className="details"><p className="name">Vikram Patel</p><p className="title">Startup Founder</p></div>
            </div>
          </div>
        </div>
      </div> */}

    
      {/* <div className="cta-transform-section">
        <h1>Ready to Transform Your Banking Experience?</h1>
        <p>Join millions of Indians who are already banking smarter with NeoBank. Open your account in just 5 minutes!</p>
        <div className="cta-buttons">
          <button className="btn-cta-open">Open Account Now <span className="arrow">→</span></button>
          <button className="btn-cta-download"><FaDownload /> Download App</button>
        </div>
        <div className="cta-features">
          <p><FaCheck /> No paperwork</p>
          <p><FaCheck /> 100% digital</p>
          <p><FaCheck /> Instant approval</p>
        </div>
      </div> */}
    </div>
  )
};





export default Business;
