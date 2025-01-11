import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./css/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(4);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Handle Logout
    const handleLogout = () => {
        // Remove logged-in user's credentials from localStorage
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        alert("Logged Out Successfully!");
        navigate("/login");
    };

    return (
        <header className="navbar-container">
            <nav className="navbar">
                {/* Logo Section */}
                <div className="navbar-left">
                    <img
                        src={logo}
                        alt="Logo"
                        onClick={() => navigate("/home")}
                        className="navbar-logo"
                    />
                </div>

                {/* Right Icons Section */}
                <div className="navbar-right">
                    <div
                        className="cart-container"
                        onClick={() => navigate("/cart")}>
                        <FaShoppingCart className="icon" />
                        <span className="cart-count">{cartCount}</span>
                    </div>
                    <div
                        className="profile-container"
                        onClick={() =>
                            setShowProfileDropdown(!showProfileDropdown)
                        }>
                        <FaUser className="icon" />
                    </div>
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            <ul>
                                <li onClick={() => navigate("/profile")}>
                                    My Profile
                                </li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
