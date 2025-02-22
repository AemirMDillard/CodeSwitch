import React, { useState } from "react";
import "./challenges.css";

const challenges = [
  {
    id: 1,
    name: "AI for Social Good",
    company: "BlackTech Solutions",
    description: "Develop an AI model that improves community well-being.",
    prize: "$5000 + Internship",
    hashtags: ["#AI", "#MachineLearning", "#SocialImpact"],
  },
  {
    id: 2,
    name: "E-Commerce Revamp",
    company: "AfroMarket",
    description: "Redesign an e-commerce platform for a Black-owned business.",
    prize: "$3000",
    hashtags: ["#WebDev", "#UIUX", "#Ecommerce"],
  },
  {
    id: 3,
    name: "Cybersecurity for Startups",
    company: "SecureBlack",
    description: "Develop security solutions for Black-owned startups.",
    prize: "$4000",
    hashtags: ["#Cybersecurity", "#Startups"],
  },
];

function ChallengesPage() {
  const [search, setSearch] = useState("");

  // Filter challenges based on search input
  const filteredChallenges = challenges.filter((challenge) =>
    challenge.hashtags.some((tag) =>
      tag.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="challenges-container">
      <h1>Hackathon Challenges</h1>
      <input
        type="text"
        placeholder="Search by hashtag (e.g., #AI, #WebDev)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <div className="challenges-grid">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <h2>{challenge.name}</h2>
              <p><strong>Company:</strong> {challenge.company}</p>
              <p>{challenge.description}</p>
              <p><strong>Prize:</strong> {challenge.prize}</p>
              <div className="hashtags">
                {challenge.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No challenges found.</p>
        )}
      </div>
    </div>
  );
}

export default ChallengesPage;

