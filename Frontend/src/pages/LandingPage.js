// src/pages/LandingPage.js
import { Link } from 'react-router-dom';
import { FaMicrophone, FaSearch, FaHeartbeat, FaStethoscope } from 'react-icons/fa';
// import heroImage from '../../public/hero-bg.jpg'; // Import the image

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Respiratory Care</h1>
          <p>
            Monitor and manage your respiratory health with ease. Our app uses advanced sound analysis to detect and assess conditions like Asthma, COPD, and other respiratory issues from the comfort of your home.
          </p>
          <Link to="/Signup" className="btn btn-primary">Get Started</Link>
        </div>
      </section>

      {/* User Options Section */}
      <section className="options-section"style={{marginTop:'70px'}}>
        <div className="container">
          <h2>Take Control of Your Respiratory Health</h2>
          <p>Our app provides simple tools to help you monitor, assess, and manage your lung health effectively.</p>
          <div className="options-grid">
            <div className="option-card">
              <div className="option-icon"><FaMicrophone /></div>
              <h5>Record</h5>
              <p>Record your cough or breathing sounds using your device to analyze respiratory health.</p>
            </div>
            <div className="option-card">
              <div className="option-icon"><FaSearch /></div>
              <h5>Scan</h5>
              <p>Upload your audio for a detailed analysis of your respiratory condition.</p>
            </div>
            <div className="option-card">
              <div className="option-icon"><FaHeartbeat /></div>
              <h5>Monitor</h5>
              <p>Track your respiratory health over time with regular scans and progress trends.</p>
            </div>
            <div className="option-card">
              <div className="option-icon"><FaStethoscope /></div>
              <h5>Consult</h5>
              <p>Share your detailed reports with your doctor for professional advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="footer"
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '3rem 0',
          textAlign: 'center',
          width: '100%', // Ensures it spans the full width
          position: 'relative',
          bottom: '0',
          left: '0'
        }}
      >
        <div className="footer-content">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <p>© 2025 Respiratory Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;