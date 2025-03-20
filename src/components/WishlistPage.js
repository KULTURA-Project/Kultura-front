import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/orders/orders/wishlist/');
                setWishlistItems(response.data);
            } catch (error) {
                if (error.response) {
                    console.error("API Error:", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
            }
        };

        fetchWishlist();
    }, []);

    return (
        <div>
            <h1>Wishlist</h1>
            {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <Link to={`/products/${item.id}`}>View Product</Link>
                    </div>
                ))
            ) : (
                <p>No items in wishlist.</p>
            )}
        </div>
    );
}

export default WishlistPage;
