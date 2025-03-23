import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartComponent.css';

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/orders/cart/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setCartItems(response.data);
                const initialQuantities = {};
                response.data.forEach(item => {
                    initialQuantities[item.id] = item.quantity || 1;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch cart items');
            }
        };
        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await axios.post('http://127.0.0.1:8000/orders/cart/remove/', {
                cart_item_id: cartItemId,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setCartItems(cartItems.filter(item => item.id !== cartItemId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.post('http://127.0.0.1:8000/orders/cart/update/', {
                cart_item_id: cartItemId,
                quantity: newQuantity,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setQuantities((prev) => ({ ...prev, [cartItemId]: newQuantity }));
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.product.price * quantities[item.id], 0);
    };

    return (
        <div className="cart-component">
            <h2>Cart</h2>
            {error && <div className="error-message">{error}</div>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <Link to={`/products/${item.product.slug}`}>
                                            {item.product.images && item.product.images.length > 0 ? (
                                                <img
                                                    src={`http://127.0.0.1:8000${item.product.images[0].image}`}
                                                    alt={item.product.name}
                                                    className="product-image"
                                                />
                                            ) : (
                                                <div className="no-image">No Image Available</div>
                                            )}
                                        </Link>
                                    </td>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.category?.name || "N/A"}</td>
                                    <td>{item.product.product_type?.name || "N/A"}</td>
                                    <td>
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-button"
                                                onClick={() =>
                                                    handleQuantityChange(item.id, quantities[item.id] - 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={quantities[item.id]}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.id, parseInt(e.target.value))
                                                }
                                                min="1"
                                            />
                                            <button
                                                className="quantity-button"
                                                onClick={() =>
                                                    handleQuantityChange(item.id, quantities[item.id] + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>${item.product.price}</td>
                                    <td>${(item.product.price * quantities[item.id]).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="remove-from-cart-button"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            &times;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="total-price">
                        Total: ${calculateTotal().toFixed(2)}
                    </div>
                    <button
                        className="complete-order-button"
                        onClick={() => console.log("Complete Order")}
                    >
                        Complete Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartComponent;
