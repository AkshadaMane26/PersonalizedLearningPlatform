import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

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
      setAlertMessage(<span style={{ color: "#fff", fontWeight: "bold" }}>Welcome {res.data.role}!</span>);
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
    <div className="login-container">
      {alertMessage && <div className={`alert ${alertType}`}>{alertMessage}</div>}
      <div className="login-box">
        <div className="login-left">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="elements">
            <input type="email" placeholder="Enter Your Username" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" placeholder="Enter Your Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit" className="login-btn">LOGIN</button>
          </form>
          <p className="forgot-password">Forgot Password?</p>
          <p className="register-text">
            Don't have an account? <Link to="/signup" className="register-link">Register</Link>
          </p>
        </div>
        <div className="login-right">
          <h2>EduFlex AI</h2>
          <p>New to the platform?</p>
          <button className="new-signup" onClick={() => navigate("/signup")}>
            Register Now
          </button>        </div>
      </div>
    </div>
  );
};

export default Login;
