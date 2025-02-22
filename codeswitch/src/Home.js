import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="header">
        <span className="logo-bit">BIT</span>
      </div>
      <div className="content">
        <h1>CodeSwitch</h1>
        <p>Find your perfect hackathon partner in seconds.</p>
        <button className="cta-button" onClick={() => navigate("/form")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
