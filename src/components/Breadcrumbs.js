import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ activeSection }) => {
    const breadcrumbMap = {
        profile: [{ label: 'Profile', path: '/dashboard/profile' }],
        cart: [{ label: 'Cart', path: '/dashboard/cart' }],
        wishlist: [{ label: 'Wishlist', path: '/dashboard/wishlist' }],
        orders: [{ label: 'Orders', path: '/dashboard/orders' }],
        transactions: [{ label: 'Transactions', path: '/dashboard/transactions' }],
        shipping: [{ label: 'Shipping', path: '/dashboard/shipping' }],
        notifications: [{ label: 'Notifications', path: '/dashboard/notifications' }],
    };

    const breadcrumbs = breadcrumbMap[activeSection] || [];

    return (
        <div className="breadcrumbs">
            <Link to="/profile" className="breadcrumb-home">
                Dashboard
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.path}>
                    <span className="separator">/</span>
                    <Link
                        to={breadcrumb.path}
                        className={index === breadcrumbs.length - 1 ? 'active' : ''}
                    >
                        {breadcrumb.label}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
