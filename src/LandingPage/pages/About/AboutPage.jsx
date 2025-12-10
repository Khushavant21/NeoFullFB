import React, { useState, useEffect } from 'react';
import { Users, Building2, Award, TrendingUp, Lock, Lightbulb, FileText, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {

  const stats = [
    { value: '10M+', label: 'Active Customers', icon: Users, delay: 0 },
    { value: '500+', label: 'Branches Nationwide', icon: Building2, delay: 0.1 },
    { value: '50+', label: 'Industry Awards', icon: Award, delay: 0.2 },
    { value: '₹50K Cr', label: 'Assets Under Management', icon: TrendingUp, delay: 0.3 }
  ];

  const values = [
    { title: 'Customer First', desc: 'Every decision guided by what\'s best for our customers', icon: Shield },
    { title: 'Trust & Security', desc: 'Bank-grade encryption and industry-leading security', icon: Lock },
    { title: 'Innovation', desc: 'Cutting-edge technology for modern banking needs', icon: Lightbulb },
    { title: 'Transparency', desc: 'No hidden fees, clear and honest communication', icon: FileText }
  ];

  const leaders = [
    { 
      name: 'Rajesh Sharma', 
      role: 'Chief Executive Officer', 
      desc: '15+ years in fintech and banking innovation', 
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' 
    },
    { 
      name: 'Priya Patel', 
      role: 'Chief Technology Officer', 
      desc: 'Expert in digital banking and cybersecurity', 
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' 
    },
    { 
      name: 'Amit Kumar', 
      role: 'Chief Financial Officer', 
      desc: 'Former VP at leading investment bank', 
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' 
    },
    { 
      name: 'Sneha Reddy', 
      role: 'Chief Customer Officer', 
      desc: 'Passionate about exceptional customer experience', 
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' 
    }
  ];

  const milestones = [
    { year: '2015', title: 'Founded', desc: 'NeoBank journey begins' },
    { year: '2017', title: '1M Users', desc: 'Reached first million' },
    { year: '2020', title: '100+ Awards', desc: 'Industry recognition' },
    { year: '2025', title: '10M+ Users', desc: 'Leading digital bank' }
  ];

  return (
    <div className="about-wrapper">
      {/* Animated Background */}
      <div className="about-animated-bg">
        <div className="about-bg-blob about-blob-1"></div>
        <div className="about-bg-blob about-blob-2"></div>
        <div className="about-bg-blob about-blob-3"></div>
      </div>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="about-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="about-hero-content">
          <div className="about-badge">
            <Star size={16} />
            <span>India's Most Trusted Digital Bank</span>
          </div>
          
          <h1 className="about-hero-title">
            <span className="about-gradient-text">Banking for the</span>
            <br />
            <span className="about-hero-title-highlight">Digital Generation</span>
          </h1>
          
          <p className="about-hero-subtitle">
            We're transforming how people interact with their money, making banking simple, 
            transparent, and accessible for everyone across India
          </p>
          
          <div className="about-hero-buttons">
            <button className="about-btn about-btn-primary">
              Open Account Now
              <ArrowRight size={20} />
            </button>
            <button className="about-btn about-btn-secondary">
              Explore Features
            </button>
          </div>
          
          <div className="about-trust-badges">
            <div className="about-trust-badge">
              <CheckCircle size={20} />
              <span>RBI Approved</span>
            </div>
            <div className="about-trust-badge">
              <CheckCircle size={20} />
              <span>100% Secure</span>
            </div>
            <div className="about-trust-badge">
              <CheckCircle size={20} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="about-hero-image-container">
          <div className="about-hero-image-decorations">
            <div className="about-decoration-circle about-circle-1"></div>
            <div className="about-decoration-circle about-circle-2"></div>
            <div className="about-decoration-square about-square-1"></div>
          </div>
          <div className="about-hero-image">
            <div className="about-hero-image-glow"></div>
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&h=700&fit=crop" 
              alt="Digital Banking Innovation"
              className="about-hero-img"
            />
            <div className="about-hero-image-overlay"></div>
          </div>
          <div className="about-floating-card about-card-1">
            <div className="about-card-icon">💳</div>
            <div className="about-card-text">Instant Payments</div>
          </div>
          <div className="about-floating-card about-card-2">
            <div className="about-card-icon">🔒</div>
            <div className="about-card-text">100% Secure</div>
          </div>
          <div className="about-floating-card about-card-3">
            <div className="about-card-icon">📊</div>
            <div className="about-card-text">Smart Analytics</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section" data-animate id="stats">
        <div className="about-container">
          <div className="about-stats-grid">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="about-stat-card about-animate-scale"
                  style={{ animationDelay: `${stat.delay}s` }}
                >
                  <div className="about-stat-icon">
                    <Icon size={40} />
                  </div>
                  <h3 className="about-stat-value">{stat.value}</h3>
                  <p className="about-stat-label">{stat.label}</p>
                  <div className="about-stat-progress"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story-section" data-animate id="story">
        <div className="about-container">
          <div className="about-story-header">
            <h2 className="about-section-title-center">Our Story</h2>
            <div className="about-divider-center"></div>
            <p className="about-story-intro">The journey that transformed Indian banking</p>
          </div>

          <div className="about-story-content-wrapper">
            <div className="about-story-text-container">
              <div className="about-story-paragraph">
                <div className="about-paragraph-number">01</div>
                <div className="about-paragraph-content">
                  <h3 className="about-paragraph-title">The Beginning</h3>
                  <p className="about-paragraph-text">
                    NeoBank was born from a simple belief: banking should be easy, transparent, 
                    and built for today's digital world. In 2015, a group of banking and technology 
                    experts came together with a vision to transform how people interact with their money.
                  </p>
                </div>
              </div>

              <div className="about-story-paragraph">
                <div className="about-paragraph-number">02</div>
                <div className="about-paragraph-content">
                  <h3 className="about-paragraph-title">The Challenge</h3>
                  <p className="about-paragraph-text">
                    Traditional banking was complex, time-consuming, and often frustrating. We saw an 
                    opportunity to leverage technology to create a better experience—one that puts 
                    customers first and makes financial management simple and accessible to everyone.
                  </p>
                </div>
              </div>

              <div className="about-story-paragraph">
                <div className="about-paragraph-number">03</div>
                <div className="about-paragraph-content">
                  <h3 className="about-paragraph-title">Today & Beyond</h3>
                  <p className="about-paragraph-text">
                    Today, we serve over 10 million customers across India, offering everything from 
                    zero-balance savings accounts to business banking solutions, all through our 
                    innovative digital platform. But we're just getting started.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-story-visual">
              <div className="about-milestone-timeline">
                <div className="about-timeline-line"></div>
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="about-milestone-item">
                    <div className="about-milestone-dot"></div>
                    <div className="about-milestone-content">
                      <div className="about-milestone-year">{milestone.year}</div>
                      <h4 className="about-milestone-title">{milestone.title}</h4>
                      <p className="about-milestone-desc">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section" data-animate id="values">
        <div className="about-container">
          <h2 className="about-section-title-center">Our Core Values</h2>
          <div className="about-divider-center"></div>
          <p className="about-section-subtitle">
            The principles that guide everything we do
          </p>
          
          <div className="about-values-grid">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="about-value-card about-animate-slide-up">
                  <div className="about-value-icon">
                    <Icon size={36} />
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.desc}</p>
                  <div className="about-value-glow"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="about-leadership-section" data-animate id="leadership">
        <div className="about-container">
          <h2 className="about-section-title-center">Meet Our Leadership</h2>
          <div className="about-divider-center"></div>
          <p className="about-section-subtitle">
            Experienced leaders driving innovation in banking
          </p>
          
          <div className="about-leadership-grid">
            {leaders.map((leader, idx) => (
              <div key={idx} className="about-leader-card about-animate-scale">
                <div className="about-leader-image-wrapper">
                  <img 
                    src={leader.img} 
                    alt={leader.name}
                    className="about-leader-image"
                  />
                  <div className="about-leader-image-overlay"></div>
                </div>
                <div className="about-leader-info">
                  <h3 className="about-leader-name">{leader.name}</h3>
                  <p className="about-leader-role">{leader.role}</p>
                  <p className="about-leader-desc">{leader.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2 className="about-cta-title">
            Ready to Start Your Journey?
          </h2>
          <p className="about-cta-subtitle">
            Join millions of satisfied customers. Open your account in minutes.
          </p>
          <div className="about-cta-buttons">
            <button className="about-btn about-btn-primary about-btn-large">
              Open Account Now
              <ArrowRight size={22} />
            </button>
            <button className="about-btn about-btn-secondary about-btn-large">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;