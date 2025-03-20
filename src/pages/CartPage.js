import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/orders/cart/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
                });
                setCartItems(response.data);
                const total = response.data.reduce((acc, item) => acc + item.total_price, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <p>{item.product_name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                            <p>Total: ${item.total_price}</p>
                        </div>
                    ))}
                    <h2>Total Price: ${totalPrice}</h2>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartPage;
