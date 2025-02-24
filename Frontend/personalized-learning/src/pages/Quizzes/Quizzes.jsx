import React, { useState } from "react";

const Quizzes = () => {
    const [topic, setTopic] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState("medium");
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Handle quiz generation
    const handleGenerateQuiz = async () => {
        setIsGenerating(true); // ✅ Show "Generating..."
        try {
            const response = await fetch("http://localhost:5000/api/quiz/generate-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    numQuestions,
                    difficulty,
                    courseId: "123", // Sample course ID
                    courseType: "test",
                    createdBy: "testuser",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Invalid server response" }));
                console.error("❌ Error generating quiz:", errorData.error);
                alert(`Error generating quiz: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            console.log("✅ Quiz Response:", data);

            const formattedQuestions = data.quiz.questions.map((q, index) => ({
                id: index,
                question: q.question,
                choices: q.choices || [],
                answer: q.answer,
            }));

            setQuestions(formattedQuestions);
            setUserAnswers({});
            setScore(null);
            setRecommendations([]);
        } catch (error) {
            console.error("❌ Error generating quiz:", error);
            alert("Error generating quiz! Check console for details.");
        } finally {
            setIsGenerating(false); // ✅ Reset button text
        }
    };

    // ✅ Handle user answer selection
    const handleAnswerChange = (questionId, selectedAnswer) => {
        setUserAnswers({ ...userAnswers, [questionId]: selectedAnswer });
    };

    // ✅ Handle quiz submission
    const handleSubmitQuiz = async () => {
        setIsSubmitting(true); // ✅ Show "Submitting..."
        try {
            const response = await fetch("http://localhost:5000/api/quiz/submit-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, userAnswers }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Invalid server response" }));
                console.error("❌ Error submitting quiz:", errorData.error);
                alert(`Error submitting quiz: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            console.log("✅ Quiz Submission Response:", data);

            setScore(data.score);
            setRecommendations(data.recommendations || []);
        } catch (error) {
            console.error("❌ Error submitting quiz:", error);
            alert("Error submitting quiz! Check console for details.");
        } finally {
            setIsSubmitting(false); // ✅ Reset button text
        }
    };

    return (
        <div>
            <h1>AI-Generated Quiz</h1>

            {/* ✅ Input for Topic */}
            <input
                type="text"
                placeholder="Enter quiz topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-option"
            />

            {/* ✅ Number of Questions */}
            <input
                type="number"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
            />

            {/* ✅ Difficulty Selection */}
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            {/* ✅ Generate Quiz Button */}
            <button onClick={handleGenerateQuiz} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Quiz"}
            </button>

            {/* ✅ Render Questions if Generated */}
            {questions.length > 0 && (
                <div>
                    <h2>Quiz: {topic}</h2>
                    {questions.map((q) => (
                        <div key={q.id}>
                            <p>{q.question}</p>
                            {q.choices.map((choice, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={choice}
                                        checked={userAnswers[q.id] === choice}
                                        onChange={() => handleAnswerChange(q.id, choice)}
                                    />
                                    {choice}
                                </label>
                            ))}
                        </div>
                    ))}

                    {/* ✅ Submit Quiz Button */}
                    <button onClick={handleSubmitQuiz} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Quiz"}
                    </button>
                </div>
            )}

            {/* ✅ Show Quiz Results */}
            {score !== null && (
                <div>
                    <h2>Quiz Results</h2>
                    <p>Score: {score}/{questions.length}</p>
                    {recommendations.length > 0 && (
                        <div>
                            <h3>Recommendations:</h3>
                            <ul>
                                {recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quizzes;
