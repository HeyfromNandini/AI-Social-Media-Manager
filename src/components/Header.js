import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext.js';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header" style={{ backgroundColor: theme.background }}>
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="header-brand">
          <div className="logo">
            <span style={{ color: '#fff' }}>S</span>
          </div>
          <h1 className="brand-name">Sociofy</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>

        {/* Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          style={{ color: theme.text }}
        >
          {theme.name === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: theme.text }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`} style={{ backgroundColor: theme.background }}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button 
              className="theme-toggle mobile-theme-toggle"
              onClick={toggleTheme}
              style={{ color: theme.text }}
            >
              {theme.name === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <button className="login-button">Login</button>
          </li>
          <li>
            <button className="signup-button">Sign Up</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 