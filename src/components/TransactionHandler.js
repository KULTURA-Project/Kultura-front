import axios from 'axios';
import React from 'react';

const TransactionHandler = ({ orderId, amount }) => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/transaction/', {
                order_id: orderId,
                transaction_id: `txn_${Date.now()}`, // Generate a unique transaction ID
                payment_method: 'card',
                amount,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            alert('Payment successful!');
        } catch (error) {
            console.error(error);
            alert('Payment failed.');
        }
    };

    return (
        <button onClick={handlePayment}>Make Payment</button>
    );
};

export default TransactionHandler;
