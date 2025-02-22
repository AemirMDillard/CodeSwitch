import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./challenges.css"; // Import CSS file

const challengesData = [
    { id: 1, name: "AI for Social Good 🤖", description: "Develop an AI solution to tackle social justice issues.", hashtags: ["#AI", "#MachineLearning"] },
  
    { id: 2, name: "FinTech Innovation 💰", description: "Create a financial tool to help underbanked communities.", hashtags: ["#Finance", "#Blockchain"] },
  
    { id: 3, name: "Health Tech for All ❤️", description: "Build a digital health solution that improves accessibility.", hashtags: ["#HealthTech", "#AI"] },
  
    { id: 4, name: "Black Music Tech 🎵", description: "Invent software that empowers and advances African American music creators.", hashtags: ["#MusicTech", "#Innovation"] },
  
    { id: 5, name: "Black Digital Arts 🎨", description: "Use digital tools to showcase and preserve Black artistry and culture.", hashtags: ["#BlackArt", "#CreativeTech"] },
  
    { id: 6, name: "Black Data Challenge 📊", description: "Create a tool that makes African American achievements and history more visible through data visualization.", hashtags: ["#DataScience", "#Representation"] },
  
    { id: 7, name: "Black History in Tech 🔍", description: "Design an interactive experience that highlights a prominent Black figure in STEM.", hashtags: ["#BlackHistory", "#TechInnovation"] },
  
    { id: 8, name: "Black Engineering Solutions 🏗️", description: "Develop a tool that helps solve challenges faced by Black engineers and creators.", hashtags: ["#Engineering", "#ProblemSolving"] },
  
    { id: 9, name: "UNC Computer Science Open Challenge 🏫", description: "An open-ended challenge for all innovators to build something impactful!", hashtags: ["#UNC", "#ComputerScience"] },
  
    { id: 10, name: "Black Women in Tech 💡", description: "A challenge focused on solutions that uplift and support Black women in the tech industry.", hashtags: ["#WomenInTech", "#Empowerment"] }
  ];

function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState(challengesData);

  // Load selected challenges from localStorage on page load
  useEffect(() => {
    const savedChallenges = JSON.parse(localStorage.getItem("selectedChallenges")) || [];
    setSelectedChallenges(savedChallenges);
  }, []);

  // Save selected challenges to localStorage
  const toggleChallenge = (challengeName) => {
    setSelectedChallenges((prev) => {
      const updated = prev.includes(challengeName)
        ? prev.filter((ch) => ch !== challengeName)
        : [...prev, challengeName];

      localStorage.setItem("selectedChallenges", JSON.stringify(updated));
      return updated;
    });
  };

  // Filter challenges based on search input
  useEffect(() => {
    setFilteredChallenges(
      challengesData.filter((challenge) =>
        challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.hashtags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm]);

  return (
    <div className="challenges-wrapper">
      <button className="return-home-btn" onClick={() => navigate("/profile")}>
        Go to Profile
      </button>
      <h1 className="page-title">Hackathon Challenges</h1>
      
      <input
        type="text"
        className="search-bar"
        placeholder="Search challenges..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="challenges-container">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.name} 
            className={`challenge-box ${selectedChallenges.includes(challenge.name) ? "selected" : ""}`}
            onClick={() => toggleChallenge(challenge.name)}
          >
            <h2>{challenge.name}</h2>
            <p>{challenge.description}</p>
            <div className="hashtags">
              {challenge.hashtags.map((tag, index) => (
                <span key={index} className="hashtag">{tag}</span>
              ))}
            </div>
            <button className="add-challenge-btn">
              {selectedChallenges.includes(challenge.name) ? "Added ✅" : "Add Challenge"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengesPage;
