// pages/Home.js
import React, { useState } from 'react';
import FeatureProduct from '../components/FeatureProduct';
import HeroSection from "../components/HeroSection";
import { featuredProducts } from '../utils/products';
import './Home.css';
const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

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
    <div>
      <HeroSection />
      <h1 className="text-center mb-4">Featured Products</h1>
      <div className="flex justify-center mb-4">
        <button className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleSlideLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="feature-products w-full overflow-hidden">
          <div className="inner-slide flex" style={{ transform: `translateX(-${slideIndex * 300}px)` }}>
            {featuredProducts.map((product) => (
              <FeatureProduct key={product.id} product={product} className="mr-4" />
            ))}
          </div>
        </div>
        <button className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={handleSlideRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      {/* Other content goes here */}
    </div>
  );
};

export default Home;
