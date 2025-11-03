import React, { useState } from 'react';
import ActionModal from './ActionModal';
import './WeeklyInsights.css';

const WeeklyInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  const insights = [
    {
      id: 1,
      icon: '📈',
      label: 'Online Sales Surge',
      description: 'UK Online up +5.8%, International +21.9% this quarter',
      trend: 'positive',
      metric: '+8.1%',
      details: 'Total online sales: £284.5M this quarter (vs £263.2M last year). International markets driving growth, particularly in Europe and US. Womenswear and Homeware categories leading with +12% growth.'
    },
    {
      id: 2,
      icon: '⚠️',
      label: 'Store Footfall Down',
      description: 'Retail stores -4.7% vs last quarter',
      trend: 'warning',
      metric: '-4.7%',
      details: 'Physical store sales: £156.2M (vs £163.8M last quarter). High street footfall declining as customers shift to online. Key opportunity: drive click-and-collect to stores to increase conversion.'
    },
    {
      id: 3,
      icon: '👗',
      label: 'Autumn Collection Winner',
      description: 'Womenswear autumn range: 2,847 items sold this week',
      trend: 'positive',
      metric: '2.8K units',
      details: 'Best-selling categories: Knitwear (£89 average price), Coats & Jackets (£125 avg), Dresses (£65 avg). Customer satisfaction: 4.6/5.0. Recommend increasing stock for high performers ahead of peak season.'
    },
    {
      id: 4,
      icon: '🌍',
      label: 'International Expansion',
      description: '18 new overseas markets added this year',
      trend: 'positive',
      metric: '+25%',
      details: 'Total international sales: £892M (+25% YoY). Third-party platforms (Zalando, Nordstrom) now account for 30% of international business. Next brand gaining strong traction in European markets.'
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

