import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/customers/profile/', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2>Customer Profile</h2>
            <p>Phone Number: {profile.phone_number}</p>
            <p>Address: {profile.address}</p>
            {/* Add more profile details here */}
        </div>
    );
};

export default ProfilePage;
