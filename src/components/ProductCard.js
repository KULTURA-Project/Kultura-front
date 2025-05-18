import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [error, setError] = useState(null);

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

  const imageURL = product.images && product.images.length > 0 ? `http://127.0.0.1:8000${product.images[0].image}` : null;

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
        </Link>
        <p className="product-category">{product.category?.name}</p>
        <div className="product-price">${product.price}</div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <button
        className="add-to-cart-fab"
        onClick={handleAddToCart}
        disabled={isAddedToCart}
        title={isAddedToCart ? "Added to Cart" : "Add to Cart"}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default ProductCard;
