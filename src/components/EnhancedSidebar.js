import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './EnhancedSidebar.css';

const EnhancedSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasAccess } = useUser();

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/liveboard',
      icon: '📊',
      description: 'Product performance dashboard',
      preview: 'Dashboard with KPIs, charts, and metrics',
      feature: 'liveboard'
    },
    {
      id: 'askfinda',
      label: 'Enlighter',
      path: '/spotter',
      icon: '✨',
      description: 'Your AI Analyst',
      preview: 'Ask questions and get instant insights',
      feature: 'spotter'
    },
    {
      id: 'sales-analytics',
      label: 'Sales Analytics',
      path: '/sales',
      icon: '📈',
      description: 'Revenue and trends',
      preview: 'Coming Soon - Revenue analysis',
      feature: 'sales'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      path: '/inventory',
      icon: '📦',
      description: 'Stock levels and turnover',
      preview: 'Coming Soon - Stock management',
      feature: 'inventory'
    },
    {
      id: 'customer-insights',
      label: 'Customer Insights',
      path: '/customers',
      icon: '👥',
      description: 'Behavior and segments',
      preview: 'Coming Soon - Customer analytics',
      feature: 'customers'
    },
    {
      id: 'brand-performance',
      label: 'Brand Performance',
      path: '/brands',
      icon: '🏷️',
      description: 'Brand-specific metrics',
      preview: 'Coming Soon - Brand analysis',
      feature: 'brands'
    }
  ];

  const handleNavClick = (e, item) => {
    if (!hasAccess(item.feature)) {
      e.preventDefault();
      navigate('/restricted');
    }
  };

  const currentPage = navigationItems.find(item => item.path === location.pathname) || navigationItems[0];

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <div className={`enhanced-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Current Page Preview */}
        <div className="current-page-preview">
        <div className="preview-header">
          <span className="current-label">Current Page</span>
        </div>
          <div className="preview-content">
            <div className="preview-icon">{currentPage.icon}</div>
            <div className="preview-info">
              <h4>{currentPage.label}</h4>
              <p>{currentPage.preview}</p>
            </div>
          </div>
        </div>

        {/* Navigation Header */}
        <div className="nav-header">
          <h3>All Reports</h3>
          <span className="nav-subtitle">Navigate to any section</span>
        </div>
      
      {/* Navigation Grid */}
      <nav className="enhanced-sidebar-nav">
        {navigationItems.map((item) => {
          const hasItemAccess = hasAccess(item.feature);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-card ${location.pathname === item.path ? 'active' : ''} ${!hasItemAccess ? 'restricted' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              <div className="nav-card-icon">{item.icon}</div>
              <div className="nav-card-content">
                <div className="nav-card-label">
                  {item.label}
                  {!hasItemAccess && <span className="lock-icon">🔒</span>}
                </div>
                <div className="nav-card-description">{item.description}</div>
              </div>
              {location.pathname === item.path && hasItemAccess && (
                <div className="active-indicator">●</div>
              )}
            </Link>
          );
        })}
      </nav>
        
        {/* Footer */}
        <div className="enhanced-sidebar-footer">
          <div className="footer-brand">
            <div className="brand-dot"></div>
            <span>ProFinda Platform</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedSidebar;
