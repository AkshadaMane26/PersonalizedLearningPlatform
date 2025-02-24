const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const StudyMaterial = require("../models/studyMaterial.model"); // Import StudyMaterial model

dotenv.config(); // Ensure .env is loaded

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY is missing");
} else {
    console.log("✅ GEMINI_API_KEY Loaded");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// API Endpoint to generate and store study material
router.post("/generate", async (req, res) => {
    try {
        const { topic, difficulty, courseId, courseType, createdBy } = req.body;

        if (!topic || !courseId || !courseType || !createdBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // AI Chat Session
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `Generate a well-structured, detailed study material on "${topic}" at a "${difficulty}" level. 
                        Include key concepts, explanations, real-world examples, important formulas (if applicable), and a summary at the end. 
                        Format the content with headings and bullet points for clarity.`
                      }]
                      
                },
            ],
        });

        const result = await chatSession.sendMessage("Generate now");
        const responseText = await result.response.text(); // Ensure correct parsing

        // Convert response to JSON format
        const generatedMaterial = JSON.parse(responseText);

        // Save generated material to MongoDB
        const newMaterial = new StudyMaterial({
            courseId,
            courseType,
            topic,
            difficultyLevel: difficulty,
            courseLayout: generatedMaterial,
            createdBy,
        });

        await newMaterial.save();

        res.json({ message: "Study material generated successfully!", studyMaterial: newMaterial });
    } catch (error) {
        console.error("❌ Error generating study material:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
