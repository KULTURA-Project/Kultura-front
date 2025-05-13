import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Card logos URLs (replace if you want)
const cardLogos = [
  { alt: 'Visa', src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
  { alt: 'MasterCard', src: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' },
  { alt: 'American Express', src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg' },
  { alt: 'CinetPay', src: 'https://cinetpay.com/assets/img/logo-cinetpay.svg' },
];

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'Burkina Faso',
    phone: '',
  });
  const [card, setCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/cart/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        });
        setCartItems(response.data);
      } catch {
        setError('Failed to fetch cart items');
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = Number(item.product?.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  };

  // Basic validation example (expand as needed)
  const validateShipping = () => {
    for (const [key, value] of Object.entries(shipping)) {
      if (!value.trim()) {
        setError(`Please fill in your ${key.replace(/([A-Z])/g, ' $1')}`);
        return false;
      }
    }
    return true;
  };

  const validateCard = () => {
    const { cardNumber, cardHolder, expiryMonth, expiryYear, cvv } = card;
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number must be 16 digits');
      return false;
    }
    if (!cardHolder.trim()) {
      setError('Card holder name is required');
      return false;
    }
    if (!/^\d{2}$/.test(expiryMonth) || Number(expiryMonth) < 1 || Number(expiryMonth) > 12) {
      setError('Expiry month must be between 01 and 12');
      return false;
    }
    if (!/^\d{2}$/.test(expiryYear)) {
      setError('Expiry year must be two digits');
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV must be 3 or 4 digits');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    setError('');
    if (!validateShipping()) return;
    if (!validateCard()) return;

    setLoading(true);
    try {
      // 1. Create order with shipping info
      const orderResponse = await axios.post(
        'http://127.0.0.1:8000/orders/create_order/',
        { shipping_address: shipping, total_price: calculateTotal() },
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
      );

      const orderId = orderResponse.data.id;

      // 2. Initiate payment with card info and order id (replace with your payment API)
      const paymentResponse = await axios.post(
        'http://127.0.0.1:8000/payments/cinetpay/',
        {
          order_id: orderId,
          card_info: card,
          amount: calculateTotal(),
        },
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
      );

      if (paymentResponse.data.success) {
        alert('Payment successful! Order placed.');
        navigate('/orders');
      } else {
        setError('Payment failed: ' + paymentResponse.data.message);
      }
    } catch (err) {
      setError('An error occurred while placing your order.');
      console.error(err);
    }
    setLoading(false);
  };

  const styles = {
    container: {
      maxWidth: 1000,
      margin: '40px auto',
      padding: 30,
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      color: '#333',
      display: 'flex',
      gap: 40,
      flexWrap: 'wrap',
    },
    leftColumn: {
      flex: '1 1 400px',
      minWidth: 300,
    },
    rightColumn: {
      flex: '1 1 400px',
      minWidth: 300,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 15,
      borderBottom: '2px solid #3498db',
      paddingBottom: 8,
      color: '#2980b9',
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: 6,
      fontSize: 16,
      color: '#34495e',
    },
    input: {
      width: '100%',
      padding: 10,
      fontSize: 15,
      borderRadius: 6,
      border: '1px solid #ccc',
      outline: 'none',
      boxSizing: 'border-box',
    },
    orderList: {
      listStyleType: 'none',
      paddingLeft: 0,
      marginBottom: 20,
    },
    orderListItem: {
      padding: '8px 0',
      borderBottom: '1px solid #eee',
      fontSize: 16,
    },
    totalPrice: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 25,
      textAlign: 'right',
      color: '#34495e',
    },
    cardLogosContainer: {
      display: 'flex',
      gap: 15,
      marginBottom: 20,
      alignItems: 'center',
    },
    cardLogo: {
      height: 30,
      objectFit: 'contain',
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#842029',
      padding: 12,
      borderRadius: 6,
      marginBottom: 20,
      fontWeight: 600,
      border: '1px solid #f5c2c7',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: 14,
      fontSize: 18,
      fontWeight: '700',
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      {/* Shipping on the Left */}
      <div style={styles.leftColumn}>
        <h3 style={styles.sectionTitle}>Shipping Information</h3>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.fullName}
            onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Address Line 1</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.addressLine1}
            onChange={e => setShipping({ ...shipping, addressLine1: e.target.value })}
            placeholder="123 Main St"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Address Line 2</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.addressLine2}
            onChange={e => setShipping({ ...shipping, addressLine2: e.target.value })}
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
            placeholder="Ouagadougou"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Postal Code</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.postalCode}
            onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
            placeholder="00000"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Country</label>
          <input
            type="text"
            style={styles.input}
            value={shipping.country}
            onChange={e => setShipping({ ...shipping, country: e.target.value })}
            placeholder="Burkina Faso"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            style={styles.input}
            value={shipping.phone}
            onChange={e => setShipping({ ...shipping, phone: e.target.value })}
            placeholder="+226 70 00 00 00"
          />
        </div>
      </div>

      {/* Product Summary and Payment on the Right */}
      <div style={styles.rightColumn}>
        <h3 style={styles.sectionTitle}>Order Summary</h3>
        <ul style={styles.orderList}>
          {cartItems.map(item => (
            <li key={item.id} style={styles.orderListItem}>
              {item.product.name} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div style={styles.totalPrice}>Total: ${calculateTotal().toFixed(2)}</div>

        <h3 style={styles.sectionTitle}>Payment Information</h3>

        {/* Card Logos */}
        <div style={styles.cardLogosContainer}>
          {cardLogos.map(({ alt, src }) => (
            <img key={alt} src={src} alt={alt} style={styles.cardLogo} />
          ))}
        </div>

        {/* Payment Card Inputs */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Number</label>
          <input
            type="text"
            maxLength="16"
            style={styles.input}
            value={card.cardNumber}
            onChange={e => setCard({ ...card, cardNumber: e.target.value.replace(/\D/g, '') })}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Holder Name</label>
          <input
            type="text"
            style={styles.input}
            value={card.cardHolder}
            onChange={e => setCard({ ...card, cardHolder: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: 15 }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Expiry Month (MM)</label>
            <input
              type="text"
              maxLength="2"
              style={styles.input}
              value={card.expiryMonth}
              onChange={e => setCard({ ...card, expiryMonth: e.target.value.replace(/\D/g, '') })}
              placeholder="MM"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Expiry Year (YY)</label>
            <input
              type="text"
              maxLength="2"
              style={styles.input}
              value={card.expiryYear}
              onChange={e => setCard({ ...card, expiryYear: e.target.value.replace(/\D/g, '') })}
              placeholder="YY"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>CVV</label>
            <input
              type="password"
              maxLength="4"
              style={styles.input}
              value={card.cvv}
              onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })}
              placeholder="123"
            />
          </div>
        </div>

        <button style={styles.button} onClick={handlePlaceOrder} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
