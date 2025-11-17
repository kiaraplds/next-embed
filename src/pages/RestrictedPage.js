import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './RestrictedPage.css';

const RestrictedPage = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className="restricted-page">
      <div className="restricted-content">
        <div className="restricted-icon">🔒</div>
        <h1>Access Restricted</h1>
        <p className="restricted-message">
          This feature is not available with your current subscription tier.
        </p>
        
        <div className="current-tier-info">
          <span className="tier-badge" style={{ borderColor: currentUser.tier.color, color: currentUser.tier.color }}>
            {currentUser.tier.icon} {currentUser.tier.name} Tier
          </span>
          <p className="tier-description">{currentUser.tier.description}</p>
        </div>

        <div className="upgrade-section">
          <h3>🥇 Upgrade to Premium for Full Access</h3>
          <ul className="gold-features">
            <li>✓ Full Brand Performance Analytics</li>
            <li>✓ AI-Powered Market Insights & Analysis</li>
            <li>✓ Spotter - Ask questions in natural language</li>
            <li>✓ AI Chat Assistant - Get instant answers</li>
            <li>✓ Advanced Sales & Revenue Tracking</li>
            <li>✓ Real-Time Market Intelligence</li>
            <li>✓ Competitive Positioning Analytics</li>
            <li>✓ Priority Support</li>
          </ul>
          <button className="upgrade-button">
            Upgrade to Premium
          </button>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
          <button onClick={() => navigate('/liveboard')} className="home-button">
            View Available Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPage;

