const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseType: { type: String, required: true },
  topic: { type: String, required: true },
  difficultyLevel: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  courseLayout: { type: Object, default: {} }, // JSON equivalent in MongoDB
  createdBy: { type: String, required: true }
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

module.exports = StudyMaterial;
