import React, { useState, useEffect } from 'react';
import './nshop.css';

const NShop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const categories = [
    { id: 'all', name: 'All Offers', icon: '🎁' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ];

  const backgroundImages = [
    { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop', name: 'Travel', icon: '✈️' },
    { url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop', name: 'Shopping', icon: '🛍️' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop', name: 'Dining', icon: '🍽️' },
    { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop', name: 'Entertainment', icon: '🎬' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleButtonClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const offers = [
    { id: 1, category: 'travel', title: 'Flight Bookings', subtitle: 'Earn up to 12X Rewards', discount: 'Up to ₹5,000 Off', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&crop=center', color: '#4A90E2' },
    { id: 2, category: 'travel', title: 'Hotel Stays', subtitle: 'Exclusive Hotel Deals', discount: 'Flat 20% Off', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center', color: '#E94B3C' },
    { id: 3, category: 'travel', title: 'Bus Tickets', subtitle: 'Travel Comfortably', discount: '15% Cashback', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&crop=center', color: '#F39C12' },
    { id: 4, category: 'shopping', title: 'Fashion Vouchers', subtitle: 'Top Fashion Brands', discount: '₹500 Voucher', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center', color: '#9B59B6' },
    { id: 5, category: 'shopping', title: 'Electronics', subtitle: 'Latest Gadgets', discount: 'Up to 30% Off', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&crop=center', color: '#1ABC9C' },
    { id: 6, category: 'shopping', title: 'Home & Living', subtitle: 'Decor & Essentials', discount: '25% Off', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop&crop=center', color: '#E67E22' },
    { id: 7, category: 'dining', title: 'Fine Dining', subtitle: 'Premium Restaurants', discount: '40% Off', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&crop=center', color: '#C0392B' },
    { id: 8, category: 'dining', title: 'Food Delivery', subtitle: 'Your Favorite Cuisine', discount: 'Free Delivery', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&crop=center', color: '#27AE60' },
    { id: 9, category: 'entertainment', title: 'Movie Tickets', subtitle: 'Latest Blockbusters', discount: 'Buy 1 Get 1', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop&crop=center', color: '#8E44AD' },
    { id: 10, category: 'entertainment', title: 'OTT Subscriptions', subtitle: 'Stream Unlimited', discount: '3 Months Free', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop&crop=center', color: '#E74C3C' },
    { id: 11, category: 'entertainment', title: 'Gaming Vouchers', subtitle: 'Top Gaming Platforms', discount: '₹1,000 Bonus', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=center', color: '#3498DB' },
    { id: 12, category: 'shopping', title: 'Grocery Vouchers', subtitle: 'Daily Essentials', discount: '₹300 Off', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&crop=center', color: '#16A085' }
  ];

  const filteredOffers = activeCategory === 'all' ? offers : offers.filter(offer => offer.category === activeCategory);

  return (
    <div className="nshop-container">
      {showMessage && (
        <div className="message-overlay">
          <div className="message-box">
            <div className="message-icon">🏦</div>
            <h2 className="message-title">Welcome to Neo Bank!</h2>
            <p className="message-text">
              To enjoy exclusive offers and rewards, you need to create an account in our bank and login with your credentials.
            </p>
            <span className="message-highlight">Enjoy our NeoBank N-Shop! 🎉</span>
          </div>
        </div>
      )}

      <div className="hero-section">
        <div className="hero-bg-wrapper">
          {backgroundImages.map((bg, index) => (
            <img
              key={index}
              src={bg.url}
              alt={bg.name}
              className={`hero-bg-image ${index === currentBgIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="category-label">
          <span className="category-label-icon">{backgroundImages[currentBgIndex].icon}</span>
          <span>{backgroundImages[currentBgIndex].name}</span>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to NShop</h1>
            <p className="hero-subtitle">Earn Reward Points on Every Purchase</p>
            <div className="hero-features">
              {[
                { icon: '⚡', text: '12X Rewards' },
                { icon: '🎯', text: 'Exclusive Offers' },
                { icon: '💳', text: 'Instant Discounts' }
              ].map((feature, idx) => (
                <div key={idx} className="feature-badge" onClick={handleButtonClick}>
                  <span className="feature-icon">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            <button className="hero-cta-btn" onClick={handleButtonClick}>Start Shopping Now</button>
          </div>
        </div>
      </div>

      <div className="why-choose-section">
        <h2 className="section-heading">Why Choose NShop?</h2>
        <p className="section-description">
          Experience the best deals, exclusive rewards, and seamless shopping with NShop. Your trusted partner for all your shopping needs.
        </p>
        <div className="benefits-grid">
          {[
            { icon: '🎁', title: 'Exclusive Deals', desc: 'Get access to premium offers and discounts' },
            { icon: '💰', title: 'Cashback Rewards', desc: 'Earn rewards on every transaction you make' },
            { icon: '⚡', title: 'Instant Savings', desc: 'Save more with instant discounts and offers' },
            { icon: '🔒', title: 'Secure Payments', desc: 'Shop safely with our encrypted payment system' }
          ].map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-container">
        <h2 className="categories-title">
          Explore Categories
          <div className="title-underline"></div>
        </h2>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            >
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="offers-container">
        <div className="offers-header">
          <h2 className="offers-title">Featured Offers</h2>
          <p className="offers-subtitle">Choose from our exclusive deals and start saving today</p>
        </div>
        <div className="offers-grid">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image-wrapper">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <div className="offer-discount-badge">{offer.discount}</div>
              </div>
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-subtitle">{offer.subtitle}</p>
                <div className="offer-footer">
                  <div className="offer-category-tag">{offer.category}</div>
                  <button className="offer-shop-btn">
                    Shop Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="final-cta-section">
        <h2 className="final-cta-title">Ready to Start Shopping?</h2>
        <p className="final-cta-text">
          Join thousands of happy customers earning rewards on every purchase. Start your shopping journey with NShop today!
        </p>
        <button className="final-cta-btn" onClick={handleButtonClick}>
          Get Started Today
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NShop;