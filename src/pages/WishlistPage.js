import axios from 'axios';
import React, { useEffect, useState } from 'react';

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/orders/wishlist/');
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

    const handleAddToWishlist = async (productId) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/add-to-wishlist/', {
                product_id: productId,
            });
            console.log(response.data);
            // Fetch updated wishlist
            const updatedResponse = await axios.get('http://127.0.0.1:8000/orders/wishlist/');
            setWishlistItems(updatedResponse.data);
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

    return (
        <div>
            <h1>Wishlist</h1>
            {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))
            ) : (
                <p>No items in wishlist.</p>
            )}
            <button onClick={() => handleAddToWishlist(1)}>Add Item to Wishlist</button>
        </div>
    );
}

export default WishlistPage;
