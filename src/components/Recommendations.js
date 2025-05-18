// Recommendations.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component
import './Recommendations.css'; // Create Recommendations.css for styling

const Recommendations = () => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/home/api/recommendations/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setRecommendedProducts(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <section className="recommendations-section">
            <h2>Recommended Products</h2>
            <div className="recommendations-grid">
                {recommendedProducts.slice(0,4).map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Recommendations;
