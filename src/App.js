import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import ProductPage from './components/ProductPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import Home from './pages/Home';
function App() {
    return (
        <Router>
            <Header />
            <main className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category-products/:category_id" element={<CategoryProductsPage />} />
                    <Route path="/products/:slug" element={<ProductPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
