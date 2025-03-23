import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductDetail from "./components/ProductDetail";
import ProductPage from "./components/ProductPage";
import AboutUsPage from "./pages/AboutUsPage";
import CartPage from "./pages/CartPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from "./pages/OrdersPage";
import { default as Logout, default as ProfilePage } from "./pages/ProfilePage";
import RegisterPage from './pages/RegisterPage';
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="container flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/category-products/:category_id" element={<CategoryProductsPage />} />
                        <Route path="/products/:slug" element={<ProductPage />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
