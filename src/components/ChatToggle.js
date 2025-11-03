import React from 'react';
import './ChatToggle.css';

const ChatToggle = ({ isOpen, onClick, hasUnreadMessages = false }) => {
  return (
    <button 
      className={`chat-toggle ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className="chat-toggle-content">
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <>
            <span className="chat-icon">💬</span>
            {hasUnreadMessages && <div className="notification-dot" />}
          </>
        )}
      </div>
      
      {!isOpen && (
        <div className="chat-tooltip">
          <span>Ask me about your data</span>
          <div className="tooltip-arrow" />
        </div>
      )}
    </button>
  );
};

export default ChatToggle;





