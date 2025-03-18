import React from 'react';
import './OrdersPage.css'; // Import CSS file

const OrdersPage = () => {
    // Dummy order data (replace with your actual data fetching logic)
    const orders = [
        {
            id: 1,
            date: '2025-03-15',
            total: 75.00,
            status: 'Shipped',
        },
        {
            id: 2,
            date: '2025-03-10',
            total: 120.00,
            status: 'Delivered',
        },
        // Add more orders as needed
    ];

    return (
        <div className="orders-page">
            <h1>My Orders</h1>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-item">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        {/* Add more order details as needed */}
                        <button className="view-order-button">View Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
