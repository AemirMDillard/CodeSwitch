import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilesPage.css";

function ProfilesPage() {
  const navigate = useNavigate();
  
  // Load stored user info or set defaults
  const [username, setUsername] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return storedData?.name || "Guest";
  });

  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [selectedChallenges, setSelectedChallenges] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedChallenges")) || [];
  });

  const [requestedTeammates, setRequestedTeammates] = useState(() => {
    return JSON.parse(localStorage.getItem("requestedProfiles")) || [];
  });

  const [activeTab, setActiveTab] = useState("challenges");
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("messages")) || {};
  });

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setSelectedChallenges(JSON.parse(localStorage.getItem("selectedChallenges")) || []);
    setRequestedTeammates(JSON.parse(localStorage.getItem("requestedProfiles")) || []);
    setMessages(JSON.parse(localStorage.getItem("chatMessages")) || {});
  }, []);

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTeammate) return;

    setMessages((prev) => {
      const updated = {
        ...prev,
        [selectedTeammate]: [...(prev[selectedTeammate] || []), newMessage],
      };
      localStorage.setItem("chatMessages", JSON.stringify(updated));
      return updated;
    });

    setNewMessage("");
  };

  return (
    <div className="profile-wrapper">
      <button className="return-home-btn" onClick={() => navigate("/matching")}>Matches</button>

      <div className="profile-header">
        <div className="profile-pic-container">
          <img src={profilePic || "default-profile.png"} alt="Profile" className="profile-pic" />
          <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
        </div>
        <h1>{username}</h1>
      </div>

      <div className="tabs">
        {["challenges", "teammates", "chat"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content-area">
        {activeTab === "challenges" && (
          <div className="section">
            <h2>🔥 Selected Challenges</h2>
            <ul>
              {selectedChallenges.length > 0 ? selectedChallenges.map((id) => <li key={id}>Challenge {id}</li>) : <p>No challenges selected.</p>}
            </ul>
          </div>
        )}

        {activeTab === "teammates" && (
          <div className="section">
            <h2>👥 Requested Teammates</h2>
            <ul>
              {requestedTeammates.length > 0 ? (
                requestedTeammates.map((id) => (
                  <li key={id} onClick={() => setSelectedTeammate(id)} className={selectedTeammate === id ? "selected" : ""}>
                    User {id}
                  </li>
                ))
              ) : (
                <p>No teammate requests.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="chat-section">
            {selectedTeammate ? (
              <>
                <h2>💬 Chat with User {selectedTeammate}</h2>
                <div className="chat-box">
                  {messages[selectedTeammate]?.map((msg, index) => (
                    <p key={index} className="chat-message">{msg}</p>
                  ))}
                </div>
                <div className="chat-input">
                  <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </>
            ) : (
              <p>Click on a teammate to start chatting.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilesPage;
