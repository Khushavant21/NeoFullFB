import React, { useState, useEffect, useRef } from "react";
import "./styles/HeroSection.css";

// Images
import homeLoanImg from "../assets/NCard_01.jpg";
import savingImg from "../assets/NCard_02.jpg";
import creditImg from "../assets/NCard_03.jpg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const trackRef = useRef(null);

  const slides = [
    { img: homeLoanImg, title: "🏠 Your dream home, your pride", desc: "Turn your dream into reality with a NeoBank Home Loan", btn: "Apply Now" },
    { img: savingImg, title: "💰 Saving, Demand & Trading", desc: "Make banking & trading easy with NeoBank", btn: "Apply Now" },
    { img: creditImg, title: "💳 Dine with UPI on Credit Cards", desc: "Smart payments, rewards & convenience", btn: "Apply Now" },
  ];

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Drag/Touch events
  const touchStart = (index) => (event) => {
    setIsDragging(true);
    setStartPos(getPositionX(event));
    trackRef.current.classList.add("herosection-dragging");
  };

  const touchMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const touchEnd = () => {
    setIsDragging(false);
    trackRef.current.classList.remove("herosection-dragging");
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) handleNext();
    else if (movedBy > 50) handlePrev();
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const getPositionX = (event) => (event.type.includes("mouse") ? event.pageX : event.touches[0].clientX);

  // Click handlers
  const handleSearch = () => alert("Search clicked!");
  const handleServiceClick = (service) => alert(`${service} clicked!`);
  const handleApply = (slide) => alert(`${slide.title} Apply clicked!`);
  const handleOfferApply = () => alert("Offer Apply clicked!");
  const handleOfferDetails = () => alert("Offer Details clicked!");

  return (
    <section id="home" className="herosection-hero">
      {/* Animated background layers */}
      <div className="herosection-bg-layer"></div>
      <div className="herosection-floating-orbs">
        <span className="herosection-orb herosection-o1"></span>
        <span className="herosection-orb herosection-o2"></span>
        <span className="herosection-orb herosection-o3"></span>
        <span className="herosection-orb herosection-o4"></span>
        <span className="herosection-orb herosection-o5"></span>
        <span className="herosection-orb herosection-o6"></span>
      </div>

      <div className="herosection-hero-inner">
        {/* Left Column */}
        <div className="herosection-hero-left">
          <h1 className="herosection-hero-title">Truth, Trust, Transparency</h1>
          <p className="herosection-hero-sub">
            Banking reimagined — fast, simple & secure with NeoBank 24/7.
          </p>

          {/* Search */}
          <div className="herosection-search-wrap">
            <input className="herosection-search-input" placeholder='Search for "Fixed Deposit"' />
            <button className="herosection-search-btn" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Services */}
          <div className="herosection-service-grid">
            {["Accounts", "Cards", "Loans", "Deposits", "Investment", "Support"].map((service) => (
              <button key={service} className="herosection-service-btn" onClick={() => handleServiceClick(service)}>
                {service}
              </button>
            ))}
          </div>

          {/* Offers */}
          <div className="herosection-offers">
            <h4>✨ Offers for You</h4>
            <div className="herosection-offer-card">
              <div className="herosection-offer-img">
                <div className="herosection-offer-badge">NEW</div>
              </div>
              <div className="herosection-offer-text">
                <strong>Credit Card for you!</strong>
                <p>Enjoy discounts on dining, movies & more.</p>
                <div className="herosection-offer-links">
                  <a href="#apply" onClick={handleOfferApply}>APPLY</a> •{" "}
                  <a href="#details" onClick={handleOfferDetails}>DETAILS</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Carousel */}
        <div className="herosection-hero-right">
          <div
            className="herosection-carousel"
            onMouseDown={touchStart(currentSlide)}
            onMouseMove={touchMove}
            onMouseUp={touchEnd}
            onMouseLeave={() => isDragging && touchEnd()}
            onTouchStart={touchStart(currentSlide)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            <div
              ref={trackRef}
              className="herosection-carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%) translateX(${currentTranslate}px)`,
                transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            >
              {slides.map((slide, idx) => (
                <div className="herosection-carousel-slide" key={idx}>
                  <div className="herosection-stilt-container">
                    <img src={slide.img} alt={slide.title} />
                    <div className="herosection-slide-overlay">
                      <div className="herosection-slide-content">
                        <h3>{slide.title}</h3>
                        <p>{slide.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="herosection-promo-content">
                    <h3 className="herosection-promo-title">{slide.title}</h3>
                    <p>{slide.desc}</p>
                    <button
                      className="herosection-apply-btn"
                      onClick={() => handleApply(slide)}
                    >
                      {slide.btn}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button className="herosection-carousel-btn herosection-left" onClick={handlePrev}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="herosection-carousel-btn herosection-right" onClick={handleNext}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Dots */}
            <div className="herosection-carousel-dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`herosection-dot ${idx === currentSlide ? "herosection-active" : ""}`}
                  onClick={() => setCurrentSlide(idx)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}