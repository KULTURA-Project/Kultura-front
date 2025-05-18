import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check token on initial render
    const location = useLocation();
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categories/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Watch for token changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update login state based on token presence
    }, [location]); // Re-run when location changes (e.g., after login)

    // Slider controls
    const slideLeft = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft -= 200;
    };

    const slideRight = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft += 200;
    };

    // Toggle dropdowns
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen, console.log('User dropdown toggled'));
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/customers/logout/', {}, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            localStorage.removeItem('token');
            setIsLoggedIn(false); // Update state to trigger re-render
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="header">
            {/* Logo */}
            <div className="logo-section">
                <Link to='/'>
                    <img src="/assets/imgs/logo_kultura_long_sansbg.png" alt="Kultura Logo" className="logo-img" />
                </Link>
            </div>

            {/* Bouton hamburger mobile */}
            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Ouvrir le menu"
            >
                <FaBars size={24} />
            </button>

            {/* Search Bar (desktop uniquement) */}
            <div className="search-bar">
                <input type="text" placeholder="Rechercher un article, une catégorie..." />
                <button>
                    <FaSearch size={16} />
                </button>
            </div>

            {/* Navigation desktop */}
            <nav className="nav-links">
                <Link to="/" className='nav-link'>Accueil</Link>
                <Link to="/articles" className='nav-link'>Nos Articles</Link>
                <Link to="/categories" className='nav-link'>Catégories</Link>
                <Link to="/about" className='nav-link'>À propos</Link>
                <Link to="/contact" className='nav-link'>Contact</Link>
            </nav>

            {/* Icônes */}
            <div className="icon-buttons">
                {isLoggedIn ? (
                    <div className="user-icon-wrapper" onClick={toggleUserDropdown}>
                        <IconCircle icon={<FaUser size={16} />} />
                        <AnimatePresence>
                            {isUserDropdownOpen && (
                                <motion.div
                                    className="user-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Link to="/profile">Profil</Link>
                                    <Link to="/orders">Commandes</Link>
                                    <Link to="/" onClick={handleLogout}>Déconnexion</Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className='auth-buttons-wrapper'>
                        <button className='btn btn-primary-outline'>S'inscrire</button>
                        <button className='btn btn-primary'>Se connecter</button>
                    </div>
                )}
                {isLoggedIn && (
                    <>
                        <Link to='/cart'>
                            <IconCircle icon={<FaShoppingCart size={16} />} badge={2} />
                        </Link>
                        <Link to='/wishlist'>
                            <IconCircle icon={<FaHeart size={16} />} badge={5} />
                        </Link>
                    </>
                )}
            </div>

            {/* Menu mobile latéral */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        className="mobile-nav"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", duration: 0.25 }}
                    >
                        <button
                            className="mobile-menu-close"
                            onClick={toggleMobileMenu}
                            aria-label="Fermer le menu"
                        >
                            <FaChevronRight size={24} />
                        </button>
                        <div className="mobile-nav-links">
                            <Link to="/" className='nav-link' onClick={toggleMobileMenu}>Accueil</Link>
                            <Link to="/articles" className='nav-link' onClick={toggleMobileMenu}>Nos Articles</Link>
                            <Link to="/categories" className='nav-link' onClick={toggleMobileMenu}>Catégories</Link>
                            <Link to="/about" className='nav-link' onClick={toggleMobileMenu}>À propos</Link>
                            <Link to="/contact" className='nav-link' onClick={toggleMobileMenu}>Contact</Link>
                        </div>
                        <div className="mobile-nav-icons">
                            {isLoggedIn && (
                                <>
                                    <Link to='/cart' onClick={toggleMobileMenu}>
                                        <IconCircle icon={<FaShoppingCart size={18} />} badge={2} />
                                    </Link>
                                    <Link to='/wishlist' onClick={toggleMobileMenu}>
                                        <IconCircle icon={<FaHeart size={18} />} badge={5} />
                                    </Link>
                                    <Link to="/profile" onClick={toggleMobileMenu}>Profil</Link>
                                    <Link to="/orders" onClick={toggleMobileMenu}>Commandes</Link>
                                    <Link to="/" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Déconnexion</Link>
                                </>
                            )}
                            {!isLoggedIn && (
                                <div className="mobile-auth-buttons">
                                    <button className='btn btn-primary-outline' onClick={toggleMobileMenu}>S'inscrire</button>
                                    <button className='btn btn-primary' onClick={toggleMobileMenu}>Se connecter</button>
                                </div>
                            )}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

function IconCircle({ icon, badge }) {
    return (
        <div className="icon-wrapper">
            <div className="icon-circle">
                {icon}
            </div>
            {badge && <span className="badge">{badge}</span>}
        </div>
    );

};

export default Header;