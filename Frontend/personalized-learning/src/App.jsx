import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ParentDashboard from "./Components/ParentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard";
import StudentDashboard from "./Components/StudentDashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/parent" element={<ParentDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
    </Routes>
  </Router>
);

export default App;
