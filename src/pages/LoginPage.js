import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookie
            const response = await axios.post(
                'http://127.0.0.1:8000/api/customers/login/',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure Content-Type is set
                        'X-CSRFToken': csrfToken, // Include CSRF token in headers
                    },
                }
            );
            // Store the token in local storage
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            // Handle login errors (e.g., display error messages)
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
