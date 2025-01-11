import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa"; // Importing icons
import "./css/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * 80 * item.quantity, 0)
      .toFixed(2);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        <FaArrowLeft /> Back to Home
      </button>

      <h1 className="cart-title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button
            className="continue-shopping-btn"
            onClick={() => window.history.back()}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} className="cart-image" />
                <div className="cart-details">
                  <h3 className="cart-title">{item.title}</h3>
                  <p className="cart-price">
                    Price: ₹{(item.price * 80).toFixed(2)}
                  </p>
                  <p className="cart-quantity">Quantity: {item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-btn"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Price: ₹{calculateTotalPrice()}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
