import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ScenariosListPage.css';

const ScenariosListPage = () => {
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 1,
      name: 'Automatic scenario',
      type: 'Automated',
      status: 'Active',
      budget: '£10m',
      cost: '£6m',
      hours: '110/120 h',
      members: 4,
      lastUpdated: '2 hours ago',
      progress: 85,
      icon: '⚡'
    },
    {
      id: 2,
      name: 'Q4 Project Rollout',
      type: 'Manual',
      status: 'Planning',
      budget: '£8.5m',
      cost: '£2.1m',
      hours: '45/100 h',
      members: 6,
      lastUpdated: '1 day ago',
      progress: 45,
      icon: '📋'
    },
    {
      id: 3,
      name: 'Client Engagement Initiative',
      type: 'Automated',
      status: 'Active',
      budget: '£5.2m',
      cost: '£3.8m',
      hours: '78/90 h',
      members: 3,
      lastUpdated: '3 hours ago',
      progress: 73,
      icon: '🎯'
    },
    {
      id: 4,
      name: 'Infrastructure Upgrade',
      type: 'Manual',
      status: 'On Hold',
      budget: '£12m',
      cost: '£1.2m',
      hours: '12/150 h',
      members: 5,
      lastUpdated: '1 week ago',
      progress: 10,
      icon: '🏗️'
    }
  ];

  const handleScenarioClick = (scenario) => {
    if (scenario.id === 1) {
      navigate('/scenario');
    } else {
      // For other scenarios, you could navigate to different pages
      navigate('/scenario');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10b981';
      case 'Planning':
        return '#3b82f6';
      case 'On Hold':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="scenarios-list-page">
      <div className="scenarios-header">
        <div className="header-top">
          <h1>Resource Planning Scenarios</h1>
          <button className="btn-create-scenario">
            <span className="btn-icon">+</span>
            Create New Scenario
          </button>
        </div>
        <p className="header-subtitle">
          Manage and compare different resource allocation scenarios for your projects
        </p>
      </div>

      <div className="scenarios-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dbeafe' }}>📊</div>
          <div className="stat-content">
            <div className="stat-value">{scenarios.length}</div>
            <div className="stat-label">Total Scenarios</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#d1fae5' }}>✅</div>
          <div className="stat-content">
            <div className="stat-value">{scenarios.filter(s => s.status === 'Active').length}</div>
            <div className="stat-label">Active Scenarios</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}>💰</div>
          <div className="stat-content">
            <div className="stat-value">£35.7m</div>
            <div className="stat-label">Total Budget</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fce7f3' }}>👥</div>
          <div className="stat-content">
            <div className="stat-value">18</div>
            <div className="stat-label">Team Members</div>
          </div>
        </div>
      </div>

      <div className="scenarios-grid">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="scenario-card"
            onClick={() => handleScenarioClick(scenario)}
          >
            <div className="scenario-card-header">
              <div className="scenario-icon">{scenario.icon}</div>
              <div className="scenario-type-badge">{scenario.type}</div>
            </div>

            <div className="scenario-card-body">
              <h3 className="scenario-name">{scenario.name}</h3>
              
              <div className="scenario-status">
                <span
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(scenario.status) }}
                ></span>
                <span className="status-text">{scenario.status}</span>
              </div>

              <div className="scenario-metrics">
                <div className="metric-row">
                  <span className="metric-label">Budget</span>
                  <span className="metric-value">{scenario.budget}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Cost</span>
                  <span className="metric-value">{scenario.cost}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Hours</span>
                  <span className="metric-value">{scenario.hours}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Members</span>
                  <span className="metric-value">{scenario.members}</span>
                </div>
              </div>

              <div className="scenario-progress">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">{scenario.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${scenario.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="scenario-card-footer">
              <span className="last-updated">Updated {scenario.lastUpdated}</span>
              <button className="btn-view-scenario">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenariosListPage;

