import React from "react";
import "./ParentDashboard.css";

const ParentDashboard = () => {
  // Sample data
  const parentData = {
    parentName: "Mr. Johnson",
    childName: "Alice Johnson",
    grade: "5th Grade",
    lastQuiz: "Math Quiz - 85%",
    overallPerformance: 88,
    attendance: "95%",
    upcomingAssignments: [
      { subject: "Science", due: "Feb 28" },
      { subject: "History", due: "Mar 3" },
    ],
    teacherFeedback:
      "Alice is improving in mathematics. Encourage her to practice more word problems.",
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear auth tokens, redirect to login page)
    console.log("Logging out...");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="parent-dashboard">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h2>Welcome, {parentData.parentName}!</h2>
      <h3>📘 {parentData.childName}'s Progress</h3>

      <div className="child-info">
        <h3>👦 Child: {parentData.childName}</h3>
        <p>📚 Grade: {parentData.grade}</p>
        <p>🎯 Last Quiz Score: {parentData.lastQuiz}</p>
        <p>📅 Attendance: {parentData.attendance}</p>
      </div>

      <div className="performance">
        <h3>⭐ Overall Performance</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${parentData.overallPerformance}%` }}
          >
            {parentData.overallPerformance}%
          </div>
        </div>
      </div>

      <div className="assignments">
        <h3>📅 Upcoming Assignments</h3>
        <ul>
          {parentData.upcomingAssignments.map((task, index) => (
            <li key={index}>
              {task.subject} - Due: {task.due}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback">
        <h3>📝 Teacher's Feedback</h3>
        <p>{parentData.teacherFeedback}</p>
      </div>
    </div>
  );
};

export default ParentDashboard;
