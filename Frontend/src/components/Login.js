// src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/home/login', {
        
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful! Redirecting...');
      setMessageType('success');
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data?.error || error.message));
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h5 className="text-center mb-4">Welcome Back</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && (
          <div className={`auth-message ${messageType}`}>
            {message}
          </div>
        )}
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;