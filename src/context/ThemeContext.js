import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'dark',
    background: '#000000',
    text: '#ffffff',
    primary: '#ff69b4', // Pink
    secondary: '#1a1a1a',
    accent: '#ff1493', // Deep pink
    cardBg: '#1a1a1a',
    gradient: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
  },
  light: {
    name: 'light',
    background: '#ffffff',
    text: '#000000',
    primary: '#4f46e5', // Indigo
    secondary: '#f8fafc',
    accent: '#6366f1',
    cardBg: '#ffffff',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme.name === 'dark' ? themes.light : themes.dark
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 