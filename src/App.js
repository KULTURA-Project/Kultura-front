import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Header />
            <main className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/category/:categoryName/:subCategoryName" element={<CategoryPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
