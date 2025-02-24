import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudyMaterial.css";

const StudyMaterial = () => {
  const navigate = useNavigate();

  const options = [
    { id: 1, label: "Exam", img: "/exam-time.png" },
    { id: 2, label: "Job Interview", img: "/businessman.png" },
    { id: 3, label: "Practice", img: "/pencil.png" },
    { id: 4, label: "Coding Prep", img: "/programming.png" },
    { id: 5, label: "Other", img: "/application.png" },
  ];

  const handleSelection = () => {
    navigate("/dashboard/student/studymaterial/generate-material"); // ✅ Correct path
  };

  return (
    <div className="study-container">
      <h1>Start Building Your Personal Study Material</h1>
      <p>Fill all details in order to generate study material for your next project</p>
      <h3>For which do you want to create your personal study material?</h3>
      <div className="study-options">
        {options.map((option) => (
          <div key={option.id} className="study-option" onClick={handleSelection}>
            <img src={option.img} alt={option.label} />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;
