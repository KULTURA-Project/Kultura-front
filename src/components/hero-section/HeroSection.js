import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './HeroSection.css';

const carouselImages = [
    'https://placehold.co/400x400?text=Image',
    'https://placehold.co/400x400?text=Image',
    'https://placehold.co/400x400?text=Image',
    'https://placehold.co/400x400?text=Image',
];

const HeroSection = () => {

    const [promotion, setPromotion] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + carouselImages.length) % carouselImages.length);
    };

    const carrouselItems = [
        {
            id: 1,
            image: 'https://placehold.co/400x400?text=Image+1',
            title: 'Vase de Solomon',
            description: 'Découvrez le Vase de Solomon, chef-d’œuvre d’élégance et de mystère, façonné selon une tradition millénaire. Son alliage subtil de motifs gravés à la main et de reflets dorés capture la lumière pour sublimer chaque pièce où il trône. Offrez-vous un symbole d’exception : unicité, raffinement et légende se rencontrent dans ce vase d’exception.',
            tag: 'Sculpture',
        },
        {
            id: 2,
            image: 'https://placehold.co/400x400?text=Image+2',
            title: 'Masque Fang',
            description: 'Le Masque Fang, emblème de la culture africaine, séduit par ses lignes épurées et son aura mystique. Sculpté dans le bois, il incarne la force et la sagesse des anciens, parfait pour une décoration authentique et inspirante.',
            tag: 'Art africain',
        },
        {
            id: 3,
            image: 'https://placehold.co/400x400?text=Image+3',
            title: 'Tapis berbère',
            description: 'Ce tapis berbère, tissé à la main, apporte chaleur et caractère à votre intérieur. Ses motifs géométriques racontent l’histoire d’un savoir-faire ancestral transmis de génération en génération.',
            tag: 'Textile',
        },
        {
            id: 4,
            image: 'https://placehold.co/400x400?text=Image+4',
            title: 'Statue Ashanti',
            description: 'La statue Ashanti, symbole de prospérité et de protection, est une pièce unique réalisée en bronze selon la technique de la cire perdue. Elle sublime votre espace par sa présence et son histoire.',
            tag: 'Bronze',
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % carrouselItems.length);
    };

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




    return (<section className="hero">
        {/* Background pattern */}
        <div className="hero-pattern left" />
        <div className="hero-content">
            <div className='hero-content-container'>
                {/* Carousel Image */}
                <div className="hero-image-container">
                    <img
                        src={carrouselItems[currentIndex].image}
                        alt={`Slide ${currentIndex + 1}`}
                        className="hero-image"
                    />
                </div>

                {/* Texte et actions */}
                <div className="hero-text">
                    <h2>{carrouselItems[currentIndex].title}</h2>
                    <span className="hero-tag btn btn-pill">{carrouselItems[currentIndex].tag}</span>
                    <p>
                        {carrouselItems[currentIndex].description}
                    </p>
                    <button className="btn btn-primary">Ajouter au panier</button>

                </div>
            </div>                {/* Pagination */}
            <div className="hero-pagination">
                {carrouselItems.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>
        <div className="hero-pattern right" />

        {/* Controls */}
        <button className="carousel-btn prev" onClick={prevSlide}>&lt;</button>
        <button className="carousel-btn next" onClick={nextSlide}>&gt;</button>
    </section>


    );
};

export default HeroSection;

