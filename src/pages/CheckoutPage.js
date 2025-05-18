import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

// Card logos URLs
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
      const orderResponse = await axios.post(
        'http://127.0.0.1:8000/orders/create_order/',
        { shipping_address: shipping, total_price: calculateTotal() },
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
      );
      const orderId = orderResponse.data.id;

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

  return (
    <div className="checkout-container">
      {/* Shipping on the Left */}
      <div className="checkout-left">
        <h3 className="checkout-section-title">Shipping Information</h3>
        {error && <div className="checkout-error-message">{error}</div>}
        <div className="checkout-input-group">
          <label className="checkout-label">Full Name</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.fullName}
            onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Address Line 1</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.addressLine1}
            onChange={e => setShipping({ ...shipping, addressLine1: e.target.value })}
            placeholder="123 Main St"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Address Line 2</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.addressLine2}
            onChange={e => setShipping({ ...shipping, addressLine2: e.target.value })}
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">City</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
            placeholder="Ouagadougou"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Postal Code</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.postalCode}
            onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
            placeholder="00000"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Country</label>
          <input
            type="text"
            className="checkout-input"
            value={shipping.country}
            onChange={e => setShipping({ ...shipping, country: e.target.value })}
            placeholder="Burkina Faso"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Phone Number</label>
          <input
            type="tel"
            className="checkout-input"
            value={shipping.phone}
            onChange={e => setShipping({ ...shipping, phone: e.target.value })}
            placeholder="+226 70 00 00 00"
          />
        </div>
      </div>

      {/* Product Summary and Payment on the Right */}
      <div className="checkout-right">
        <h3 className="checkout-section-title">Order Summary</h3>
        <ul className="checkout-order-list">
          {cartItems.map(item => (
            <li key={item.id} className="checkout-order-list-item">
              {item.product.name} x {item.quantity} = CFA{(item.product.price * item.quantity).toLocaleString()}
            </li>
          ))}
        </ul>
        <div className="checkout-total-price">Total: CFA{calculateTotal().toLocaleString()}</div>

        <h3 className="checkout-section-title">Payment Information</h3>

        {/* Card Logos */}
        <div className="checkout-card-logos">
          {cardLogos.map(({ alt, src }) => (
            <img key={alt} src={src} alt={alt} className="checkout-card-logo" />
          ))}
        </div>

        {/* Payment Card Inputs */}
        <div className="checkout-input-group">
          <label className="checkout-label">Card Number</label>
          <input
            type="text"
            maxLength="16"
            className="checkout-input"
            value={card.cardNumber}
            onChange={e => setCard({ ...card, cardNumber: e.target.value.replace(/\D/g, '') })}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="checkout-input-group">
          <label className="checkout-label">Card Holder Name</label>
          <input
            type="text"
            className="checkout-input"
            value={card.cardHolder}
            onChange={e => setCard({ ...card, cardHolder: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: 15 }}>
          <div style={{ flex: 1 }}>
            <label className="checkout-label">Expiry Month (MM)</label>
            <input
              type="text"
              maxLength="2"
              className="checkout-input"
              value={card.expiryMonth}
              onChange={e => setCard({ ...card, expiryMonth: e.target.value.replace(/\D/g, '') })}
              placeholder="MM"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="checkout-label">Expiry Year (YY)</label>
            <input
              type="text"
              maxLength="2"
              className="checkout-input"
              value={card.expiryYear}
              onChange={e => setCard({ ...card, expiryYear: e.target.value.replace(/\D/g, '') })}
              placeholder="YY"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="checkout-label">CVV</label>
            <input
              type="password"
              maxLength="4"
              className="checkout-input"
              value={card.cvv}
              onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })}
              placeholder="123"
            />
          </div>
        </div>

        <button className="checkout-btn" onClick={handlePlaceOrder} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
