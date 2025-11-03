import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './DailyInsights.css';

const DailyInsights = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [insights, setInsights] = useState([]);
  const { currentUser } = useUser();

  // Mock AI insights that would be generated daily
  const aiInsights = [
    {
      id: 1,
      type: 'trending',
      priority: 'high',
      title: 'Trending Product Alert',
      insight: 'Oversized blazers showing 78% increase in searches this week. Consider increasing inventory for autumn collection.',
      metric: '+78%',
      category: 'Trend Analysis',
      icon: '🔥',
      actionable: true,
      confidence: 94
    },
    {
      id: 2,
      type: 'inventory',
      priority: 'medium',
      title: 'Stock Level Optimization',
      insight: 'Skinny jeans inventory 67% below optimal levels. Recommend restocking black and blue variants in sizes 8-14.',
      metric: '-67%',
      category: 'Inventory',
      icon: '📦',
      actionable: true,
      confidence: 89
    },
    {
      id: 3,
      type: 'performance',
      priority: 'high',
      title: 'Top Performer Spotlight',
      insight: 'Midi dresses achieving 2.3x higher conversion rate than category average. Expand similar styles.',
      metric: '2.3x',
      category: 'Performance',
      icon: '⭐',
      actionable: true,
      confidence: 96
    },
    {
      id: 4,
      type: 'seasonal',
      priority: 'medium',
      title: 'Seasonal Shift Detected',
      insight: 'Knitwear demand increasing 45% week-over-week. Early autumn transition suggests strong Q4 potential.',
      metric: '+45%',
      category: 'Seasonal',
      icon: '🍂',
      actionable: false,
      confidence: 87
    },
    {
      id: 5,
      type: 'customer',
      priority: 'low',
      title: 'Customer Behavior Insight',
      insight: 'Customers viewing activewear 32% more likely to purchase accessories. Cross-selling opportunity identified.',
      metric: '+32%',
      category: 'Customer',
      icon: '👥',
      actionable: true,
      confidence: 82
    },
    {
      id: 6,
      type: 'pricing',
      priority: 'medium',
      title: 'Price Sensitivity Analysis',
      insight: 'Premium handbags price elasticity suggests 5% price increase could boost revenue 12% with minimal volume loss.',
      metric: '+12%',
      category: 'Pricing',
      icon: '💰',
      actionable: true,
      confidence: 91
    }
  ];

  useEffect(() => {
    // Simulate daily refresh of insights
    const dailyInsights = aiInsights.slice(0, 4); // Show 4 insights per day
    setInsights(dailyInsights);
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#d32f2f';
      case 'medium': return '#f57c00';
      case 'low': return '#388e3c';
      default: return '#666';
    }
  };

  const refreshInsights = () => {
    // Simulate getting new insights
    const shuffled = [...aiInsights].sort(() => 0.5 - Math.random());
    setInsights(shuffled.slice(0, 4));
  };

  return (
    <div className="daily-insights">
      <div className="insights-header">
        <div className="header-main">
          <div className="insights-title">
            <span className="ai-badge">🤖 AI</span>
            <h3>Daily Product Insights</h3>
          </div>
          <button className="refresh-btn" onClick={refreshInsights} title="Refresh insights">
            <span className="refresh-icon">🔄</span>
          </button>
        </div>
        <div className="insights-timestamp">
          <span className="date">{formatDate(currentTime)}</span>
          <span className="time">Last updated: {formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="daily-insights-scrollable">
        <div className="insights-grid">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className={`insight-card ${insight.priority}`}
            >
              <div className="insight-header">
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-meta">
                  <span className="insight-category">{insight.category}</span>
                  <div 
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(insight.priority) }}
                  ></div>
                </div>
              </div>
              
              <div className="insight-content">
                <h4 className="insight-title">{insight.title}</h4>
                <p className="insight-text">{insight.insight}</p>
                
                <div className="insight-metrics">
                  <div className="metric-value">{insight.metric}</div>
                  <div className="confidence-score">
                    <span className="confidence-label">Confidence:</span>
                    <span className="confidence-value">{insight.confidence}%</span>
                  </div>
                </div>
                
                {insight.actionable && (
                  <div className="insight-action">
                    <button className="action-btn">
                      <span>Take Action</span>
                      <span className="action-arrow">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="insights-footer">
          <div className="ai-attribution">
            <span className="ai-text">🧠 Powered by NEXT AI Analytics Engine</span>
            <span className="update-frequency">• Updates every 6 hours</span>
          </div>
          <div className="insights-summary">
            <span className="summary-text">
              {insights.filter(i => i.actionable).length} actionable insights • 
              Avg. confidence {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInsights;



