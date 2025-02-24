import React from 'react';
import ContentTop from "./ContentTop/ContentTop";
import Sidebar from "../../layout/Sidebar/Sidebar";
import "./Student.css";

const Student = () => {
  return (
    <div className="student-layout">
      <ContentTop />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="dashboard-grid">
            <div className="learning-streak">
              <h2>Learning Streak</h2>
              <div className="streak-box">
                <p>Current Streak</p>
                <h3>10 Days 🔥</h3>
                <p>Keep going! You're on a roll! 🚀</p>
              </div>
            </div>

            <div className="achievements">
              <h2>Achievements & Rewards</h2>
              <ul>
                <li>🏆 Top Performer of the Month - 23/12/04</li>
                <li>🏅 Consistent Learner - 23/07/21</li>
                <li>🚀 Speed Learner - 23/10/05</li>
              </ul>
            </div>

            <div className="performance-report">
              <h2>Performance Report</h2>
              <div className="bar-chart">
                <div className="bar" style={{ height: "80%" }}></div>
                <div className="bar" style={{ height: "85%" }}></div>
                <div className="bar" style={{ height: "90%" }}></div>
                <div className="bar" style={{ height: "88%" }}></div>
                <div className="bar" style={{ height: "92%" }}></div>
              </div>
            </div>

            <div className="weekly-goals">
              <h2>Weekly Learning Goals</h2>
              <p>Study Target: <strong>10 hrs/week</strong></p>
              <ul>
                <li>📚 Mathematics: 5 / 10 hrs</li>
                <li>🔬 Science: 7 / 12 hrs</li>
                <li>💻 Programming: 4 / 8 hrs</li>
                <li>🧠 AI & ML: 3 / 6 hrs</li>
              </ul>
            </div>

            <div className="leaderboard">
              <h2>Leaderboard Rank</h2>
              <ol>
                <li>🥇 Akshada Mane - 950</li>
                <li>🥈 Rahul Sharma - 920</li>
                <li>🥉 Priya Verma - 890</li>
                <li>4️⃣ Amit Kumar - 860</li>
                <li>5️⃣ Sneha Patil - 830</li>
              </ol>
            </div>

            <div className="ai-recommendation">
              <h2>AI-Powered Learning Recommendations</h2>
              <div className="recommendation-box">
                <p>Based on your quiz performance, we recommend revising the <strong>Neural Networks</strong> module.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;

