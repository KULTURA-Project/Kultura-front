// src/api/products.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';  // Replace with your API URL
// src/api/products.js

// Function to fetch all products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
