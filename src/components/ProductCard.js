// components/ProductCard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./ProductCard.css";
const ProductCard = ({ product }) => {
    const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (product.images[0]?.image) {
      fetch(product.images[0].image)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setImageURL(url);
        });
    }
  }, [product.images]);

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="product-link">
      <img 
        src={imageURL} 
        alt={product.name}
        className="product-image"
      />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category?.name}</p>
          <div className="product-price">
            ${product.price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
