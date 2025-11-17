import React, { useState, useEffect } from 'react';
import './DailyInsights.css';

const DailyInsights = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [insights, setInsights] = useState([]);

  // Mock AI insights that would be generated daily
  const aiInsights = [
    {
      id: 1,
      type: 'sales',
      priority: 'high',
      title: 'Louis Vuitton Asia Growth',
      insight: 'Louis Vuitton sales in Asia-Pacific up 24% this quarter, driven by strong demand for Neverfull and Speedy collections. China market shows exceptional performance.',
      metric: '+24%',
      category: 'Fashion & Leather',
      icon: '👜',
      actionable: true,
      confidence: 96
    },
    {
      id: 2,
      type: 'inventory',
      priority: 'high',
      title: 'Dior Handbag Stock Alert',
      insight: 'Dior Lady Dior collection experiencing stock shortages in 8 European boutiques. High demand exceeding supply forecasts. Recommend inventory reallocation.',
      metric: '8 stores',
      category: 'Inventory',
      icon: '📦',
      actionable: true,
      confidence: 99
    },
    {
      id: 3,
      type: 'performance',
      priority: 'high',
      title: 'Sephora Digital Sales Surge',
      insight: 'Sephora online sales increased 31% month-over-month. Mobile app conversions driving growth. Beauty advisor virtual consultations showing strong engagement.',
      metric: '+31%',
      category: 'Perfumes & Cosmetics',
      icon: '💄',
      actionable: true,
      confidence: 94
    },
    {
      id: 4,
      type: 'market',
      priority: 'medium',
      title: 'Hennessy Market Share Growth',
      insight: 'Hennessy gaining market share in North American premium cognac segment. Up 5 percentage points vs competitors. Celebrity partnerships driving brand awareness.',
      metric: '+5pts',
      category: 'Wines & Spirits',
      icon: '🥂',
      actionable: true,
      confidence: 88
    },
    {
      id: 5,
      type: 'customer',
      priority: 'low',
      title: 'TAG Heuer Customer Loyalty Up',
      insight: 'TAG Heuer repeat purchase rate increased by 18% this quarter. Connected watch ecosystem driving customer retention and brand loyalty.',
      metric: '+18%',
      category: 'Watches & Jewelry',
      icon: '⌚',
      actionable: false,
      confidence: 92
    },
    {
      id: 6,
      type: 'trend',
      priority: 'medium',
      title: 'Sustainable Luxury Demand',
      insight: 'Consumer demand for sustainable luxury products up 45% year-over-year across all LVMH houses. Stella McCartney and conscious collections outperforming.',
      metric: '+45%',
      category: 'Market Trends',
      icon: '🌱',
      actionable: true,
      confidence: 85
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
            <span className="ai-text">🧠 Powered by Spotter AI Analytics</span>
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



