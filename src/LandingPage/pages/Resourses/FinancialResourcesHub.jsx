import React, { useState } from 'react';
import { 
  BookOpen, Video, Calculator, TrendingUp, Download, ExternalLink, 
  FileText, Newspaper, Zap, PiggyBank, Shield, Headphones, 
  ChevronDown, ChevronUp, Play, Clock, FileDown, Sparkles 
} from 'lucide-react';
import './FinancialResourcesHub.css';

const FinancialResourcesHub = () => {
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [email, setEmail] = useState('');

  const financialGuides = [
    { title: "Beginner's Guide to Banking", type: "PDF", size: "2.5 MB", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" },
    { title: "Investment Strategies 2025", type: "PDF", size: "3.1 MB", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
    { title: "Tax Planning Guide", type: "PDF", size: "1.8 MB", img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop" },
    { title: "Home Loan Application Guide", type: "PDF", size: "2.2 MB", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" },
  ];

  const videoTutorials = [
    { title: "How to Open a Digital Account", type: "Video", duration: "5:30", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&h=400&fit=crop" },
    { title: "Using Mobile Banking", type: "Video", duration: "8:15", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop" },
    { title: "Understanding Credit Scores", type: "Video", duration: "12:45", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
    { title: "Investment Portfolio Basics", type: "Video", duration: "15:20", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop" },
  ];

  const financialTools = [
    { title: "EMI Calculator", type: "Tool", size: "Launch", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop" },
    { title: "Investment Calculator", type: "Tool", size: "Launch", img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop" },
    { title: "Tax Calculator", type: "Tool", size: "Launch", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop" },
    { title: "Retirement Planner", type: "Tool", size: "Launch", img: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&h=400&fit=crop" },
  ];

  const marketInsights = [
    { title: "Monthly Market Report - Oct 2025", type: "Report", size: "4.2 MB", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
    { title: "Economic Outlook 2025", type: "Report", size: "5.8 MB", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
    { title: "Investment Opportunities", type: "Report", size: "3.5 MB", img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop" },
    { title: "Sector Analysis", type: "Report", size: "2.9 MB", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
  ];

  const allArticles = [
    { category: 'Personal Finance', title: 'Top 10 Ways to Save Money in 2025', date: 'Oct 8, 2025', readTime: '5 min read', img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop" },
    { category: 'Security', title: 'Understanding Digital Banking Security', date: 'Oct 5, 2025', readTime: '8 min read', img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop" },
    { category: 'Investment', title: 'Investment Tips for Young Professionals', date: 'Oct 2, 2025', readTime: '10 min read', img: "https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=600&h=400&fit=crop" },
    { category: 'Savings', title: 'How to Build an Emergency Fund', date: 'Sep 28, 2025', readTime: '6 min read', img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop" },
    { category: 'Personal Finance', title: 'Budget Planning Made Simple', date: 'Sep 25, 2025', readTime: '7 min read', img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" },
    { category: 'Investment', title: 'Understanding Mutual Funds', date: 'Sep 20, 2025', readTime: '9 min read', img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
    { category: 'Security', title: 'Protecting Your Financial Data Online', date: 'Sep 15, 2025', readTime: '6 min read', img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop" },
    { category: 'Savings', title: 'Smart Ways to Maximize Your Savings', date: 'Sep 10, 2025', readTime: '5 min read', img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&h=400&fit=crop" },
    { category: 'Investment', title: 'Stock Market Basics for Beginners', date: 'Sep 5, 2025', readTime: '12 min read', img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop" },
    { category: 'Personal Finance', title: 'Managing Credit Cards Responsibly', date: 'Sep 1, 2025', readTime: '8 min read', img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&h=400&fit=crop" },
    { category: 'Security', title: 'Two-Factor Authentication Explained', date: 'Aug 28, 2025', readTime: '5 min read', img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop" },
    { category: 'Savings', title: 'Best High-Yield Savings Accounts', date: 'Aug 25, 2025', readTime: '7 min read', img: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=400&fit=crop" }
  ];

  const features = [
    { icon: Zap, title: "Instant Transfers", text: "Send and receive money instantly with zero fees. Lightning-fast transactions 24/7." },
    { icon: PiggyBank, title: "High-Yield Savings", text: "Earn up to 4.5% APY on your savings with no minimum balance requirements." },
    { icon: Shield, title: "Bank-Level Security", text: "FDIC insured up to $250k with 256-bit encryption and biometric authentication." },
    { icon: Headphones, title: "24/7 Support", text: "Real human support whenever you need it. Chat, call, or email - we're always here." },
  ];

  const displayedArticles = showAllArticles ? allArticles : allArticles.slice(0, 4);

  const ResourceCard = ({ icon: Icon, title, resources }) => (
    <div className="frh-resource-card">
      <div className="frh-resource-card__glow"></div>
      <div className="frh-resource-card__body">
        <div className="frh-resource-card__header">
          <div className="frh-resource-card__icon-wrapper">
            <Icon size={32} className="frh-resource-card__icon" />
          </div>
          <h2 className="frh-resource-card__title">{title}</h2>
        </div>
        <div className="frh-resource-card__list">
          {resources.map((res, index) => (
            <div key={index} className="frh-resource-item">
              <div className="frh-resource-item__glow"></div>
              <div className="frh-resource-item__content">
                <div className="frh-resource-item__inner">
                  <div className="frh-resource-item__img-wrapper">
                    <img 
                      src={res.img} 
                      alt={res.title} 
                      className="frh-resource-item__img" 
                    />
                    <div className="frh-resource-item__overlay"></div>
                    {res.type === 'Video' && (
                      <div className="frh-resource-item__video-play">
                        <div className="frh-resource-item__play-btn">
                          <Play size={20} className="frh-resource-item__play-icon" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    {res.type === 'PDF' && (
                      <div className="frh-resource-item__pdf-badge">
                        <FileDown size={18} className="frh-resource-item__pdf-icon" />
                      </div>
                    )}
                  </div>
                  <div className="frh-resource-item__text">
                    <h4 className="frh-resource-item__title">{res.title}</h4>
                    <div className="frh-resource-item__meta">
                      <span className="frh-resource-item__badge">
                        {res.type === 'Video' ? <Clock size={14} /> : <FileText size={14} />}
                        {res.type}
                      </span>
                      <span className="frh-resource-item__size">{res.size || res.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="frh-resource-item__link-btn">
                  <ExternalLink size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="frh">
      {/* Hero Section */}
      <section className="frh-hero">
        <div className="frh-hero__orb frh-hero__orb--primary"></div>
        <div className="frh-hero__orb frh-hero__orb--secondary"></div>
        
        <div className="frh-hero__content">
          <div className="frh-hero__badge">
            <Sparkles size={20} className="frh-hero__badge-icon" />
            <span className="frh-hero__badge-text">Your Financial Success Starts Here</span>
          </div>
          <h1 className="frh-hero__title">Financial Resources Hub</h1>
          <p className="frh-hero__subtitle">
            Expert guides, tools, and insights to help you make <span className="frh-hero__highlight">smarter financial decisions</span>
          </p>
          <div className="frh-hero__actions">
            <button className="frh-btn frh-btn--primary">
              <Download size={24} className="frh-btn__icon" />
              <span className="frh-btn__text">Download Resources</span>
            </button>
            <button className="frh-btn frh-btn--secondary">
              <BookOpen size={24} className="frh-btn__icon" />
              <span className="frh-btn__text">Browse Guides</span>
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="frh-section">
        <div className="frh-section__container">
          <div className="frh-section__header">
            <div className="frh-section__badge">
              <Sparkles size={18} />
              <span>Explore Resources</span>
            </div>
            <h2 className="frh-section__title">Everything You Need</h2>
            <p className="frh-section__subtitle">Navigate your financial journey with confidence</p>
          </div>

          <div className="frh-resources__grid">
            <ResourceCard icon={BookOpen} title="Financial Guides" resources={financialGuides} />
            <ResourceCard icon={Video} title="Video Tutorials" resources={videoTutorials} />
          </div>

          <div className="frh-resources__grid">
            <ResourceCard icon={Calculator} title="Financial Tools" resources={financialTools} />
            <ResourceCard icon={TrendingUp} title="Market Insights" resources={marketInsights} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="frh-features">
        <div className="frh-features__container">
          <div className="frh-section__header">
            <h2 className="frh-features__title">Everything You Need to Thrive</h2>
            <p className="frh-features__subtitle">Modern banking features designed for your success</p>
          </div>

          <div className="frh-features__grid">
            {features.map((feature, index) => (
              <div key={index} className="frh-feature">
                <div className="frh-feature__glow"></div>
                <div className="frh-feature__card">
                  <div className="frh-feature__icon-wrapper">
                    <feature.icon size={36} className="frh-feature__icon" />
                  </div>
                  <h3 className="frh-feature__title">{feature.title}</h3>
                  <p className="frh-feature__text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="frh-articles">
        <div className="frh-articles__container">
          <div className="frh-section__header">
            <div className="frh-section__badge">
              <Newspaper size={18} />
              <span>Insights & Articles</span>
            </div>
            <h2 className="frh-section__title">Latest Financial Insights</h2>
            <p className="frh-section__subtitle">Stay informed with expert articles and industry trends</p>
          </div>

          <div className="frh-articles__grid">
            {displayedArticles.map((article, index) => (
              <div key={index} className="frh-article">
                <div className="frh-article__glow"></div>
                <div className="frh-article__card">
                  <div className="frh-article__img-wrapper">
                    <img src={article.img} alt={article.title} className="frh-article__img" />
                    <div className="frh-article__overlay"></div>
                    <div className="frh-article__badge">
                      <span className="frh-article__badge-text">{article.category}</span>
                    </div>
                  </div>
                  <div className="frh-article__content">
                    <h3 className="frh-article__title">{article.title}</h3>
                    <div className="frh-article__meta">
                      <span className="frh-article__date">{article.date}</span>
                      <span className="frh-article__time">{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="frh-articles__cta">
            <button
              onClick={() => setShowAllArticles(!showAllArticles)}
              className="frh-btn frh-btn--action"
            >
              <Newspaper size={24} className="frh-btn__icon" />
              <span className="frh-btn__text">{showAllArticles ? 'Show Less' : 'View All Articles'}</span>
              {showAllArticles ? 
                <ChevronUp size={22} className="frh-btn__icon" /> : 
                <ChevronDown size={22} className="frh-btn__icon" />
              }
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="frh-subscribe">
        <div className="frh-subscribe__orb frh-subscribe__orb--left"></div>
        <div className="frh-subscribe__orb frh-subscribe__orb--right"></div>
        
        <div className="frh-subscribe__container">
          <div className="frh-subscribe__badge">
            <Sparkles size={18} />
            <span>Newsletter</span>
          </div>
          <h2 className="frh-subscribe__title">Stay Updated</h2>
          <p className="frh-subscribe__text">
            Subscribe to receive the latest financial resources and insights <span className="frh-subscribe__highlight">directly to your inbox</span>
          </p>
          
          <div className="frh-subscribe__form-wrapper">
            <div className="frh-subscribe__form-glow"></div>
            <div className="frh-subscribe__form">
              <div className="frh-subscribe__form-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="frh-subscribe__input"
                />
                <button className="frh-btn frh-btn--action">
                  <span className="frh-btn__text">Subscribe</span>
                  <ExternalLink size={20} className="frh-btn__icon" />
                </button>
              </div>
            </div>
          </div>

          <p className="frh-subscribe__stats">
            Join <span className="frh-subscribe__count">50,000+</span> subscribers who trust us for financial insights
          </p>
        </div>
      </section>
    </div>
  );
};

export default FinancialResourcesHub;