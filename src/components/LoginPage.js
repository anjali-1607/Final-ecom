import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const VALIDATION_MESSAGES = {
    allFieldsRequired: "All fields are required.",
    invalidEmail: "Please enter a valid email.",
    shortPassword: "Password must be at least 6 characters long.",
    invalidCredentials: "Invalid email or password.",
  };

  // Validate email format
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      setError(VALIDATION_MESSAGES.allFieldsRequired);
      return;
    }
    if (!isEmailValid(email)) {
      setError(VALIDATION_MESSAGES.invalidEmail);
      return;
    }
    if (password.length < 6) {
      setError(VALIDATION_MESSAGES.shortPassword);
      return;
    }

    // Check credentials in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setError("");
      navigate("/"); // Redirect to homepage

      // Save email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    } else {
      setError(VALIDATION_MESSAGES.invalidCredentials);
    }
  };

  // Auto-fill email if "Remember Me" is enabled
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="login-subtext">Please log in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
