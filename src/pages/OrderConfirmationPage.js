// OrderConfirmationPage.js

import { Link } from 'react-router-dom';
const OrderConfirmationPage = () => {
  return (
    <div className="order-confirmation-page">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your order has been successfully placed.</p>
      <p>An email with order details will be sent to your registered email address.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default OrderConfirmationPage;
