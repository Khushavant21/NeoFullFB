import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientCard2 from "./ClientCard2";
import CardImage from "../../assets/card1.png";
import CardImage2 from "../../assets/card2.png";
import "./ClientCard.css";

export default function ClientCard() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([
    {
      id: 1,
      status: "Active",
      type: "CREDIT CARD",
      bank: "NeoBank",
      availableLimit: "₹50,000.00",
      annualFee: "₹99.99",
      interestRate: "18.99% p.a.",
      features:
        "5x points on dining and travel, 2x points on all other purchases, complimentary airport lounge access, fraud protection.",
      showNumber: false,
      image: CardImage,
    },
    {
      id: 2,
      status: "Active",
      type: "CREDIT CARD",
      bank: "NeoBank",
      availableLimit: "₹50,000.00",
      annualFee: "₹99.99",
      interestRate: "18.99% p.a.",
      features:
        "5x points on dining and travel, 2x points on all other purchases, complimentary airport lounge access, fraud protection.",
      showNumber: false,
      image: CardImage2,
    },
    {
      id: 3,
      status: "Active",
      type: "CREDIT CARD",
      bank: "NeoBank",
      availableLimit: "₹50,000.00",
      annualFee: "₹99.99",
      interestRate: "18.99% p.a.",
      features:
        "5x points on dining and travel, 2x points on all other purchases, complimentary airport lounge access, fraud protection.",
      showNumber: false,
      image: CardImage,
    },
  ]);

  const toggleCardNumber = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, showNumber: !card.showNumber } : card
      )
    );
  };

  const [openSettingsFor, setOpenSettingsFor] = useState(null);
  const toggleSettings = (index) =>
    setOpenSettingsFor(openSettingsFor === index ? null : index);

  const handleSettingsAction = (card, action) => {
    alert(`${action} — ${card.type}`);
    setOpenSettingsFor(null);
  };

  const handleAddCard = () => {
    navigate("/Client/applynewcard");
  };

  return (
    <div className="client-card-wrapper">
      <div className="client-card-header-sonali
      ">
        <h2>My Cards</h2>
        <p>Your digital cards, simplified and secure</p>
        <button className="add-card-btn" onClick={handleAddCard}>
          + Apply for New Card
        </button>
      </div>

     


        <div style={{margin:"0px 20px"}}>
           <p className="client-card-subheading">Manage your debit and credit cards</p>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div key={card.id} className="card-item">
            <div className="card-box">
              <div className="card-box-body">
                <div className="card-top">
                  <span className="card-status">{card.status}</span>
                  <small className="card-type">{card.type}</small>
                </div>

                <div className="card-preview">
                  <img src={card.image} alt={card.type} className="card-image" />
                  <div
                    className="eye-icon"
                    onClick={() => toggleCardNumber(card.id)}
                    title={card.showNumber ? "Hide card number" : "Show card number"}
                  >
                    {/* {card.showNumber ? "👁️" : "👁️"} */}
                  </div>
                </div>

                <p className="card-label">Available Limit</p>
                <h6 className="card-value">{card.availableLimit}</h6>

                {card.annualFee && card.annualFee !== "Zero" && (
                  <p className="card-row">
                    <span>Annual Fee</span>
                    <span>{card.annualFee}</span>
                  </p>
                )}

                {card.interestRate && (
                  <p className="card-row">
                    <span>Interest Rate</span>
                    <span>{card.interestRate}</span>
                  </p>
                )}

                <div className="card-features">
                  <div className="features-title">Key Features</div>
                  <div className="features-text">{card.features}</div>
                </div>

                <div className="card-actions">
                  <button className="manage-btn" onClick={() => toggleSettings(index)}>Manage</button>
                  <div className="settings-wrapper">
                    {/* <button
                      className="settings-btn"
                      onClick={() => toggleSettings(index)}
                    >
                      ⚙️
                    </button> */}

                    {openSettingsFor === index && (
                      <div className="settings-menu">
                        <button onClick={() => handleSettingsAction(card, "Block Card")}>
                          Block / Unblock Card
                        </button>
                        <button onClick={() => navigate("/Client/CardsSetting")}>
                          Set Spending Limit
                        </button>
                        <button onClick={() => handleSettingsAction(card, "Change PIN")}>
                          Change PIN
                        </button>
                        <button
                          onClick={() =>
                            handleSettingsAction(card, "Report Lost")
                          }
                        >
                          Report Lost / Request Replacement
                        </button>
                        <button
                          onClick={() =>
                            handleSettingsAction(card, "View Statements")
                          }
                        >
                          View e-Statements
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
</div>
      <ClientCard2 />
    </div>
  );
}
