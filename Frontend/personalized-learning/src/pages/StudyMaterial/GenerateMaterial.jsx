import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./GenerateMaterial.css";

const GenerateMaterial = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [generatedMaterial, setGeneratedMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTopic(e.target.value);
    e.target.style.height = "80px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleGenerate = async () => {
    if (!topic) {
      setError("Topic is required");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/studyMaterial/generate", {
        topic,
        difficulty,
        courseId: "course123",
        courseType: "Science",
        createdBy: "user123",
      });

      setGeneratedMaterial(response.data.studyMaterial);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate study material");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedMaterial) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(`Study Material: ${generatedMaterial.topic}`, 10, 10);
    doc.setFont("helvetica", "normal");

    let y = 20;

    generatedMaterial.courseLayout?.sections?.forEach((section, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${section.heading || "Quiz Section"}`, 10, y);
      y += 6;

      doc.setFontSize(12);
      doc.text(section.content || "", 10, y, { maxWidth: 180 });
      y += 10;

      if (section.quiz) {
        section.quiz.forEach((q, qIndex) => {
          doc.text(`Q${qIndex + 1}: ${q.question}`, 10, y);
          y += 6;
          doc.text(`Answer: ${q.answer}`, 15, y);
          y += 8;
        });
      }
    });

    doc.save(`${generatedMaterial.topic}_StudyMaterial.pdf`);
  };

  return (
    <div className="generate-container">
      <h1>Start Building Your Personal Study Material</h1>
      <p>Fill all details to generate study material</p>

      {error && <p className="error">{error}</p>}

      <label>Enter Topic</label>
      <textarea placeholder="Topic Value" value={topic} onChange={handleInputChange} />

      <label>Select Difficulty Level</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="level-area">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <div className="button-container">
        <button className="prev-btn" onClick={() => navigate("/dashboard/student/studymaterial")}>Previous</button>
        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {generatedMaterial && (
        <div className="study-material">
          <h2>{generatedMaterial.courseLayout?.title}</h2>

          {generatedMaterial.courseLayout?.sections?.map((section, index) => (
            <div key={index} className="section">
              <h3>{section.heading}</h3>
              <p>{section.content}</p>
              {section.image && <img src={section.image} alt={section.heading} className="study-image" />}
            </div>
          ))}

          {generatedMaterial.courseLayout?.sections?.some(section => section.quiz) && (
            <>
              <h3>Quiz</h3>
              <ul className="quiz">
                {generatedMaterial.courseLayout?.sections
                  .filter((s) => s.quiz)
                  .flatMap((s) => s.quiz)
                  .map((q, index) => (
                    <li key={index}>
                      <strong>Q{index + 1}:</strong> {q.question}
                      <br />
                      <em>Answer:</em> {q.answer}
                    </li>
                  ))}
              </ul>
            </>
          )}

          <button className="download-btn" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateMaterial;
