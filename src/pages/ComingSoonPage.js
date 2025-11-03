import React from 'react';
import './ComingSoonPage.css';

const ComingSoonPage = ({ title, description, icon }) => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">{icon}</div>
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-description">{description}</p>
        <div className="coming-soon-status">
          <span className="status-badge">Coming Soon</span>
          <p className="status-text">This feature is currently under development and will be available soon.</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;





