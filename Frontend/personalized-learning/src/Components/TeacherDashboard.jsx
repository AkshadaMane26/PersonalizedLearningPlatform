import React from "react";
import "./TeachersDashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";

const studentsData = [
  { name: "Alice", quizzesAttempted: 5, avgScore: 85 },
  { name: "Bob", quizzesAttempted: 7, avgScore: 78 },
  { name: "Charlie", quizzesAttempted: 4, avgScore: 90 },
  { name: "David", quizzesAttempted: 6, avgScore: 88 },
];

const quizPerformance = [
  { topic: "Math", avgScore: 80 },
  { topic: "Science", avgScore: 85 },
  { topic: "History", avgScore: 75 },
  { topic: "English", avgScore: 90 },
];

const weeklyProgress = [
  { week: "Week 1", progress: 60 },
  { week: "Week 2", progress: 75 },
  { week: "Week 3", progress: 85 },
  { week: "Week 4", progress: 90 },
];

const leaderboard = [...studentsData].sort((a, b) => b.avgScore - a.avgScore);


const TeachersDashboard = () => {
  return (
      <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Teacher's Dashboard <button className="logout-btn">Logout</button></h1>

      <div className="dashboard-grid">
        {/* Registered Students */}
        <div className="card">
          <h2>📋 Registered Students</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attempted Quizzes</th>
                <th>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.quizzesAttempted}</td>
                  <td>{student.avgScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quiz Performance */}
        <div className="card">
          <h2>📈 Quiz Performance</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizPerformance}>
                <XAxis dataKey="topic" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="card">
          <h2>🚀 Weekly Progress</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <XAxis dataKey="week" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#38bdf8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card leaderboard">
        <h2>🏆 Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student Name</th>
              <th>Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((student, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.avgScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Insights */}
      <div className="ai-insights">
        <h2>🤖 AI Insights & Recommendations</h2>
        <p>Students are struggling with History quizzes. Consider revising key topics.</p>
        <button className="button">Suggest Study Material</button>
      </div>
    </div>
    
  );
};

export default TeachersDashboard;
