const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const Quiz = require("../models/quiz.model");

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY is missing");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
};

exports.generateQuiz = async (req, res) => {
    try {
        const { topic, numQuestions, difficulty = "medium", courseId, courseType, createdBy } = req.body;

        if (!topic || !numQuestions || !courseId || !courseType || !createdBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (isNaN(numQuestions) || numQuestions <= 0 || numQuestions > 20) {
            return res.status(400).json({ error: "Invalid number of questions" });
        }

        const prompt = `Generate a multiple-choice quiz on the topic of "${topic}" with ${numQuestions} questions. Each question should have four answer choices (A, B, C, D), one correct answer, and a difficulty level of "${difficulty}". Return the quiz in JSON format: {"topic": "${topic}", "questions": [{"question": "...", "choices": ["A", "B", "C", "D"], "answer": "A"}]}`;

        const chatSession = await model.startChat({ generationConfig });
        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();

        console.log("🔍 RAW Gemini Response:", responseText);

        let generatedQuiz;
        try {
            generatedQuiz = JSON.parse(responseText);
            if (!generatedQuiz.topic || !generatedQuiz.questions || !Array.isArray(generatedQuiz.questions)) {
                return res.status(500).json({ error: "Invalid quiz structure from Gemini." });
            }
        } catch (jsonError) {
            console.error("❌ Error parsing JSON response:", jsonError, responseText);
            return res.status(500).json({ error: "Could not parse quiz response from Gemini.", rawResponse: responseText });
        }

        const newQuiz = new Quiz({
            courseId,
            courseType,
            topic,
            difficultyLevel: difficulty,
            questions: generatedQuiz.questions,
            createdBy,
        });

        await newQuiz.save();
        res.json({ message: "Quiz generated successfully!", quiz: newQuiz });
    } catch (error) {
        console.error("❌ Error generating quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { topic, userAnswers } = req.body;

        if (!userAnswers || Object.keys(userAnswers).length === 0) {
            return res.status(400).json({ error: "No answers submitted." });
        }

        const quiz = await Quiz.findOne({ topic }).lean();
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found." });
        }

        console.log("🔍 Submitted Answers:", userAnswers);
        console.log("✅ Correct Answers:", quiz.questions.map(q => q.answer));

        let score = 0;
        const recommendations = [];

        quiz.questions.forEach((question, index) => {
            console.log(`📌 Question: ${question.question}`);
            console.log(`✅ Correct Answer (DB): ${question.answer}`);
            console.log(`❌ User Answer: ${userAnswers[index]}`);

            // Extract the first letter (A/B/C/D) from the user's answer
            const userAnswerLetter = userAnswers[index] ? userAnswers[index].charAt(0).toUpperCase().trim() : '';

            // Compare with the correct answer (converted to uppercase & trimmed)
            if (userAnswerLetter === question.answer.trim().toUpperCase()) {
                score++;
            } else {
                recommendations.push(`Review: ${question.question}`);
            }
        });

        console.log(`📊 Final Score: ${score}/${quiz.questions.length}`);

        res.json({ score, recommendations });
    } catch (error) {
        console.error("❌ Error submitting quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
