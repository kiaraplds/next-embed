import React, { useState } from 'react';
import ActionModal from './ActionModal';
import './WeeklyInsights.css';

const WeeklyInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  const insights = [
    {
      id: 1,
      icon: '🥂',
      label: 'Moët & Chandon Strong Quarter',
      description: 'Champagne sales up 17% driven by premium Grand Vintage collection',
      trend: 'positive',
      metric: '+17%',
      details: 'Exceptional performance for Moët & Chandon this quarter. Sales increased 17% year-over-year driven by Grand Vintage collection (35% growth) and Impérial Rosé (22% growth). Key markets: Asia-Pacific (+28%), Europe (+14%), Americas (+12%). Holiday season pre-orders exceeding forecasts by 20%.'
    },
    {
      id: 2,
      icon: '⚠️',
      label: 'Fendi Store Traffic Declining',
      description: 'Foot traffic down 12% in European boutiques this month',
      trend: 'warning',
      metric: '-12%',
      details: 'Fendi boutiques experiencing reduced foot traffic across Europe. 12% decline in store visits month-over-month. Primary markets affected: Milan (-15%), Paris (-11%), London (-9%). Digital engagement remains strong (+8%). Recommend enhanced in-store experiences and personalized shopping appointments.'
    },
    {
      id: 3,
      icon: '✅',
      label: 'Bulgari Jewelry Exceeding Target',
      description: 'High jewelry collections sales up 34% - exceeding forecast',
      trend: 'positive',
      metric: '+34%',
      details: 'Outstanding performance for Bulgari high jewelry. Sales reached 34% above target this quarter. Serpenti collection leading growth (42% increase), B.zero1 rings (+31%). Middle East market particularly strong (+48%). VIP client purchases up 52%, with average transaction value increasing 28%.'
    },
    {
      id: 4,
      icon: '💄',
      label: 'Givenchy Beauty Launch Success',
      description: 'New Rouge Interdit lipstick line selling out in 3 days across markets',
      trend: 'positive',
      metric: '3 days',
      details: 'Givenchy Beauty\'s Rouge Interdit launch exceeding all expectations. Initial inventory sold out within 3 days in key markets. Social media engagement: 2.3M impressions, 340K+ shares. Influencer partnerships driving 67% of sales. Recommend accelerated production and expanded distribution to capitalize on momentum.'
    }
  ];

  const handleTakeAction = (insight) => {
    setSelectedInsight(insight);
  };

  const handleCloseModal = () => {
    setSelectedInsight(null);
  };

  return (
    <>
      <div className="weekly-insights-banner">
        <div className="insights-header">
          <div className="header-left">
            <span className="insights-badge">📅 This Week</span>
            <h3 className="insights-title">Key Insights</h3>
          </div>
          <div className="header-right">
            <span className="last-updated">Updated 2 hours ago</span>
          </div>
        </div>
        
        <div className="insights-grid">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className={`insight-card ${insight.trend}`}
            >
              <div className="insight-content">
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-info">
                  <div className="insight-label">{insight.label}</div>
                  <div className="insight-description">{insight.description}</div>
                </div>
                <div className="insight-metric">{insight.metric}</div>
              </div>
              <button 
                className="take-action-btn"
                onClick={() => handleTakeAction(insight)}
              >
                Take Action
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedInsight && (
        <ActionModal 
          insight={selectedInsight}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default WeeklyInsights;

