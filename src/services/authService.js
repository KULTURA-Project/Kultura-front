import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/customers/auth/";

// Register User
export const register = async (userData) => {
  return axios.post(`${API_URL}users/`, userData);
};

export const login = async (formData) => {
    const response = await axios.post("http://127.0.0.1:8000/api/customers/auth/token/login/", formData);
    return response.data; // Assuming the response contains user data
  };

// Logout User
export const logout = () => {
  return axios.post(`${API_URL}token/logout/`, {}, {
    headers: { Authorization: `Token ${localStorage.getItem("token")}` }
  }).then(() => {
    localStorage.removeItem("token");
  });
};

// Get Current User Profile
export const getProfile = async () => {
  return axios.get(`${API_URL}users/me/`, {
    headers: { Authorization: `Token ${localStorage.getItem("token")}` }
  });
};
