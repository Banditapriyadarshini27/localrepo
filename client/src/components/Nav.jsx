import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-logo">
          <svg className="header-logo-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="var(--indigo)" stroke-width="2" fill="none"/>
            <text x="12" y="15.5" font-family="sans-serif" font-size="9" font-weight="700" fill="var(--indigo)" text-anchor="middle">BP</text>
          </svg>
          <span>bandita.dev</span>
        </div>
        <div className="navlinks-wrapper">
          <div className="navlinks">
            <a href="#about">about</a>
            <a href="#skills">skills</a>
            <a href="#projects">projects</a>
            <a href="#experience">experience</a>
            <a href="#education">education</a>
            <a href="#contact">contact</a>
          </div>
          <button 
            id="themeToggle" 
            className="theme-toggle-btn" 
            aria-label="Toggle visual theme" 
            onClick={toggleTheme}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
            tabIndex={0}
          >
            {/* Sun icon (shown in Dark mode) */}
            <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
            {/* Moon icon (shown in Light mode) */}
            <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
