import React, { useState } from "react";
import "./DebitCardSettings.css";
import {FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DebitCardSettings = () => {
    const [usage, setUsage] = useState({
        domestic: false,
        international: true,
        ATM: true,
        POS: true,
        ecommerce: true,
        Contactless: true,
    });

    const [limits, setLimits] = useState({
        atm: 27000,
        pos: 75000,
        nfc: 0,
    });
    const navigate = useNavigate();


    return (
        <div className="debit-container-unique">

            {/* Header */}
            <div className="header-unique">

                <h2>My Debit Cards</h2>
                <button className="DCS-back-btn"onClick={() => navigate("/Client/cards")} ><FaArrowLeft size={20} />
                    Back
                </button>
            </div>

            <h3 className="section-title-unique">Manage Usage & Limits</h3>
            <p className="card-number-unique">XXXX XXXX XXXX 1617</p>

            {/* parent wrapper for side-by-side */}
            <div className="dual-wrapper-unique">

                {/* Manage Usage */}
                <div className="usage-wrapper-unique">
                    <h3 className="sub-title-unique">Manage Usage</h3>
                    <div className="card-unique">
                        {Object.keys(usage).map((key) => (
                            <div className="row-unique" key={key}>
                                <span className="label-unique">
                                    {key.replace(/^\w/, (c) => c.toUpperCase())} Usage
                                </span>
                                <label className="switch-unique">
                                    <input
                                        type="checkbox"
                                        checked={usage[key]}
                                        onChange={() =>
                                            setUsage({ ...usage, [key]: !usage[key] })
                                        }
                                    />
                                    <span className="slider-unique"></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Limits */}
                <div className="limits-wrapper-unique">
                    <h3 className="sub-title-unique">Manage Limits</h3>
                    <p className="desc-unique">
                        Set limit will be applicable to Domestic and International usage. Limits to be set in multiple of 1000.
                    </p>

                    {/* ATM */}
                    <div className="limit-card-unique">
                        <div className="limit-label-unique">
                            <span>ATM Transactions</span>
                            <span className="new-limit-unique">₹ {limits.atm}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="40000"
                            value={limits.atm}
                            onChange={(e) => setLimits({ ...limits, atm: e.target.value })}
                            className="slider-range-unique"
                        />
                        <div className="range-values-unique">
                            <span>₹ 1,000</span>
                            <span>₹ 40,000</span>
                        </div>
                    </div>

                    {/* POS */}
                    <div className="limit-card-unique">
                        <div className="limit-label-unique">
                            <span>POS (Merchant) & E-Commerce Transactions </span>
                            <span className="new-limit-unique">₹ {limits.pos}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="75000"
                            value={limits.pos}
                            onChange={(e) => setLimits({ ...limits, pos: e.target.value })}
                            className="slider-range-unique"
                        />
                        <div className="range-values-unique">
                            <span>₹ 1,000</span>
                            <span>₹ 75,000</span>
                        </div>
                    </div>

                    {/* NFC */}
                    <div className="limit-card-unique">
                        <div className="limit-label-unique">
                            <span>Contactless (NFC) Transactions</span>
                            <span className="new-limit-unique">₹ {limits.nfc}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={limits.nfc}
                            onChange={(e) => setLimits({ ...limits, nfc: e.target.value })}
                            className="slider-range-unique"
                        />
                        <div className="range-values-unique">
                            <span>₹ 0</span>
                            <span>₹ 5,000</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="save-btn-unique"onClick={() => navigate("/Client/cards")}>Save Changes</button>
        </div>
    );
};

export default DebitCardSettings;
