// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' ,position:'fixed',width:'100%',marginBottom:20}}>
      <div className="container">
    
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#4a90e2', fontWeight: '700' }}>
          <img
            src="/png-clipart-lung-pulmonary-alveolus-cardiovascular-thumbnail-removebg-preview.png" // Path to the logo in the public/ folder
            alt="Respiratory Care Logo"
            height="50" // Adjust height as needed
            width="50"
            style={{ marginLeft: '10px', marginRight: '30px' }}
          />
           <span className="h3 ml-3 mt-2 ">Respiratory Care</span> {/* Bootstrap class for larger font */}
        </Link>
      
      </div>
      <div className="container">
      <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/record-upload">Record/Upload</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/results">Results</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/progress">Progress</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto right-nav-links">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={{ color: '#4a90e2'}}>
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;