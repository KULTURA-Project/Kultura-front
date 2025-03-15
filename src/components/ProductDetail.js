import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}/`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{product.name}</h1>
            <div className="row">
                <div className="col-md-6">
                    {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].image} alt={product.name} style={{ width: '100%' }} />
                    ) : (
                        <img src="http://via.placeholder.com/400x300" alt="Placeholder" style={{ width: '100%' }} />
                    )}
                </div>
                <div className="col-md-6">
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    {/* Display specifications */}
                    {product.specifications && product.specifications.length > 0 && (
                        <div>
                            <h4>Specifications</h4>
                            <ul>
                                {product.specifications.map(spec => (
                                    <li key={spec.id}>
                                        {spec.name}: {spec.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
