import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Layout from './components/Layout';
import ProductList from './components/ProductList'; // Import ProductList
import Home from './pages/Home';
function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Home />} /> {/* Dashboard route */}
                    <Route path="/products" element={<ProductList />} /> {/* Products route */}
                
                    {/* Add more routes for other pages */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
