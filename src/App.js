import React from 'react';
import './App.css';
import Homescreen from './homescreen/homescreen.js';
import { ThemeProvider } from './context/ThemeContext.js';
// import SocialMediaPostGenerator from './components/SocialMediaPostGenerator';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Homescreen />
        {/* <SocialMediaPostGenerator /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
