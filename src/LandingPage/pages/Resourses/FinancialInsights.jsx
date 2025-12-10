import React, { useState } from 'react';
import { FaNewspaper } from "react-icons/fa";
import './style/FinancialInsights.css';

const FinancialInsights = () => {
  const [showAll, setShowAll] = useState(false);

  const allArticles = [
    {
      category: 'Personal Finance',
      title: 'Top 10 Ways to Save Money in 2025',
      date: 'Oct 8, 2025',
      readTime: '5 min read'
    },
    {
      category: 'Security',
      title: 'Understanding Digital Banking Security',
      date: 'Oct 5, 2025',
      readTime: '8 min read'
    },
    {
      category: 'Investment',
      title: 'Investment Tips for Young Professionals',
      date: 'Oct 2, 2025',
      readTime: '10 min read'
    },
    {
      category: 'Savings',
      title: 'How to Build an Emergency Fund',
      date: 'Sep 28, 2025',
      readTime: '6 min read'
    },
    {
      category: 'Personal Finance',
      title: 'Budget Planning Made Simple',
      date: 'Sep 25, 2025',
      readTime: '7 min read'
    },
    {
      category: 'Investment',
      title: 'Understanding Mutual Funds',
      date: 'Sep 20, 2025',
      readTime: '9 min read'
    },
    {
      category: 'Security',
      title: 'Protecting Your Financial Data Online',
      date: 'Sep 15, 2025',
      readTime: '6 min read'
    },
    {
      category: 'Savings',
      title: 'Smart Ways to Maximize Your Savings',
      date: 'Sep 10, 2025',
      readTime: '5 min read'
    },
    {
      category: 'Investment',
      title: 'Stock Market Basics for Beginners',
      date: 'Sep 5, 2025',
      readTime: '12 min read'
    },
    {
      category: 'Personal Finance',
      title: 'Managing Credit Cards Responsibly',
      date: 'Sep 1, 2025',
      readTime: '8 min read'
    },
    {
      category: 'Security',
      title: 'Two-Factor Authentication Explained',
      date: 'Aug 28, 2025',
      readTime: '5 min read'
    },
    {
      category: 'Savings',
      title: 'Best High-Yield Savings Accounts',
      date: 'Aug 25, 2025',
      readTime: '7 min read'
    }
  ];

  const displayedArticles = showAll ? allArticles : allArticles.slice(0, 4);

  return (
    <div className="insights-section">
      <div className="insights-header">
        <h2 className="insights-title">Latest Financial Insights</h2>
        <p className="insights-subtitle">
          Stay informed with expert articles and industry trends
        </p>
      </div>

      <div className="insights-grid">
        {displayedArticles.map((article, index) => (
          <div className="insight-card" key={index}>
            <span className="insight-category">{article.category}</span>
            <h3 className="insight-title">{article.title}</h3>
            <div className="insight-meta">
              <span className="insight-date">{article.date}</span>
              <span className="insight-read-time">{article.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="insights-cta">
        <button 
          className="view-all-btn" 
          onClick={() => setShowAll(!showAll)}
        >
          <FaNewspaper size={20} />
          {showAll ? 'Show Less' : 'View All Articles'}
        </button>
      </div>
    </div>
  );
};

export default FinancialInsights;