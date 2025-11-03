import React, { useState } from 'react';
import NextLogo from './NextLogo';
import EnhancedSidebar from './EnhancedSidebar';
import ChatBubble from './ChatBubble';
import ChatToggle from './ChatToggle';
import UserSelector from './UserSelector';
import './Layout.css';

const Layout = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <EnhancedSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="layout-content">
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button className="burger-menu-btn" onClick={toggleSidebar}>
                <div className={`burger-icon ${sidebarOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
            
            <div className="logo">
              <div className="logo-container">
                {/* NextLogo component - automatically uses /next-logo.png if available, otherwise shows elegant fallback */}
                <NextLogo className="logo-image" />
              </div>
              <span className="tagline">Brand Insights</span>
            </div>

            <div className="header-actions">
              <UserSelector />
            </div>
          </div>
        </header>
        
        <main className="main-content">
          {children}
        </main>
      </div>
      
      {/* Chat Components */}
      <ChatToggle isOpen={chatOpen} onClick={toggleChat} />
      <ChatBubble isOpen={chatOpen} onClose={closeChat} />
    </div>
  );
};

export default Layout;
