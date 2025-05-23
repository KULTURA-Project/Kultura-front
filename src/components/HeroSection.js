import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './HeroSection.css';

const HeroSection = () => {
    const [promotion, setPromotion] = useState(null);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/home/api/promotions/hero/'); // Fetch all promotions
                if (!response.ok) {
                    throw new Error('Could not fetch promotions');
                }
                const data = await response.json();
                setPromotion(data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };

        fetchPromotion();
    }, []);

    if (!promotion) {
        return <div className="no-promotions">No promotions available.</div>;
    }

    return (
        <section className="hero">
            <div
                className="hero-slide"
                style={{ backgroundImage: `url(${promotion.image})` }}
            >
                <div className="hero-content">
                    <h1>{promotion.name}</h1>
                    <p>{promotion.description}</p>
                    <a href={promotion.link} className="cta-button">Shop Now</a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
