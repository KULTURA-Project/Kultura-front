import React from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span> &gt; </span>
                <span>Contact Us</span>
            </div>

            <h1>Contact Us</h1>
            <section className="contact-intro">
                <p>
                    Have questions, feedback, or need assistance? We'd love to hear from you! Our team is here to help and will get back to you as soon as possible.
                </p>
            </section>

            {/* Contact Form */}
            <section className="contact-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" placeholder="Enter the subject" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="5" placeholder="Write your message here" required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </section>

            {/* Contact Information */}
            <section className="contact-info">
                <h2>Our Contact Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <h3>Address</h3>
                        <p>123 Kultura Street, Artisan City, AC 12345</p>
                    </div>
                    <div className="info-item">
                        <h3>Phone</h3>
                        <p>+1 (123) 456-7890</p>
                    </div>
                    <div className="info-item">
                        <h3>Email</h3>
                        <p>support@kultura.com</p>
                    </div>
                    <div className="info-item">
                        <h3>Business Hours</h3>
                        <p>Monday - Friday: 9 AM - 6 PM</p>
                        <p>Saturday: 10 AM - 4 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
                <h2>Visit Us</h2>
                <p>Feel free to drop by our office during business hours or send us a message anytime.</p>
                <Link to="/about" className="cta-button">Learn More About Us</Link>
            </section>
        </div>
    );
};

export default ContactPage;
