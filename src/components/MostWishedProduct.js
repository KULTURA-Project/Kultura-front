// MostWishedProduct.js
import React from 'react';

const MostWishedProduct = ({ product }) => {
  return (
    <section className="most-wished-product-section">
      <h2>Most Wished Product</h2>
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
      </div>
    </section>
  );
};

export default MostWishedProduct;
