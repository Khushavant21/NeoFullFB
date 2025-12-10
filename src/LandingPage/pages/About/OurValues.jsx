import React from 'react'
 import { FaUserShield, FaLock, FaLightbulb, FaFileContract } from "react-icons/fa"
 import "./style/OurValues.css"
 const OurValues = () => {
   

const companyValues = [
  {
    title: "Customer First",
    description:
      "Every decision we make is guided by what's best for our customers and their financial wellbeing.",
    icon: <FaUserShield size={28} color="#900603" />,
  },
  {
    title: "Trust & Security",
    description:
      "We protect your financial data with bank-grade encryption and industry-leading security measures.",
    icon: <FaLock size={28} color="#900603" />,
  },
  {
    title: "Innovation",
    description:
      "We constantly evolve our technology to provide cutting-edge banking solutions for modern needs.",
    icon: <FaLightbulb size={28} color="#900603" />,
  },
  {
    title: "Transparency",
    description:
      "No hidden fees, no fine print surprises. We believe in clear, honest communication always.",
    icon: <FaFileContract size={28} color="#900603" />,
  },
];



  return (
          <div className="ourval-features-container">
      <h1 className="ourval-features-title">Our Core Values</h1>
      <p className="ourval-features-subtitle">
        The principles that guide every decision we make
      </p>


     <div className="ourval-features-grid">
        {companyValues.map((f, index) => (
          <div className="aboutval-feature-card" key={index}>
            <div className="aboutval-feature-icon">{f.icon}</div>
            <h3 className="aboutval-feature-title">{f.title}</h3>
            <p className="aboutval-feature-text">{f.description}</p>
          </div>
        ))}
      </div>



    </div>
  )
}

export default OurValues