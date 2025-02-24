const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    courseType: { type: String, required: true },
    topic: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            choices: { type: [String], required: true },
            answer: { type: String, required: true },
        },
    ],
    createdBy: { type: String, required: true },
});

module.exports = mongoose.model("Quiz", quizSchema);