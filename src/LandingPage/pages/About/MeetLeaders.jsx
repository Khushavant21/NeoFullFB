import React from 'react'
import "./style/MeetLeaders.css"

function MeetLeaders() {
    const teamMembers = [
  {
    icon: "👨‍💼",
    name: "Rajesh Sharma",
    position: "Chief Executive Officer",
    description: "15+ years in fintech and banking innovation",
  },
  {
    icon: "👩‍💻",
    name: "Priya Patel",
    position: "Chief Technology Officer",
    description: "Expert in digital banking and cybersecurity",
  },
  {
    icon: "👨‍💼",
    name: "Amit Kumar",
    position: "Chief Financial Officer",
    description: "Former VP at leading investment bank",
  },
  {
    icon: "👩‍💼",
    name: "Sneha Reddy",
    position: "Chief Customer Officer",
    description: "Passionate about exceptional customer experience",
  },
]
  return (
     <div className="meet-leaders-container">
      <h1 className="meet-leaders-title1">Meet Our Leadership</h1>
      <p className="meet-leaders-subtitle">
    Experienced leaders driving innovation in banking
      </p>


     <div className="meet-leaders-grid">
        {teamMembers.map((member, index) => (
          <div className="meet-leaders-card" key={index}>
            <div className="meet-leaders-icon">{member.icon}</div>
            <h3 className="meet-leaders-title">{member.name}</h3>
            <p  style={{color:"#900603"}}>{member.position}</p>
            <p className="meet-leaders-text">{member.description}</p>
          </div>
        ))}
      </div>



    </div>
  )
}

export default MeetLeaders