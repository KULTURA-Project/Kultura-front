// components/ProductCard.js
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product, onSelect, isSelected }) => {  // Add onSelect and isSelected props
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);  // State for wishlist status


    useEffect(() => {
        const loadImage = async () => {
            setLoading(true);
            setError(null);

            if (product.images && product.images.length > 0 && product.images[0].image) {
                const imagePath = product.images[0].image;

                try {
                    const response = await fetch(imagePath, { mode: 'cors' });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageURL(url);
                } catch (e) {
                    console.error("Could not load image:", e);
                    setError(e);
                } finally {
                    setLoading(false);
                }
            } else {
                console.warn("No image URL found for product:", product.name);
                setImageURL(null);
                setLoading(false);
            }
        };

        loadImage();
    }, [product]);


    const handleAddToWishlist = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the heart icon
        setIsWishlisted(!isWishlisted);  // Toggle wishlist status
        // Implement your add to wishlist logic here - API call or local storage update

        console.log(`Add to wishlist: ${product.name}`);
    };


    return (
        <div className={`product-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="wishlist-icon" onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist(e);
            }}>
                <FontAwesomeIcon icon={faHeart} style={{ color: isWishlisted ? 'red' : 'inherit' }} />
            </div>
            <Link to={`/products/${product.slug}`} className="product-link">
                {loading && <p>Loading image...</p>}
                {error && <p>Error loading image!</p>}
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt={product.name}
                        className="product-image"
                        style={{ display: loading || error ? 'none' : 'block' }}
                    />
                ) : (
                    <div className="no-image">No Image Available</div>
                )}

                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category?.name}</p>
                    <div className="product-price">
                        ${product.price}
                    </div>
                </div>
                {isSelected && <FontAwesomeIcon icon={faCheck} className="selected-icon" />}  {/*Show check when the image is selected*/}
            </Link>
        </div>
    );
};

export default ProductCard;
