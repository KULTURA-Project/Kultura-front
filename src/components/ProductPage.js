import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('history');
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product-page/${slug}/`);
        setProduct(response.data);
        setSelectedImage(0);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleImageSelect = (index) => setSelectedImage(index);

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = async (productId) => {
    setAddToCartLoading(true);
    try {
      await axios.post(
        'http://127.0.0.1:8000/orders/cart/add/',
        {
          product_id: productId || product.id,
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

  const renderTabContent = () => {
    switch (activeTab) {
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
          {/* Thumbnails on the left */}
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
          {/* Main image with overlay arrows and zoom */}
          <div
            className={`main-image-container${isZoomed ? ' zoomed' : ''}`}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <button className="image-arrow left" onClick={handlePrevImage} aria-label="Previous image">
              &#8249;
            </button>
            <img
              src={product.images?.[selectedImage]?.image}
              alt={product.name}
              className={`main-image${isZoomed ? ' zoomed' : ''}`}
            />
            <button className="image-arrow right" onClick={handleNextImage} aria-label="Next image">
              &#8250;
            </button>
            <span className="zoom-icon" aria-label="Zoom">&#128269;</span>
          </div>
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">
            CFA {new Intl.NumberFormat('en-US').format(product.price)}
          </p>
          <p>
            <strong>Category:</strong> {product.category?.name}
          </p>
          <p>
            <strong>Type:</strong> {product.product_type?.name}
          </p>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart()}
            disabled={addToCartLoading}
          >
            {addToCartLoading ? 'Adding...' : 'Add to Cart'}
          </button>
          {/* Product specifications directly below the button */}
          <div className="product-specifications">
            <h3>Specifications</h3>
            {product.specifications && product.specifications.length > 0 ? (
              <ul>
                {product.specifications.map((spec) => (
                  <li key={spec.id}>
                    <strong>{spec.name}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No specifications available.</p>
            )}
          </div>
        </div>
      </div>
      {/* Tabs and content remain below, but no "Specifications" tab */}
      <div className="product-tabs">
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
    </div>
  );
};

export default ProductPage;
