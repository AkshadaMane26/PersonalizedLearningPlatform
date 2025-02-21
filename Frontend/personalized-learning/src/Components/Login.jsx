import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setAlertMessage(`Welcome ${res.data.role}!`);
      setAlertType("success");

      setTimeout(() => {
        navigate(`/dashboard/${res.data.role}`);
      }, 2000);
      
    } catch (error) {
      setAlertMessage("Invalid email or password.");
      setAlertType("error");
    }
  };

  return (
    <div className="auth-container">
      {alertMessage && <div className={`alert ${alertType}`}>{alertMessage}</div>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/signup">Register here</Link></p>
    </div>
  );
};

export default Login;
