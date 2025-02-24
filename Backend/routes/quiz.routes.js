const express = require("express");
const { generateQuiz, submitQuiz } = require("../controllers/quiz.controller"); // ✅ Import correctly

const router = express.Router();

router.post("/generate-quiz", generateQuiz); 
router.post("/submit-quiz", submitQuiz); // ✅ Fix reference

module.exports = router;
