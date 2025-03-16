import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const sliderRef = useRef(null); // Ref for the slider container

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
            sliderRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 200; // Adjust scroll distance as needed
        }
    };

    return (
        <header className="header">
            {/* Top Navbar */}
            <div className="navbar">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Kultura
                </Link>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-bar"
                />

                {/* User & Cart Icons */}
                <div className="icon-links">
                    <Link to="/account">
                        <FaUser size={20} />
                    </Link>
                    <Link to="/cart" className="relative">
                        <FaShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">2</span>
                    </Link>
                </div>
            </div>

            {/* Horizontal Sliding Categories */}
            <div className="categories-slider-container">
                <button className="slider-button left" onClick={slideLeft}>
                    <FaChevronLeft />
                </button>
                <div className="categories-slider" ref={sliderRef}>
                    <motion.div
                        className="categories-list"
                    >
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
        </header>
    );
};

export default Header;
