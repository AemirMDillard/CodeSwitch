import React, { useState, useEffect } from "react";
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
  const [requestedProfiles, setRequestedProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("requestedProfiles")) || [];
    setRequestedProfiles(savedRequests);
  }, []);

  const handleRequest = (id) => {
    setRequestedProfiles((prev) => {
      const updated = prev.includes(id) ? prev.filter((profile) => profile !== id) : [...prev, id];
      localStorage.setItem("requestedProfiles", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredProfiles = sampleProfiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="matching-page">
      <h1>Find Your Hackathon Partner</h1>
      <input
        type="text"
        placeholder="Search by name or skill..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="profile-grid">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className={`profile-card ${requestedProfiles.includes(profile.id) ? "requested" : ""}`}>
            <div className="profile-avatar">{profile.name[0]}</div>
            <h2>{profile.name}</h2>
            <p>Skills: {profile.skills.join(", ")}</p>
            <button className="request-btn" onClick={() => handleRequest(profile.id)}>
              {requestedProfiles.includes(profile.id) ? "Requested ✅" : "Request to be a Team"}
            </button>
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
