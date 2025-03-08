// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Web ID</th>
                        <th>Category</th>
                        <th>Is Active</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        {/* Add more table headers for other product fields */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.web_id}</td>
                            <td>{product.category}</td>
                            <td>{product.is_active ? 'Yes' : 'No'}</td>
                            <td>{new Date(product.created_at).toLocaleDateString()}</td>
                            <td>{new Date(product.updated_at).toLocaleDateString()}</td>
                            {/* Add more table data cells for other product fields */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
