import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the token from local storage or a cookie
        localStorage.removeItem('token');
        console.log('Logout successful');
        navigate('/login'); // Redirect to login page after logout
    }, [navigate]);

    return (
        <div>
            <h2>Logging Out...</h2>
        </div>
    );
};

export default LogoutPage;
