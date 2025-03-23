import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
    const { orderId } = useParams(); // Get order ID from URL params
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/orders/orders/${orderId}/`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setOrderDetails(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch order details.');
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    return (
        <div className="order-confirmation-page">
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span> &gt; </span>
                <span>Order Confirmation</span>
            </div>

            <h2>Order Confirmation</h2>
            {error && <div className="error-message">{error}</div>}
            {orderDetails ? (
                <div className="order-details">
                    <p>Thank you for your order!</p>
                    <p>Order ID: {orderDetails.id}</p>
                    <p>Total Price: ${orderDetails.total_price}</p>
                    <p>Status: {orderDetails.status}</p>
                    <h3>Items:</h3>
                    <ul>
                        {orderDetails.items.map((item) => (
                            <li key={item.id}>
                                {item.quantity} x {item.product.name} (${item.price})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderConfirmationPage;
