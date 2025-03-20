import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProfilePage() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login'; // Redirect if no token
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/customers/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error(error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login'; // Redirect on unauthorized
                }
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {profile.email}</p>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
        </div>
    );
}

export default ProfilePage;



// Remove this if it's not being used
function Logout() {
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

  return <button onClick={handleLogout}>Logout</button>;
}
