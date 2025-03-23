import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0); // Track the selected image index

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product-page/${slug}/`);
        setProduct(response.data);
        setSelectedImage(0); // Reset to the first image when product changes
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  // Fetch similar products based on category
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const categoryId = product.category?.id;
        if (categoryId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/products/?category=${categoryId}`);
          setSimilarProducts(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    if (product.category?.id) {
      fetchSimilarProducts();
    }
  }, [product.category?.id]);

  // Handle image selection (swap main image with thumbnail)
  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  // Handle quantity changes
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add product to cart
  const handleAddToCart = async () => {
    setAddToCartLoading(true);
    try {
      await axios.post(
        'http://127.0.0.1:8000/orders/cart/add/',
        {
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Add product to wishlist
  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/orders/wishlist/add/',
        { product_id: productId },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // Render tab content dynamically
  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return product.specifications ? (
          <ul className="specifications-list">
            {product.specifications.map((spec) => (
              <li key={spec.id}>
                <strong>{spec.name}:</strong> {spec.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No specifications available.</p>
        );
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
      {/* Product Image and Info Section */}
      <div className="image-info-container">
        {/* Image Gallery */}
        <div className="product-image-section">
          {/* Main Image */}
          <div className="main-image-container">
            <img
              src={product.images?.[selectedImage]?.image}
              alt={product.name}
              className="main-image"
            />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-gallery">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={image.image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">CFA {new Intl.NumberFormat('en-US').format(product.price)}</p>
          <p>
            <strong>Category:</strong> {product.category?.name}
          </p>
          <p>
            <strong>Type:</strong> {product.product_type?.name}
          </p>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={addToCartLoading}
          >
            {addToCartLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Tabs for Specifications, History, and Reviews */}
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

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>

      {/* Similar Products Section */}
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="similar-product-card">
              <div className="image-container">
                <Link to={`/products/${similarProduct.slug}`} className="product-link">
                  {similarProduct.images?.[0]?.image ? (
                    <img
                      src={similarProduct.images[0].image}
                      alt={similarProduct.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </Link>
                <div
                  className="wishlist-icon"
                  onClick={() => handleAddToWishlist(similarProduct.id)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>

              <div className="product-info">
                <Link to={`/products/${similarProduct.slug}`} className="product-link">
                  <h3 className="product-name">{similarProduct.name}</h3>
                  <p className="product-category">{similarProduct.category?.name}</p>
                </Link>
                <div className="product-price">CFA {new Intl.NumberFormat('en-US').format(similarProduct.price)}</div>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(similarProduct.id)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
