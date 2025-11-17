import React from 'react';
import { useNavigate } from 'react-router-dom';
import WatchlistEmbed from '../components/WatchlistEmbed';
import InsightsPanel from '../components/InsightsPanel';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-wrapper">
      <aside className="page-sidebar">
        <InsightsPanel />
      </aside>
      
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Excellence in Analytics</h1>
            <p className="hero-subtitle">
              Discover insights that drive extraordinary performance
            </p>
          </div>
        </section>

        {/* KPI Watchlist Section */}
        <section className="watchlist-section">
          <div className="watchlist-container-wrapper">
            <div className="section-header">
              <h2 className="section-title">KPI Watchlist</h2>
              <p className="section-subtitle">Monitor your key performance indicators</p>
            </div>
            <WatchlistEmbed />
          </div>
        </section>

        {/* Quick Access Navigation */}
        <section className="quick-access-section">
          <div className="quick-access-container">
            <h2 className="section-title">Quick Access</h2>
            <div className="quick-access-grid">
              <button 
                className="access-card"
                onClick={() => navigate('/reports')}
              >
                <div className="access-icon">📈</div>
                <h3 className="access-title">My Reports</h3>
                <p className="access-description">
                  View and manage your dashboards
                </p>
                <span className="access-arrow">→</span>
              </button>
              
              <button 
                className="access-card"
                onClick={() => navigate('/spotter')}
              >
                <div className="access-icon">💡</div>
                <h3 className="access-title">Enlighter</h3>
                <p className="access-description">
                  Ask questions in natural language
                </p>
                <span className="access-arrow">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

