import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle adding a product to the cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(
        'http://127.0.0.1:8000/orders/cart/add/',
        { product_id: product.id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      setIsAddedToCart(true);
    } catch (error) {
      console.error(error);
      setError('Failed to add to cart');
    }
  };

  // Function to handle adding a product to the wishlist
  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(
        'http://127.0.0.1:8000/orders/wishlist/add/',
        { product_id: product.id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      setIsWishlisted(true);
    } catch (error) {
      console.error(error);
      setError('Failed to add to wishlist');
    }
  };

  // Get the first image URL (if available)
  const imageURL = product.images && product.images.length > 0 ? product.images[0].image : null;

  return (
    <div className="product-card">
      <div className="image-container">
        <Link to={`/products/${product.slug}`} className="product-link">
          {imageURL ? (
            <img
              src={imageURL}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </Link>
        <div className="wishlist-icon" onClick={handleAddToWishlist}>
          <FontAwesomeIcon icon={faHeart} style={{ color: isWishlisted ? 'red' : 'inherit' }} />
        </div>
      </div>

      <div className="product-info">
        <Link to={`/products/${product.slug}`} className="product-link">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category?.name}</p>
        </Link>
        <div className="product-price">${product.price}</div>
        <div className="product-actions">
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
