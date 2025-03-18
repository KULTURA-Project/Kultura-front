import React from 'react';
import './WishlistPage.css';

const WishlistPage = () => {
    // Dummy wishlist items (replace with your actual data fetching logic)
    const wishlistItems = [
        { id: 1, name: 'Product 1', price: 25.00, images: [{ image: '/images/product1.jpg' }], slug: 'product-1' },
        { id: 2, name: 'Product 2', price: 50.00, images: [{ image: '/images/product2.jpg' }], slug: 'product-2' },
        { id: 3, name: 'Product 3', price: 75.00, images: [{ image: '/images/product3.jpg' }], slug: 'product-3' },
        // ... more wishlist items
    ];

    return (
        <div className="wishlist-page">
            <h1>My Wishlist</h1>
            <div className="wishlist-items">
                {wishlistItems.map(item => (
                    <div key={item.id} className="wishlist-item">
                        {item.name} - ${item.price.toFixed(2)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
