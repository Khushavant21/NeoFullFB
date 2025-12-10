import React, { useState } from 'react';
import './HelpPage.css';


const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone Support',
      detail: '1800-123-4567',
      subtext: 'Available 24/7',
      buttonText: 'Call Now',
      action: () => window.open('tel:18001234567')
    },
    {
      icon: '✉️',
      title: 'Email Support',
      detail: 'support@neobank.com',
      subtext: 'Response within 24h',
      buttonText: 'Send Email',
      action: () => window.open('mailto:support@neobank.com')
    },
    {
      icon: '💬',
      title: 'Live Chat',
      detail: 'Chat with us now',
      subtext: 'Instant support',
      buttonText: 'Start Chat',
      action: () => alert('Live chat feature coming soon!')
    },
    {
      icon: '🕐',
      title: 'Branch Visit',
      detail: 'Visit us in person',
      subtext: 'Mon-Sat: 9 AM - 6 PM',
      buttonText: 'Find Branch',
      action: () => alert('Branch locator coming soon!')
    }
  ];

  const helpTopics = [
    {
      icon: '❓',
      title: 'Account Management',
      items: [
        'How to open a new account',
        'Update personal information',
        'Account verification process',
        'Close or deactivate account'
      ]
    },
    {
      icon: '💳',
      title: 'Transactions & Payments',
      items: [
        'Failed transaction troubleshooting',
        'Set up automatic payments',
        'Transaction limits and charges',
        'Request refund or dispute'
      ]
    },
    {
      icon: '💳',
      title: 'Cards & ATM',
      items: [
        'Block/unblock debit card',
        'Change ATM PIN',
        'Request new card',
        'International card usage'
      ]
    },
    {
      icon: '💰',
      title: 'Loans & Credit',
      items: [
        'Apply for personal loan',
        'EMI payment options',
        'Loan eligibility criteria',
        'Prepayment and foreclosure'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile & Internet Banking',
      items: [
        'Download mobile app',
        'Reset login password',
        'Enable biometric login',
        'Security and safety tips'
      ]
    },
    {
      icon: '🔧',
      title: 'Other Services',
      items: [
        'Tax documents and forms',
        'Interest certificates',
        'Cheque book request',
        'Branch locator'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I open a new account?',
      answer: 'You can open an account online in just 5 minutes. Simply click on "Open Account" and follow the steps with your basic details and documents.'
    },
    {
      question: 'What documents do I need?',
      answer: "You'll need a valid Aadhaar card, PAN card, and a recent photograph. All documents can be uploaded digitally."
    },
    {
      question: 'Is online banking safe?',
      answer: 'Yes! We use bank-grade 256-bit encryption and multi-factor authentication to keep your account secure.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email or phone number.'
    },
    {
      question: 'What are the transaction limits?',
      answer: 'Daily transaction limits vary based on your account type. You can check your specific limits in the account settings or contact our support team.'
    }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const styles = {
    helpPage: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 50px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '45px',
      height: '45px',
      backgroundColor: '#900603',
      color: '#fff',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    logoText: {
      lineHeight: '1.2'
    },
    logoTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333'
    },
    logoSubtitle: {
      margin: 0,
      fontSize: '12px',
      color: '#666'
    },
    nav: {
      display: 'flex',
      gap: '25px',
      alignItems: 'center'
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'color 0.3s'
    },
    activeLink: {
      color: '#900603',
      fontWeight: '600'
    },
    phone: {
      color: '#900603',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '600'
    },
    loginBtn: {
      backgroundColor: '#900603',
      color: '#fff',
      border: 'none',
      padding: '10px 25px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600'
    },
    heroSection: {
      backgroundColor: '#900603',
      color: '#fff',
      padding: '80px 20px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '48px',
      marginBottom: '15px',
      fontWeight: '700'
    },
    heroSubtitle: {
      fontSize: '18px',
      marginBottom: '40px',
      opacity: 0.95
    },
    searchBox: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: '50px',
      padding: '5px 25px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    searchIcon: {
      fontSize: '20px',
      marginRight: '15px',
      color: '#666'
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      flex: 1,
      padding: '15px',
      fontSize: '16px',
      color: '#333'
    },
    getInTouch: {
      padding: '80px 50px',
      backgroundColor: '#fff'
    },
    sectionTitle: {
      fontSize: '42px',
      textAlign: 'center',
      marginBottom: '15px',
      color: '#333',
      fontWeight: '700'
    },
    sectionSubtitle: {
      textAlign: 'center',
      color: '#666',
      fontSize: '16px',
      marginBottom: '50px'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    contactCard: {
      backgroundColor: '#f9f9f9',
      padding: '35px',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    },
    contactIcon: {
      fontSize: '50px',
      marginBottom: '20px',
      backgroundColor: '#ffe6e6',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    contactTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333'
    },
    contactDetail: {
      fontSize: '16px',
      color: '#900603',
      marginBottom: '8px',
      fontWeight: '500'
    },
    contactSubtext: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '20px'
    },
    contactBtn: {
      backgroundColor: 'transparent',
      color: '#900603',
      border: '2px solid #900603',
      padding: '10px 25px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s'
    },
    helpTopics: {
      padding: '80px 50px',
      backgroundColor: '#f5f5f5'
    },
    topicsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    topicCard: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s'
    },
    topicIcon: {
      fontSize: '40px',
      marginBottom: '15px',
      backgroundColor: '#ffe6e6',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    topicTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333'
    },
    topicList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    topicListItem: {
      color: '#666',
      marginBottom: '12px',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    faqSection: {
      padding: '80px 50px',
      backgroundColor: '#fff'
    },
    faqContainer: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    faqItem: {
      backgroundColor: '#f9f9f9',
      marginBottom: '15px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    },
    faqQuestion: {
      padding: '20px 25px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background-color 0.3s'
    },
    faqQuestionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      margin: 0
    },
    faqToggle: {
      fontSize: '28px',
      color: '#900603',
      fontWeight: 'bold',
      transition: 'transform 0.3s'
    },
    faqAnswer: {
      padding: '0 25px 20px',
      color: '#666',
      fontSize: '15px',
      lineHeight: '1.6',
      animation: 'fadeIn 0.3s ease-in'
    },
    stillNeedHelp: {
      backgroundColor: '#900603',
      color: '#fff',
      padding: '80px 50px',
      textAlign: 'center'
    },
    stillNeedHelpTitle: {
      fontSize: '42px',
      marginBottom: '15px',
      fontWeight: '700'
    },
    stillNeedHelpText: {
      fontSize: '18px',
      marginBottom: '40px',
      opacity: 0.95
    },
    helpActions: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryBtn: {
      backgroundColor: '#fff',
      color: '#900603',
      border: 'none',
      padding: '15px 40px',
      borderRadius: '30px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'transform 0.3s'
    },
    secondaryBtn: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '2px solid #fff',
      padding: '15px 40px',
      borderRadius: '30px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s'
    },
    footer: {
      backgroundColor: '#900603',
      padding: '40px 50px',
      borderTop: '1px solid rgba(255,255,255,0.2)'
    },
    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    footerText: {
      color: '#fff'
    },
    footerTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold'
    },
    footerSubtitle: {
      margin: '5px 0 0',
      fontSize: '14px',
      opacity: 0.9
    }
  };

  return (
    <div style={styles.helpPage}>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>How Can We Help You?</h1>
        <p style={styles.heroSubtitle}>Find answers to your questions or get in touch with our support team</p>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search for help articles, FAQs, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </section>

      {/* Get In Touch */}
      <section style={styles.getInTouch}>
        <h2 style={styles.sectionTitle}>Get In Touch</h2>
        <p style={styles.sectionSubtitle}>We're here to help you 24/7. Choose your preferred way to reach us.</p>
        <div style={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              style={styles.contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div style={styles.contactIcon}>{method.icon}</div>
              <h3 style={styles.contactTitle}>{method.title}</h3>
              <p style={styles.contactDetail}>{method.detail}</p>
              <p style={styles.contactSubtext}>{method.subtext}</p>
              <button 
                style={styles.contactBtn} 
                onClick={method.action}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#900603';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#900603';
                }}
              >
                {method.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Help Topics */}
      <section style={styles.helpTopics}>
        <h2 style={styles.sectionTitle}>Browse Help Topics</h2>
        <p style={styles.sectionSubtitle}>Find answers to commonly asked questions</p>
        <div style={styles.topicsGrid}>
          {helpTopics.map((topic, index) => (
            <div 
              key={index} 
              style={styles.topicCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.topicIcon}>{topic.icon}</div>
              <h3 style={styles.topicTitle}>{topic.title}</h3>
              <ul style={styles.topicList}>
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex} style={styles.topicListItem}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.faqSection}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p style={styles.sectionSubtitle}>Quick answers to common questions</p>
        <div style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <div 
                style={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <h3 style={styles.faqQuestionTitle}>{faq.question}</h3>
                <span style={{
                  ...styles.faqToggle,
                  transform: expandedFAQ === index ? 'rotate(180deg)' : 'rotate(0)'
                }}>
                  {expandedFAQ === index ? '−' : '+'}
                </span>
              </div>
              {expandedFAQ === index && (
                <div style={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help */}
      <section style={styles.stillNeedHelp}>
        <h2 style={styles.stillNeedHelpTitle}>Still Need Help?</h2>
        <p style={styles.stillNeedHelpText}>Our support team is available 24/7 to assist you with any questions</p>
        <div style={styles.helpActions}>
          <button 
            style={styles.primaryBtn}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Contact Support
          </button>
          <button 
            style={styles.secondaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#900603';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}
          >
            File a Complaint
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;