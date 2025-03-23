import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span> &gt; </span>
                <span>About Us</span>
            </div>

            <h1>About Us</h1>
            <section className="about-section">
                <p>
                    Welcome to Kultura, your destination for unique and handcrafted goods. We are passionate about bringing you the best products from talented artisans around the world.
                </p>
                <p>
                    Our mission is to support independent creators and provide you with high-quality, ethically sourced items that you'll love for years to come.
                </p>
            </section>

            {/* History Section */}
            <section className="history-section">
                <h2>Our Story</h2>
                <p>
                    Kultura was founded with the vision of connecting artisans with customers who value quality and craftsmanship. It all started with a simple idea: to create a platform where creativity meets sustainability.
                </p>
                <p>
                    Over the years, we’ve grown into a global community that celebrates diversity, artistry, and ethical practices. Every product we offer tells a story of dedication and passion.
                </p>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <h2>Our Mission</h2>
                <p>
                    At Kultura, our mission is to empower artisans by providing them with a platform to share their creations. We believe in fair trade practices, environmental sustainability, and fostering creativity.
                </p>
                <p>
                    By choosing Kultura, you’re not just buying a product—you’re supporting a movement that values people and the planet.
                </p>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p>
                    Behind Kultura is a team of passionate individuals who believe in making a difference. From sourcing products to ensuring customer satisfaction, our team works tirelessly to bring you the best experience possible.
                </p>
                <div className="team-images">
                    {/* Replace with actual team member images */}
                    <img src="https://via.placeholder.com/150" alt="Team Member 1" />
                    <img src="https://via.placeholder.com/150" alt="Team Member 2" />
                    <img src="https://via.placeholder.com/150" alt="Team Member 3" />
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
                <h2>Join Our Community</h2>
                <p>Be part of our journey by exploring our collections or joining us as an artisan.</p>
                <Link to="/collections" className="cta-button">Explore Collections</Link>
                <Link to="/join-us" className="cta-button">Become an Artisan</Link>
            </section>
        </div>
    );
};

export default AboutUsPage;
