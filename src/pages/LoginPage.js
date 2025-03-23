import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for breadcrumbs and navigation
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/customers/login/', {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/profile'); // Navigate to profile after login
        } catch (error) {
            console.error(error);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span> &gt; </span>
                <span>Login</span>
            </div>

            <h1 className="login-title">Welcome Back</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="submit-button">Login</button>
            </form>

            {/* Additional Links */}
            <div className="additional-links">
                <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                </Link>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
