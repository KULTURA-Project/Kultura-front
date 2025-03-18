import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const sliderRef = useRef(null);

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

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 200;
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 200;
        }
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
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
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-bar"
                    />
                    <FaSearch className="search-icon" />
                </div>

                {/* Navigation Links (Added here) */}
                <div className="nav-links">
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* User & Cart Icons */}
                <div className="icon-links">
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
                                    <Link to="/account">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/logout">Logout</Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" className="wishlist-icon">
                        <FaHeart size={20} />

                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" className="cart-icon">
                        <FaShoppingCart size={20} />
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
                    <motion.div className="categories-list">
                        {categories.length > 0 ? (
                            categories.map((category) => {
                                const isActive = location.pathname === `/category-products/${category.id}`;
                                return (
                                    <Link
                                        key={category.id}
                                        to={`/category-products/${category.id}`}
                                        className={`category-item ${isActive ? 'active' : ''}`}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })
                        ) : (
                            <p>Loading categories...</p>
                        )}
                    </motion.div>
                </div>
                <button className="slider-button right" onClick={slideRight}>
                    <FaChevronRight />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
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
                         <Link to="/wishlist">Wishlist</Link> {/* ADDED */}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
