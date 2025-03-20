import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./WishlistPage.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/wishlist/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setWishlistItems(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch wishlist items');
      }
    };
    fetchWishlistItems();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://127.0.0.1:8000/orders/cart/add/', {
        product_id: productId,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.post('http://127.0.0.1:8000/orders/wishlist/remove/', {
        product_id: productId,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wishlist-page">
      <h2>Wishlist</h2>
      {error && <div className="error-message">{error}</div>}
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/products/${item.slug}`}>
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].image}
                        alt={item.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="no-image">No Image Available</div>
                    )}
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(item.id)}
                    disabled={addedToCart[item.id]}
                  >
                    {addedToCart[item.id] ? (
                      <i className="fa fa-check" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    )}
                  </button>
                  <button
                    className="remove-from-wishlist-button"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WishlistPage;
