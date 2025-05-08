import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Login.css';

const Login = ({ onLogin }) => {
  const { theme } = useTheme();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate a successful login
    onLogin();
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container" style={{ backgroundColor: theme.background }}>
      <div className="login-card" style={{ backgroundColor: theme.cardBg }}>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              style={{ 
                backgroundColor: theme.background,
                color: theme.text,
                border: `1px solid ${theme.border}`
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{ 
                backgroundColor: theme.background,
                color: theme.text,
                border: `1px solid ${theme.border}`
              }}
            />
          </div>
          <button 
            type="submit"
            className="login-button"
            style={{ 
              backgroundColor: theme.primary,
              color: theme.name === 'dark' ? '#000' : '#fff'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 