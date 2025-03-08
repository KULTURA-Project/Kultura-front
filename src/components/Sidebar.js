// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css'; // Import the CSS file

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Admin Panel</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/categories">Categories</Link>
                    </li>
                    {/* Add more navigation links here */}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
