// components/FeatureProduct.js
import React from 'react';
import './FeatureProduct.css';
// components/FeatureProduct.js


const FeatureProduct = ({ product, className }) => {
  return (
    <div className={`feature-product ${className}`}>
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </button>
    </div>
  );
};

export default FeatureProduct;