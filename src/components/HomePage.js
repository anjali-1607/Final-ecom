import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa"; // Added clear icon
import Navbar from "./Navbar";
import "./css/HomePage.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products"
                );
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchProducts();
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        console.log("typing value", e.target.value);
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    // Handle clear search
    const clearSearch = () => {
        setSearchQuery("");
        setFilteredProducts(products);
    };

    // Handle category filtering
    const handleFilter = (category) => {
        setCategoryFilter(category);

        if (category === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(
                (product) => product.category === category
            );
            setFilteredProducts(filtered);
        }
    };

    // Add product to the cart
    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...storedCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Product added to cart!");
    };

    return (
        <div className="home-page">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="hero-section">
                <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a50a13168411771.644ea2a6b2810.jpg"
                    alt="Hero Banner"
                    className="hero-banner"
                />
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter">
                <div className="search-bar-container">
                    {/* <FaSearch className="search-icon" /> */}
                    <input
                        type="text"
                        placeholder="Search for products (e.g., laptop, shoes)"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                    {searchQuery && (
                        <FaTimes className="clear-icon" onClick={clearSearch} />
                    )}
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => handleFilter(e.target.value)}
                    className="filter-dropdown">
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelry</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>

            {/* Spinner or Product Grid */}
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                            />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-category">
                                Category: {product.category}
                            </p>
                            <p className="product-price">
                                ₹{(product.price * 80).toFixed(2)}
                            </p>
                            <button
                                onClick={() => addToCart(product)}
                                className="add-to-cart-btn">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
