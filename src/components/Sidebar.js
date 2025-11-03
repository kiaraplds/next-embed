import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/liveboard',
      icon: '📊',
      description: 'Product performance dashboard'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      path: '/spotter',
      icon: '🤖',
      description: 'Natural language queries'
    },
    {
      id: 'sales-analytics',
      label: 'Sales Analytics',
      path: '/sales',
      icon: '📈',
      description: 'Revenue and trends'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      path: '/inventory',
      icon: '📦',
      description: 'Stock levels and turnover'
    },
    {
      id: 'customer-insights',
      label: 'Customer Insights',
      path: '/customers',
      icon: '👥',
      description: 'Behavior and segments'
    },
    {
      id: 'brand-performance',
      label: 'Brand Performance',
      path: '/brands',
      icon: '🏷️',
      description: 'Brand-specific metrics'
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h3>Reports</h3>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <span>✕</span>
          </button>
        </div>
      
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="sidebar-link-icon">{item.icon}</div>
            <div className="sidebar-link-content">
              <div className="sidebar-link-label">{item.label}</div>
              <div className="sidebar-link-description">{item.description}</div>
            </div>
          </Link>
        ))}
      </nav>
      
        <div className="sidebar-footer">
          <div className="sidebar-brand">
            <div className="brand-accent"></div>
            <span>NEXT Analytics</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
