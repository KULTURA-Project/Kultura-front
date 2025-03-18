import React, { useEffect, useState } from 'react';
import FeatureProduct from '../components/FeatureProduct';
import HeroSection from "../components/HeroSection";
import { featuredProducts } from '../utils/products'; // Assuming you have this
import './Home.css';

const Home = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categories/'); // Replace with your API endpoint
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

    const handleSlideLeft = () => {
        if (slideIndex > 0) {
            setSlideIndex(slideIndex - 1);
        }
    };

    const handleSlideRight = () => {
        if (slideIndex < featuredProducts.length - 3) {
            setSlideIndex(slideIndex + 1);
        }
    };

    return (
        <div className="home-page">
            <HeroSection />

            {/* Featured Products Section */}
            <section className="featured-products-section">
                <h2 className="section-title">Featured Products</h2>
                <div className="featured-products-slider">
                    <button className="slider-button left" onClick={handleSlideLeft}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="feature-products-container">
                        <div className="feature-products-inner"
                            style={{ transform: `translateX(-${slideIndex * 300}px)` }}>
                            {featuredProducts.map((product) => (
                                <FeatureProduct key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    <button className="slider-button right" onClick={handleSlideRight}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2 className="section-title">Shop by Category</h2>
                <div className="categories-grid">
                    {categories.map(category => (
                        <div key={category.id} className="category-card">
                            <img src={category.image} alt={category.name} className="category-image" />
                            <h3 className="category-name">{category.name}</h3>
                            <p className="category-description">{category.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us-section">
                <h2 className="section-title">About Us</h2>
                <div className="about-us-content">
                    <p>
                        Welcome to Kultura, your destination for unique and handcrafted goods.
                        We are passionate about bringing you the best products from talented artisans around the world.
                    </p>
                    <p>
                        Our mission is to support independent creators and provide you with high-quality,
                        ethically sourced items that you'll love for years to come.
                    </p>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <h2 className="section-title">Ready to Explore?</h2>
                <p>Browse our latest collections and discover something special today!</p>
                <button className="cta-button">Shop Now</button>
            </section>

    
        </div>
    );
};

export default Home;