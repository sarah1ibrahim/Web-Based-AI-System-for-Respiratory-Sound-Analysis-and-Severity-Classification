// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <Link to={localStorage.getItem('token') ? '/dashboard' : '/'}>
        {localStorage.getItem('token') ? 'Dashboard' : 'Home'}
      </Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact Us</Link>
      <p>© 2025 Respiratory Care. All rights reserved.</p>
    </footer>
  );
}

export default Footer;