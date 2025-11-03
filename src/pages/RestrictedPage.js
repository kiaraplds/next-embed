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
          <h3>🥇 Upgrade to Gold for Full Access</h3>
          <ul className="gold-features">
            <li>✓ Full Liveboard Analytics</li>
            <li>✓ AI Highlights & SpotIQ Analysis</li>
            <li>✓ NextQuestion AI Analyst</li>
            <li>✓ Sales Analytics Dashboard</li>
            <li>✓ Inventory Management</li>
            <li>✓ Customer Insights</li>
            <li>✓ Brand Performance Metrics</li>
            <li>✓ Priority Support</li>
          </ul>
          <button className="upgrade-button">
            Upgrade to Gold
          </button>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/liveboard')} className="back-button">
            ← Back to Dashboard
          </button>
          <button onClick={() => navigate('/')} className="home-button">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPage;

