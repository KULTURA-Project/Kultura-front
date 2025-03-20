import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check token on initial render
    const location = useLocation();
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categories/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Watch for token changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update login state based on token presence
    }, [location]); // Re-run when location changes (e.g., after login)

    // Slider controls
    const slideLeft = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft -= 200;
    };

    const slideRight = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft += 200;
    };

    // Toggle dropdowns
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/customers/logout/', {}, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            localStorage.removeItem('token');
            setIsLoggedIn(false); // Update state to trigger re-render
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="header">
            {/* Top Navbar */}
            <div className="navbar">
                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <FaBars size={24} />
                </button>

                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="text-2xl font-bold text-gray-800">Kultura</span>
                </Link>

                {/* Search Bar */}
                <div className="search-bar-container">
                    <input type="text" placeholder="Search products..." className="search-bar" />
                    <FaSearch className="search-icon" />
                </div>

                {/* Navigation Links */}
                <div className="nav-links">
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    {isLoggedIn && (
                        <>
                            <Link to="/wishlist">Wishlist</Link> {/* Add Wishlist Link */}
                            <Link to="/cart">Cart</Link> {/* Add Cart Link */}
                        </>
                    )}
                </div>

                {/* User & Cart Icons */}
                <div className="icon-links">
                    {isLoggedIn ? (
                        <div className="user-icon" onClick={toggleUserDropdown}>
                            <FaUser size={20} />
                            <AnimatePresence>
                                {isUserDropdownOpen && (
                                    <motion.div
                                        className="user-dropdown"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <Link to="/profile">Profile</Link>
                                        <Link to="/orders">Orders</Link>
                                        <Link to="/" onClick={handleLogout}>Logout</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="login-register-links">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" className="wishlist-icon">
                        <FaHeart size={20} />
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" className="cart-icon">
                        <FaShoppingCart size={20} />
                        {/* Optionally display cart count */}
                        <span className="cart-count">2</span>
                    </Link>
                </div>
            </div>

            {/* Horizontal Sliding Categories */}
            <div className="categories-slider-container">
                <button className="slider-button left" onClick={slideLeft}>
                    <FaChevronLeft />
                </button>
                <div className="categories-slider" ref={sliderRef}>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/category-products/${category.id}`}
                                className={`category-item ${location.pathname === `/category-products/${category.id}` ? 'active' : ''}`}
                            >
                                {category.name}
                            </Link>
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </div>
                <button className="slider-button right" onClick={slideRight}>
                    <FaChevronRight />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="mobile-menu"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                >
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                            {/* Add Wishlist and Cart Links in Mobile Menu */}
                            <Link to="/wishlist">Wishlist</Link>
                            <Link to="/cart">Cart</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </motion.div>
            )}
        </header>
    );
};

export default Header;
