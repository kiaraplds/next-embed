import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NextLogo from './NextLogo';
import ChatBubble from './ChatBubble';
import ChatToggle from './ChatToggle';
import { useUser } from '../context/UserContext';
import './Layout.css';

const Layout = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { hasAccess } = useUser();
  const location = useLocation();

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if user has access to AI chat features
  const hasAIAccess = hasAccess('spotter');

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button 
              className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
          
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <NextLogo className="logo-image" />
            </div>
          </Link>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/spotter" 
              className={`nav-link ${isActive('/spotter') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Enlighter
            </Link>
            <Link 
              to="/reports" 
              className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Reports
            </Link>
          </nav>

          <div className="header-right">
            {/* User selector removed for cleaner look */}
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">© {new Date().getFullYear()} Analytics Platform. Excellence in Intelligence.</p>
        </div>
      </footer>
      
      {/* Chat Components - Only show for users with AI access */}
      {hasAIAccess && (
        <>
          <ChatToggle isOpen={chatOpen} onClick={toggleChat} />
          <ChatBubble isOpen={chatOpen} onClose={closeChat} />
        </>
      )}

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </div>
  );
};

export default Layout;
