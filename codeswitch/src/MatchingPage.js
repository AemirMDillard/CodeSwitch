import React from "react";
import { useNavigate } from "react-router-dom";
import "./MatchingPage.css";

const sampleProfiles = [
  { id: 1, name: "Alex Johnson", skills: ["Frontend", "React"] },
  { id: 2, name: "Jordan Smith", skills: ["Backend", "Node.js"] },
  { id: 3, name: "Taylor Brown", skills: ["AI", "Python"] },
  { id: 4, name: "Morgan Lee", skills: ["Cybersecurity", "Ethical Hacking"] },
];

function MatchingPage() {
  const navigate = useNavigate();

  return (
    <div className="matching-page">
      <h1>Find Your Hackathon Partner</h1>
      <div className="profile-grid">
        {sampleProfiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <div className="profile-avatar">{profile.name[0]}</div>
            <h2>{profile.name}</h2>
            <p>Skills: {profile.skills.join(", ")}</p>
            <button className="request-btn">Request to be a Team</button>
          </div>
        ))}
      </div>
      <button className="challenges-btn" onClick={() => navigate("/challenges")}>
        View Hackathon Challenges
      </button>
    </div>
  );
}

export default MatchingPage;
