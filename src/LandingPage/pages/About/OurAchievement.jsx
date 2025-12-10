import React from 'react'
import { FaUsers, FaBuilding, FaAward, FaRupeeSign } from "react-icons/fa";
import "./style/OurAchievement.css"


const OurAchievement = () => {
    const companyStats = [
  {
    value: "10M+",
    label: "Active Customers",
    icon: <FaUsers size={28} color="#900603" />,
  },
  {
    value: "500+",
    label: "Branches Nationwide",
    icon: <FaBuilding size={28} color="#900603" />,
  },
  {
    value: "50+",
    label: "Industry Awards",
    icon: <FaAward size={28} color="#900603" />,
  },
  {
    value: "₹50K Cr",
    label: "Assets Under Management",
    icon: <FaRupeeSign size={28} color="#900603" />,
  },
];
  return (
   <div className="achievement-features-container">
      <h1 className="achievement-features-title">Our Achievements</h1>
      <p className="achievement-features-subtitle">
        Numbers that reflect our commitment to excellence
      </p>


     <div className="achievement-features-grid">
        {companyStats.map((f, index) => (
          <div className="achievement-feature-card" key={index}>
            <div className="achievement-feature-icon">{f.icon}</div>
            <h3 className="achievement-feature-title">{f.value}</h3>
            <p className="achievement-feature-text">{f.label}</p>
          </div>
        ))}
      </div>



    </div>
  )
}

export default OurAchievement