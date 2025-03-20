import axios from 'axios';
import React, { useState } from 'react';
import './RegisterPage.css'; // Import CSS file

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/customers/register/', {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
            });
            console.log(response.data);
            // Redirect to login page after successful registration
            window.location.href = '/login';
        } catch (error) {
            console.error(error.response.data);
            setError('Registration failed. Please check your details.');
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="register-form">
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
                    <label className="form-label" htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
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

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
