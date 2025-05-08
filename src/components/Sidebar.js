import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext.js';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [openSection, setOpenSection] = useState(null);

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{ 
          backgroundColor: theme.background,
          color: theme.text,
          borderRight: `1px solid ${theme.border}`
        }}
      >
        {/* Close Button */}
        <button 
          className="close-button"
          onClick={onClose}
          style={{ color: theme.text }}
        >
          ×
        </button>

        {/* Logo and Brand */}
        <div className="sidebar-brand">
          <div className="logo">
            <span style={{ color: '#FF69B4' }}>S</span>
          </div>
          <h1 className="brand-name">Sociofy</h1>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <button 
            className="nav-button return-home"
            onClick={handleReturnHome}
            style={{ 
              backgroundColor: theme.primary,
              color: theme.name === 'dark' ? '#000' : '#fff'
            }}
          >
            Return to Home
          </button>

          <div className="nav-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('main')}
              style={{ color: theme.text }}
            >
              <h3>Main Menu</h3>
              <span className={`arrow ${openSection === 'main' ? 'open' : ''}`}>▼</span>
            </button>
            <ul className={`section-content ${openSection === 'main' ? 'open' : ''}`}>
              <li>
                <a href="#dashboard" style={{ color: theme.text }}>Dashboard</a>
              </li>
              <li>
                <a href="#analytics" style={{ color: theme.text }}>Analytics</a>
              </li>
              <li>
                <a href="#content" style={{ color: theme.text }}>Content</a>
              </li>
              <li>
                <a href="#schedule" style={{ color: theme.text }}>Schedule</a>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('saved')}
              style={{ color: theme.text }}
            >
              <h3>Saved Posts</h3>
              <span className={`arrow ${openSection === 'saved' ? 'open' : ''}`}>▼</span>
            </button>
            <ul className={`section-content ${openSection === 'saved' ? 'open' : ''}`}>
              <li>
                <a href="#saved-posts" style={{ color: theme.text }}>View All Saved</a>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('tools')}
              style={{ color: theme.text }}
            >
              <h3>Tools</h3>
              <span className={`arrow ${openSection === 'tools' ? 'open' : ''}`}>▼</span>
            </button>
            <ul className={`section-content ${openSection === 'tools' ? 'open' : ''}`}>
              <li>
                <a href="#ai-generator" style={{ color: theme.text }}>AI Generator</a>
              </li>
              <li>
                <a href="#media-library" style={{ color: theme.text }}>Media Library</a>
              </li>
              <li>
                <a href="#calendar" style={{ color: theme.text }}>Calendar</a>
              </li>
            </ul>
          </div>

          <div className="nav-section bottom-section">
            <button 
              className="nav-button help"
              onClick={() => window.location.href = '#help'}
              style={{ color: theme.text }}
            >
              ❓ Help
            </button>
            <button 
              className="nav-button settings"
              onClick={() => window.location.href = '#settings'}
              style={{ color: theme.text }}
            >
              ⚙️ Settings
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 