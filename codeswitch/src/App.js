import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";
import MatchingPage from "./MatchingPage";
import ChallengesPage from "./ChallengesPage";
import ProfilesPage from "./ProfilesPage";

function App() {
  return (
    <Router> { }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/profile" element={<ProfilesPage />} />
      </Routes>
    </Router>
  );
}

export default App;