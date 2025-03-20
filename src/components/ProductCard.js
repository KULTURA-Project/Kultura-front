import { faCheck, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product, onSelect, isSelected }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // Check if product is already in wishlist or cart on mount
    useEffect(() => {
        const checkProductStatus = async () => {
            try {
                const wishlistResponse = await axios.get('http://127.0.0.1:8000/orders/check-wishlist/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                    params: {
                        product_id: product.id,
                    },
                });
                setIsWishlisted(wishlistResponse.data.is_in_wishlist);

                const cartResponse = await axios.get('http://127.0.0.1:8000/orders/check-cart/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                    params: {
                        product_id: product.id,
                    },
                });
                setIsAddedToCart(cartResponse.data.is_in_cart);
            } catch (error) {
                console.error(error);
            }
        };
        checkProductStatus();
    }, [product.id]);

    const handleAddToWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/add-to-wishlist/', {
                product_id: product.id,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setIsWishlisted(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/remove-from-wishlist/', {
                product_id: product.id,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setIsWishlisted(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/add-to-cart/', {
                product_id: product.id,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setIsAddedToCart(true);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleRemoveFromCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/remove-from-cart/', {
                product_id: product.id,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setIsAddedToCart(false);
        } catch (error) {
            console.error(error);
        }
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
                    e.preventDefault();
                    e.stopPropagation();
                    isWishlisted ? handleRemoveFromWishlist(e) : handleAddToWishlist(e);
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
                        e.preventDefault();
                        e.stopPropagation();
                        isAddedToCart ? handleRemoveFromCart(e) : handleAddToCart(e);
                    }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                    {isSelected && <FontAwesomeIcon icon={faCheck} className="selected-icon" />}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
