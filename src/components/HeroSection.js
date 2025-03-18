import React, { useCallback, useEffect, useState } from 'react';
import './HeroSection.css'; // Import CSS file

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            id: 1,
            title: 'Discover Unique Handcrafted Items',
            description: 'Explore our curated collection of artisan-made goods and support independent creators.',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Famazing-pictures&psig=AOvVaw1ZAwJM55KdjlN9D3ZcI5Lm&ust=1742344223314000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj8rJewkowDFQAAAAAdAAAAABAE', // Replace with your image URL
        },
        {
            id: 2,
            title: 'Elevate Your Home Decor',
            description: 'Find the perfect pieces to add character and style to your living space.',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Famazing-pictures&psig=AOvVaw1ZAwJM55KdjlN9D3ZcI5Lm&ust=1742344223314000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj8rJewkowDFQAAAAAdAAAAABAE', // Replace with your image URL
        },
        {
            id: 3,
            title: 'Support Ethical and Sustainable Practices',
            description: 'Shop with confidence knowing that our products are ethically sourced and environmentally friendly.',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Famazing-pictures&psig=AOvVaw1ZAwJM55KdjlN9D3ZcI5Lm&ust=1742344223314000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj8rJewkowDFQAAAAAdAAAAABAE', // Replace with your image URL
        },
    ];

    // Use useCallback to memoize nextSlide
    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, [slides.length]); // Only recreate nextSlide if slides.length changes

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Clear interval on unmount
    }, [nextSlide]); // Add nextSlide as a dependency

    return (
        <div className="hero-carousel">
            <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide) => (
                    <div key={slide.id} className="carousel-slide">
                        <img src={slide.image} alt={slide.title} className="slide-image" />
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <button className="cta-button">Shop Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
