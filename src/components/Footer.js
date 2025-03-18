import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Customer Service Section */}
                    <div className="col-md-3">
                        <h5>Customer Service</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/track-order" className="text-light">Track My Order</Link></li>
                            <li><Link to="/collections" className="text-light">Collections</Link></li>
                            <li><Link to="/wholesale" className="text-light">Wholesale</Link></li>
                            <li><Link to="/buyer-faqs" className="text-light">Buyer FAQs</Link></li>
                            <li><Link to="/handmade-disclaimer" className="text-light">Handmade Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Sell on Mawu Section */}
                    <div className="col-md-3">
                        <h5>Sell on Mawu</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/sell" className="text-light">Sell on Mawu</Link></li>
                            <li><Link to="/seller-login" className="text-light">Seller Login</Link></li>
                            <li><Link to="/seller-faq" className="text-light">Seller FAQ</Link></li>
                            <li><Link to="/seller-policies" className="text-light">Seller Policies</Link></li>
                        </ul>
                    </div>

                    {/* Policies Section */}
                    <div className="col-md-3">
                        <h5>Policies</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/terms" className="text-light">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-light">Privacy & Sharing</Link></li>
                            <li><Link to="/return-policy" className="text-light">Return & Refund Policy</Link></li>
                            <li><Link to="/shipping" className="text-light">Shipping & Delivery</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info & Newsletter */}
                    <div className="col-md-3">
                        <h5>Contact</h5>
                        <p>📞 +254 790 867 733</p>
                        <p>📧 <a href="mailto:sales@mawuafrica.com" className="text-light">sales@mawuafrica.com</a></p>
                        <h5>Subscribe</h5>
                        <input type="email" className="form-control mb-2" placeholder="Enter your email" />
                        <button className="btn btn-warning btn-sm">Subscribe</button>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="text-center mt-3">
                    <FontAwesomeIcon icon={faFacebook} className="mx-2" />
                    <FontAwesomeIcon icon={faInstagram} className="mx-2" />
                    <FontAwesomeIcon icon={faTwitter} className="mx-2" />
                    <FontAwesomeIcon icon={faLinkedin} className="mx-2" />
                </div>

                <div className="text-center mt-3">
                    <small>© 2025 Symbiose Yaar</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
