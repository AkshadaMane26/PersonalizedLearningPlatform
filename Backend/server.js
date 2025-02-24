const dotenv = require("dotenv");
const path = require("path");

// Manually specify the `.env` file path
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("GOOGLE_API_KEY:", process.env.GEMINI_API_KEY);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
const quizRoutes = require("./routes/quiz.routes"); // ✅ Import Quiz Routes

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/studyMaterial", studyMaterialRoutes);
app.use("/api/quiz", quizRoutes); // ✅ Add Quiz Routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

