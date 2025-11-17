import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './UserSelector.css';

const UserSelector = () => {
  const { currentUser, switchUser, allUsers } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSwitch = (userId) => {
    switchUser(userId);
    setIsOpen(false);
  };

  return (
    <div className="user-selector">
      <button 
        className="user-selector-button" 
        onClick={toggleDropdown}
        title="Switch User"
      >
        <div className="user-avatar" style={{ borderColor: currentUser.tier.color }}>
          <span>{currentUser.avatar}</span>
        </div>
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
          <span className="user-tier" style={{ color: currentUser.tier.color }}>
            {currentUser.tier.icon} {currentUser.tier.name}
          </span>
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="user-dropdown">
            <div className="dropdown-header">
              <h4>Switch User</h4>
              <p>Select a user profile to continue</p>
            </div>
            
            <div className="user-list">
              {allUsers.map(user => (
                <button
                  key={user.id}
                  className={`user-option ${currentUser.id === user.id ? 'active' : ''}`}
                  onClick={() => handleUserSwitch(user.id)}
                >
                  <div className="user-option-avatar" style={{ borderColor: user.tier.color }}>
                    <span>{user.avatar}</span>
                  </div>
                  <div className="user-option-info">
                    <div className="user-option-name">{user.name}</div>
                    <div className="user-option-email">{user.email}</div>
                    <div className="user-option-tier" style={{ color: user.tier.color }}>
                      {user.tier.icon} {user.tier.name} - {user.tier.description}
                    </div>
                  </div>
                  {currentUser.id === user.id && (
                    <span className="active-indicator">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="dropdown-footer">
              <div className="tier-legend">
                <div className="legend-item">
                  <span style={{ color: '#64748b' }}>🥉 Bronze</span>
                  <span>Basic Analytics</span>
                </div>
                <div className="legend-item">
                  <span style={{ color: '#1DE9B6' }}>🥇 Gold</span>
                  <span>Full Access + AI</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSelector;



