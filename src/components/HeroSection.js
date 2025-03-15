import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./HeroSection.css";

const images = [
  "https://mawuafrica.com/collections/jewellery",
  "https://mawuafrica.com/collections/jewellery",
  "https://mawuafrica.com/collections/jewellery",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Hero"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="hero-image"
        />
      </AnimatePresence>
      
      <div className="hero-text">
        <h1>Discover Unique Artistic Creations</h1>
        <p>Shop handcrafted, exclusive, and artistic pieces from talented artists.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
