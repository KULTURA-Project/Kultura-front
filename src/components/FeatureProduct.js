// FeaturedProducts.js
import React from 'react';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="featured-products-section">
      <h2>Featured Products</h2>
      <div className="featured-products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
