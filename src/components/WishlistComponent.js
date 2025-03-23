import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './WishlistComponent.css';

const WishlistComponent = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [addedToCart, setAddedToCart] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/orders/wishlist/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setWishlistItems(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch wishlist items');
            }
        };
        fetchWishlistItems();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            await axios.post('http://127.0.0.1:8000/orders/cart/add/', {
                product_id: productId,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setAddedToCart((prev) => ({ ...prev, [productId]: true }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.post('http://127.0.0.1:8000/orders/wishlist/remove/', {
                product_id: productId,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setWishlistItems(wishlistItems.filter(item => item.id !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="wishlist-component">
            <h2>Wishlist</h2>
            {error && <div className="error-message">{error}</div>}
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <table className="wishlist-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => {
                            const imageURL = item.images && item.images.length > 0
                                ? `http://127.0.0.1:8000${item.images[0].image}` // Construct full image URL
                                : 'https://via.placeholder.com/150'; // Fallback image
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <Link to={`/products/${item.slug}`}>
                                            <img
                                                src={imageURL}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                        </Link>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category?.name}</td>
                                    <td>{item.product_type?.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <div className="actions">
                                            <button
                                                className="add-to-cart-button"
                                                onClick={() => handleAddToCart(item.id)}
                                                disabled={addedToCart[item.id]}
                                            >
                                                {addedToCart[item.id] ? (
                                                    <FaCheck />
                                                ) : (
                                                    <FaShoppingCart />
                                                )}
                                            </button>
                                            <button
                                                className="remove-from-wishlist-button"
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WishlistComponent;
