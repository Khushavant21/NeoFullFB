import React from "react";
import "./style/ResSubscribeSection.css";

const ResSubscribeSection = () => {
  return (
    <section className="subscribe-section">
      <h2 className="subscribe-title">Stay Updated</h2>
      <p className="subscribe-text">
        Subscribe to receive the latest financial resources and insights directly to your inbox
      </p>

      <div className="subscribe-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="subscribe-input"
        />
        <button className="subscribe-button">Subscribe</button>
      </div>
    </section>
  );
};

export default ResSubscribeSection;
