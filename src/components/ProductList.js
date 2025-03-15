import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="row">
            {products.map(product => (
                <div className="col-md-4" key={product.id}>
                    <div className="card mb-4">
                        <img src={product.images && product.images.length > 0 ? product.images[0].image : "http://via.placeholder.com/200x150"} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description.substring(0, 100)}...</p>
                            <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
