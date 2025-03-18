import React from 'react';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import './ShopPage.css';

const ShopPage = () => {
    // Dummy product data (replace with your actual data fetching logic)
    const products = [
        { id: 1, name: 'Product 1', price: 25.00, images: [{ image: '/images/product1.jpg' }], slug: 'product-1' },
        { id: 2, name: 'Product 2', price: 50.00, images: [{ image: '/images/product2.jpg' }], slug: 'product-2' },
        { id: 3, name: 'Product 3', price: 75.00, images: [{ image: '/images/product3.jpg' }], slug: 'product-3' },
        // ... more products
    ];

    return (
        <div className="shop-page">
            <h1>Shop All Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
