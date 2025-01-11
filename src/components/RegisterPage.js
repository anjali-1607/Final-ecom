import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/RegisterPage.css";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const getPasswordStrength = (password) => {
        return password.length >= 6 ? "Password is valid" : "";
    };

    const handleRegister = (e) => {
        e.preventDefault();

        let newError = {};

        if (!name) newError.name = "Name is required.";
        if (!email) newError.email = "Email is required.";
        else if (!isEmailValid(email))
            newError.email = "Please enter a valid email.";

        if (!password) newError.password = "Password is required.";
        else if (password.length < 6)
            newError.password = "Password must be at least 6 characters long.";

        if (password !== confirmPassword)
            newError.confirmPassword = "Passwords do not match!";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some((user) => user.email === email);

        if (userExists) {
            setError({ email: "User with this email already exists!" });
            return;
        }

        const newUser = { name, email, password };
        localStorage.setItem(
            "users",
            JSON.stringify([...storedUsers, newUser])
        );
        alert("Registration successful! You can now log in.");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                        {error.name && (
                            <span className="error-message">{error.name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        {error.email && (
                            <span className="error-message">{error.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <div className="password-strength">
                            Password Strength:{" "}
                            <strong>{getPasswordStrength(password)}</strong>
                        </div>
                        {error.password && (
                            <span className="error-message">
                                {error.password}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                        />
                        {error.confirmPassword && (
                            <span className="error-message">
                                {error.confirmPassword}
                            </span>
                        )}
                    </div>
                    <button type="submit" className="btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
