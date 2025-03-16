// components/Header.js
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [categories, setCategories] = useState([]);

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
      <motion.div className="categories-slider" whileTap={{ cursor: "grabbing" }}>
        <motion.div 
          drag="x" 
          dragConstraints={{ left: -300, right: 0 }} 
          className="categories-list"
        >
          {categories.length > 0 ? (
            categories.map((category) => (
             // components/Header.js
<Link key={category.id} to={`/category-products/${category.id}`} className="category-item">
  {category.name}
</Link>

            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
