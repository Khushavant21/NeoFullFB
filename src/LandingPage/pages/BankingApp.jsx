import React from "react";
import "./styles/BankingApp.css";
import phoneImg from "../assets/phone.jpg"; // you can replace with actual phone image or leave as div mock

export default function BankingApp() {
    return (
        <div className="banking-container">
            {/* Left Section: Mobile Mockup */}
            <div className="banking-left">
                <div className="phone-mockup">
                    <div className="phone-header">
                        <p className="balance-label">Total Balance</p>
                        <h2 className="balance-amount">₹1,24,580</h2>
                    </div>

                    <div className="action-grid">
                        <button className="action-btn">Pay</button>
                        <button className="action-btn">Request</button>
                        <button className="action-btn">Invest</button>
                        <button className="action-btn">Loans</button>
                    </div>

                    <div className="transactions">
                        <h4>Recent Transactions</h4>
                        <ul>
                            <li>
                                <div className="transaction-left">
                                    <span className="avatar"></span>
                                    <span>Payment<br /><small>Today</small></span>
                                </div>
                                <span className="debit">-₹500</span>
                            </li>

                          <li>
                                <div className="transaction-left">
                                    <span className="avatar"></span>
                                    <span>Payment<br /><small>Today</small></span>
                                </div>
                                <span className="debit">-₹1000</span>
                            </li>
                           <li>
                                <div className="transaction-left">
                                    <span className="avatar"></span>
                                    <span>Payment<br /><small>Today</small></span>
                                </div>
                                <span className="debit">-₹1500</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Section: Content */}
            <div className="banking-right">
                <h1 className="banking-title">Banking in Your Pocket</h1>
                <p className="banking-subtitle">
                    Download the NeoBank app and experience the future of banking.
                    Manage your finances, make payments, and invest – all from one
                    powerful app.
                </p>

                <ul className="features-list">
                    <li>✅ Instant money transfers with UPI</li>
                    <li>✅ Bill payments & recharges</li>
                    <li>✅ Investment tracking dashboard</li>
                    <li>✅ Expense categorization</li>
                    <li>✅ Biometric login for security</li>
                    <li>✅ Cardless ATM withdrawals</li>
                </ul>

                <div className="download-buttons">
                    <button className="store-btn appstore">App Store</button>
                    <button className="store-btn playstore">Google Play</button>
                </div>

                <div className="rating">
                    ⭐ <span>4.8 Rating</span> <span>50M+ Downloads</span>
                </div>
            </div>
        </div>
    );
}
