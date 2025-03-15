// components/FeaturedProducts.js
import React from 'react';
import { featuredProducts } from '../utils/products';

const FeatureProduct = ({ product }) => {
  return (
    <div className="feature-product">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button>View Details</button>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <div>
      <h1>Featured Products</h1>
      {featuredProducts.map((product) => (
        <FeatureProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
