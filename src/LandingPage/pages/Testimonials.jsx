import React from "react";
import "./styles/Testimonials.css";

export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      text: `"NeoBank transformed how I manage my business finances. The instant loan approval helped me expand my boutique at the perfect time!"`,
      name: "Priya Sharma",
      role: "Small Business Owner",
      emoji: "👩‍💼",
    },
    {
      stars: 5,
      text: `"Best banking experience ever! Zero balance account, amazing credit card rewards, and customer service that actually cares."`,
      name: "Rajesh Kumar",
      role: "IT Professional",
      emoji: "👨‍💻",
    },
    {
      stars: 5,
      text: `"The mobile app is incredibly intuitive. I can manage everything from payments to investments without visiting a branch."`,
      name: "Anita Desai",
      role: "Freelance Designer",
      emoji: "👩‍🎨",
    },
    {
      stars: 5,
      text: `"NeoBank's business banking solutions are perfect for startups. Quick setup, great support, and tools that scale with growth."`,
      name: "Vikram Patel",
      role: "Startup Founder",
      emoji: "👨‍💼",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Trusted by Millions</h2>
      <p className="testimonials-subtitle">
        See what our customers have to say about their NeoBank experience
      </p>

      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-stars">
              {"★".repeat(review.stars)}
            </div>
            <p className="testimonial-text">{review.text}</p>
            <div className="testimonial-user">
              <span className="testimonial-emoji">{review.emoji}</span>
              <div>
                <strong>{review.name}</strong>
                <p className="testimonial-role">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
