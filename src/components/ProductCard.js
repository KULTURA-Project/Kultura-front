import { faCheck, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product, onSelect, isSelected }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
        console.log(`Add to wishlist: ${product.name}`);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log(`Add to cart: ${product.name}`);
        // Implement your add to cart logic here (e.g., dispatch an action to Redux, update local storage, etc.)
    };

    // Get the first image URL (if available)
    const imageURL = product.images && product.images.length > 0 ? product.images[0].image : null;

    return (
        <div className={`product-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
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
                <div className="wishlist-icon" onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(e);
                }}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: isWishlisted ? 'red' : 'inherit' }} />
                </div>
            </div>

            <div className="product-info">
                <Link to={`/products/${product.slug}`} className="product-link">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category?.name}</p>
                </Link>
                <div className="product-price">
                    ${product.price}
                </div>
                <div className="product-actions">
                    <button className="add-to-cart-button" onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e);
                    }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </button>
                    {isSelected && <FontAwesomeIcon icon={faCheck} className="selected-icon" />}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
