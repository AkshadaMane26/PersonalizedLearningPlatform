import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/recommendations")
      .then(response => setRecommendation(response.data.topic))
      .catch(error => console.error("Error fetching AI recommendations", error));
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Welcome, John Doe</h2>
        <ul>
          <li>🏠 Dashboard Home</li>
          <li>📚 Courses & Modules</li>
          <li>🏆 Achievements & Badges</li>
          <li>📊 Performance Analytics</li>
          <li>📝 Tasks & Assessments</li>
          <li>🤖 AI Tutor & Chatbot</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Personalized AI-Driven Learning Path</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: "60%" }}></div>
        </div>
        <h2>AI Recommendations</h2>
        <p>Suggested Topic: <strong>{recommendation}</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;
