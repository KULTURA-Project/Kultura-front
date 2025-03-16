import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('specifications');
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/product-page/${slug}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchSimilarProducts = async () => {
            try {
                const categoryId = product.category?.id;
                if (categoryId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/products/?category=${categoryId}`);
                    setSimilarProducts(response.data.slice(0, 5));
                }
            } catch (error) {
                console.error('Error fetching similar products:', error);
            }
        };

        fetchProduct();
        if (product.category?.id) {
            fetchSimilarProducts();
        }
    }, [slug, product.category?.id]);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'specifications':
                return product.specifications ? (
                    <ul>
                        {product.specifications.map(spec => (
                            <li key={spec.id}>{spec.name}: {spec.value}</li>
                        ))}
                    </ul>
                ) : <p>No specifications available.</p>;
            case 'history':
                return <p>{product.history || 'No history available.'}</p>;
            case 'reviews':
                return <p>No reviews available yet.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="product-detail-page">
            <div className="image-info-container">
                <div className="product-image-section">
                    <div className="thumbnails">
                        {product.images?.map((image, index) => (
                            <img key={index} src={image.image} alt={product.name} className="thumbnail" />
                        ))}
                    </div>
                    <img src={product.images?.[0]?.image} alt={product.name} className="product-image" />
                </div>

                <div className="product-info-section">
                    <div className="product-header">
                        <h1 className="product-title">{product.name}</h1>
                        <button className="wishlist-button">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>
                    <p className="product-price">CFA {formatPrice(product.price)}</p>
                    <div className="product-details">
                        <p><strong>Category:</strong> {product.category?.name}</p>
                        <p><strong>Product Type:</strong> {product.product_type?.name}</p>
                    </div>

                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="quantity-controls">
                            <button onClick={decreaseQuantity}>-</button>
                            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </div>

                    <button className="add-to-cart-button">Add to cart</button>
                </div>
            </div>

            <div className="product-tabs">
                <button
                    className={activeTab === 'specifications' ? 'active' : ''}
                    onClick={() => setActiveTab('specifications')}
                >
                    Specifications
                </button>
                <button
                    className={activeTab === 'history' ? 'active' : ''}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </button>
                <button
                    className={activeTab === 'reviews' ? 'active' : ''}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
            </div>
            <div className="tab-content">{renderTabContent()}</div>

            <div className="similar-products">
                <h2>Similar Products</h2>
                <div className="similar-products-list">
                    {similarProducts.map(similarProduct => (
                        <Link to={`/product-page/${similarProduct.slug}`} key={similarProduct.id} className="similar-product-card">
                            <img src={similarProduct.images?.[0]?.image} alt={similarProduct.name} />
                            <p>{similarProduct.name}</p>
                            <p>CFA {formatPrice(similarProduct.price)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
