import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBell, FaBox, FaHeart, FaMoneyBill, FaShoppingCart, FaSignOutAlt, FaTruck, FaUser } from 'react-icons/fa';
import Breadcrumbs from '../components/Breadcrumbs'; // Import Breadcrumbs
import CartComponent from '../components/CartComponent';
import WishlistComponent from '../components/WishlistComponent';
import './ProfilePage.css';

function ProfilePage() {
    const [profile, setProfile] = useState({});
    const [orders, setOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [shipping, setShipping] = useState([]);
    const [activeSection, setActiveSection] = useState('profile'); // Default section

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login'; // Redirect if no token
                    return;
                }

                // Fetch profile
                const profileResponse = await axios.get('http://127.0.0.1:8000/api/customers/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setProfile(profileResponse.data);

                // Fetch orders
                const ordersResponse = await axios.get('http://127.0.0.1:8000/orders/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setOrders(ordersResponse.data);

                // Fetch notifications
                const notificationsResponse = await axios.get('http://127.0.0.1:8000/notifications/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setNotifications(notificationsResponse.data);

                // Fetch transactions
                const transactionsResponse = await axios.get('http://127.0.0.1:8000/transactions/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setTransactions(transactionsResponse.data);

                // Fetch shipping
                const shippingResponse = await axios.get('http://127.0.0.1:8000/shipping/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setShipping(shippingResponse.data);
            } catch (error) {
                console.error(error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login'; // Redirect on unauthorized
                }
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/customers/logout/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="profile-section">
                        <h2>Profile</h2>
                        <p>Email: {profile.email}</p>
                        <p>First Name: {profile.first_name}</p>
                        <p>Last Name: {profile.last_name}</p>
                    </div>
                );
            case 'cart':
                return <CartComponent />;
            case 'wishlist':
                return <WishlistComponent />;
            case 'orders':
                return (
                    <div className="orders-section">
                        <h2>Orders</h2>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="order-item">
                                    <p>Order ID: {order.id}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Total: ${order.total}</p>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                );
            case 'notifications':
                return (
                    <div className="notifications-section">
                        <h2>Notifications</h2>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className="notification-item">
                                    <p>{notification.message}</p>
                                    <p>{new Date(notification.created_at).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No new notifications.</p>
                        )}
                    </div>
                );
            case 'transactions':
                return (
                    <div className="transactions-section">
                        <h2>Transactions</h2>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <div key={transaction.id} className="transaction-item">
                                    <p>Transaction ID: {transaction.id}</p>
                                    <p>Amount: ${transaction.amount}</p>
                                    <p>Status: {transaction.status}</p>
                                </div>
                            ))
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </div>
                );
            case 'shipping':
                return (
                    <div className="shipping-section">
                        <h2>Shipping</h2>
                        {shipping.length > 0 ? (
                            shipping.map((shipment) => (
                                <div key={shipment.id} className="shipping-item">
                                    <p>Tracking ID: {shipment.tracking_id}</p>
                                    <p>Status: {shipment.status}</p>
                                    <p>Estimated Delivery: {shipment.estimated_delivery}</p>
                                </div>
                            ))
                        ) : (
                            <p>No shipping details found.</p>
                        )}
                    </div>
                );
            default:
                return <div>Select a section to view details.</div>;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li
                        className={activeSection === 'profile' ? 'active' : ''}
                        onClick={() => setActiveSection('profile')}
                    >
                        <FaUser /> Profile
                    </li>
                    <li
                        className={activeSection === 'cart' ? 'active' : ''}
                        onClick={() => setActiveSection('cart')}
                    >
                        <FaShoppingCart /> Cart
                    </li>
                    <li
                        className={activeSection === 'wishlist' ? 'active' : ''}
                        onClick={() => setActiveSection('wishlist')}
                    >
                        <FaHeart /> Wishlist
                    </li>
                    <li
                        className={activeSection === 'orders' ? 'active' : ''}
                        onClick={() => setActiveSection('orders')}
                    >
                        <FaBox /> Orders
                    </li>
                    <li
                        className={activeSection === 'transactions' ? 'active' : ''}
                        onClick={() => setActiveSection('transactions')}
                    >
                        <FaMoneyBill /> Transactions
                    </li>
                    <li
                        className={activeSection === 'shipping' ? 'active' : ''}
                        onClick={() => setActiveSection('shipping')}
                    >
                        <FaTruck /> Shipping
                    </li>
                    <li
                        className={activeSection === 'notifications' ? 'active' : ''}
                        onClick={() => setActiveSection('notifications')}
                    >
                        <FaBell /> Notifications
                    </li>
                </ul>
                {/* Logout Button */}
                <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Content Section */}
            <div className="content-section">
                {/* Breadcrumbs */}
                <Breadcrumbs activeSection={activeSection} />
                {/* Render Content */}
                {renderContent()}
            </div>
        </div>
    );
}

export default ProfilePage;
