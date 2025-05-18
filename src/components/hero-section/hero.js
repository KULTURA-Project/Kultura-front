/* -------------------------------------------
File: Hero.js
Description: Composant React pour le hero avec carrousel
------------------------------------------- */
import React, { useState } from 'react';
import './Hero.css';

const carouselImages = [
  '[https://via.placeholder.com/400x400?text=Image+1](https://via.placeholder.com/400x400?text=Image+1)',
  '[https://via.placeholder.com/400x400?text=Image+2](https://via.placeholder.com/400x400?text=Image+2)',
  '[https://via.placeholder.com/400x400?text=Image+3](https://via.placeholder.com/400x400?text=Image+3)',
  '[https://via.placeholder.com/400x400?text=Image+4](https://via.placeholder.com/400x400?text=Image+4)',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % carouselImages.length);
  };

  return (<section className="hero">
    {/* Background pattern */} <div className="hero-pattern left" /> <div className="hero-pattern right" />

    ```
    <div className="hero-content">
      {/* Carousel Image */}
      <div className="hero-image-container">
        <img
          src={carouselImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="hero-image"
        />
      </div>

      {/* Texte et actions */}
      <div className="hero-text">
        <h2>Vase de Solomon</h2>
        <span className="hero-tag">sculpture</span>
        <p>
          Découvrez le Vase de Solomon, chef-d’œuvre d’élégance et de mystère, façonné selon une tradition
          millénaire. Son alliage subtil de motifs gravés à la main et de reflets dorés capture la lumière pour
          sublimer chaque pièce où il trône. Offrez-vous un symbole d’exception : unicité, raffinement et légende
          se rencontrent dans ce vase d’exception.
        </p>
        <button className="btn-primary">Ajouter au panier</button>

        {/* Pagination */}
        <div className="hero-pagination">
          {carouselImages.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Controls */}
    <button className="carousel-btn prev" onClick={prevSlide}>&lt;</button>
    <button className="carousel-btn next" onClick={nextSlide}>&gt;</button>
  </section>


  );
}

/* -------------------------------------------
File: Hero.css
Description: Styles pour le composant Hero
------------------------------------------- */

