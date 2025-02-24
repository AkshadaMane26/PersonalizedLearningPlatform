import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ParentDashboard from "./Components/ParentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard";
import Student from "./Components/Student/Student";
import StudentLayout from "./layout/StudentLayout";


// Import pages from the `pages` folder
import Quizzes from "./pages/Quizzes/Quizzes";
import Achievements from "./pages/Achievements/Achievements";
import AIRecommendation from "./pages/Recommendation/Recommendations";
import StudyMaterial from "./pages/StudyMaterial/StudyMaterial"
import Chatbot from "./pages/Chatbot/Chatbot";
import Profile from "./pages/Profile/Profile";

//Subpages
import GenerateMaterial from "./pages/StudyMaterial/GenerateMaterial";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/parent" element={<ParentDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />

      {/* Wrap student-related routes inside StudentLayout */}
      <Route path="/dashboard/student" element={<StudentLayout> <Student /> </StudentLayout>} />
      <Route path="/dashboard/student/quizzes" element={<StudentLayout> <Quizzes /> </StudentLayout>} />
      <Route path="/dashboard/student/achievements" element={<StudentLayout> <Achievements /> </StudentLayout>} />
      <Route path="/dashboard/student/recommendation" element={<StudentLayout> <AIRecommendation /> </StudentLayout>} />
      <Route path="/dashboard/student/studymaterial" element={<StudentLayout> <StudyMaterial /> </StudentLayout>} />
      <Route path="/dashboard/student/chatbot" element={<StudentLayout> <Chatbot /> </StudentLayout>} />
      <Route path="/dashboard/student/profile" element={<StudentLayout> <Profile /> </StudentLayout>} />

      {/*Sub files */}
      <Route path="/dashboard/student/studymaterial/generate-material" element={<StudentLayout> <GenerateMaterial /> </StudentLayout>} />

    </Routes>
  </Router>
);

export default App;
