import axios from 'axios';
import React, { useState } from 'react';

const CouponSection = ({ onApply }) => {
    const [couponCode, setCouponCode] = useState('');
    const [error, setError] = useState(null);

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            setError('Please enter a coupon code.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/apply-coupon/', {
                code: couponCode,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            onApply(response.data.discount); // Pass discount back to parent
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Invalid or expired coupon code.');
        }
    };

    return (
        <div className="coupon-section">
            <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default CouponSection;
