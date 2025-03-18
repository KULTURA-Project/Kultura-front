import React from 'react';
import './ProfilePage.css'; // Import CSS file

const ProfilePage = () => {
    // Dummy user data (replace with your actual data fetching logic)
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Anytown, USA',
        phone: '555-123-4567',
    };

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            <div className="profile-details">
                <div className="profile-section">
                    <h2>Account Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="profile-section">
                    <h2>Contact Information</h2>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </div>
                {/* Add more profile sections as needed */}
                <button className="edit-profile-button">Edit Profile</button>
            </div>
        </div>
    );
};

export default ProfilePage;
