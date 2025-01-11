import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"; // Importing icons
import "./css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    // Remove logged-in user's credentials from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    alert("Logged Out Successfully!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar">
        <p>📍 India</p>
        <p>🚚 Free Delivery on orders above ₹500 | T&C Apply</p>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-left">
          <img
            src="https://via.placeholder.com/150x50?text=LOGO" // Replace with your logo
            alt="Logo"
            onClick={() => navigate("/home")}
            className="navbar-logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="navbar-center">
          <ul className="nav-links">
            <li onClick={() => navigate("/new-arrivals")}>New Arrivals</li>
            <li onClick={() => navigate("/women")}>Women</li>
            <li onClick={() => navigate("/men")}>Men</li>
            <li onClick={() => navigate("/kids")}>Kids</li>
            <li onClick={() => navigate("/home-living")}>Home & Living</li>
            <li onClick={() => navigate("/sale")}>Sale</li>
          </ul>
        </div>

        {/* Right Icons Section */}
        <div className="navbar-right">
          <FaSearch className="icon" onClick={() => alert("Search clicked")} />
          <div className="cart-container" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="icon" />
            <span className="cart-count">{cartCount}</span>
          </div>
          <div
            className="profile-container"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <FaUser className="icon" />
          </div>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <ul>
                <li onClick={() => navigate("/profile")}>My Profile</li>
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
