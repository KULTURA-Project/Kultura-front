import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import ProductPage from './components/ProductPage';
import AboutUsPage from './pages/AboutUsPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ContactPage from './pages/ContactPage';
import Home from './pages/Home';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
function App() {
    return (
        <Router>
            <Header />
            <main className="container  ">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<ShopPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/account" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
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
