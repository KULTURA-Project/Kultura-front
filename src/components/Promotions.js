import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Promotions.css';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/home/api/promotions/');
        setPromotions(response.data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };
    fetchPromotions();
  }, []);

  if (!promotions.length) return null;

  return (
    <section className="promotions-section">
      <h2 className="promotions-title">Current Promotions</h2>
      <div className="promotions-grid">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="promotion-card">
            {promotion.image && (
              <img
                src={promotion.image}
                alt={promotion.name}
                className="promotion-image"
                loading="lazy"
              />
            )}
            <h3 className="promotion-name">{promotion.name}</h3>
            {promotion.discount_percentage && (
              <span className="promotion-discount">-{promotion.discount_percentage}%</span>
            )}
            {promotion.description && (
              <p className="promotion-description">{promotion.description}</p>
            )}
            {promotion.link && (
              <Link to={promotion.link} className="promotion-link">
                Shop Now
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
