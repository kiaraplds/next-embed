import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      id: 'scenarios',
      label: 'Production Scenarios',
      path: '/scenarios',
      icon: '🎯',
      description: 'Capacity planning & what-if analysis'
    },
    {
      id: 'scenario',
      label: 'Auto Scenario Analysis',
      path: '/scenario',
      icon: '⚡',
      description: 'AI-powered optimization'
    },
    {
      id: 'overview',
      label: 'My Dashboards',
      path: '/liveboard',
      icon: '📊',
      description: 'Your created reports'
    },
    {
      id: 'ai-assistant',
      label: 'Enlighter',
      path: '/spotter',
      icon: '🤖',
      description: 'Natural language queries'
    },
    {
      id: 'sales-analytics',
      label: 'Sales Analytics',
      path: '/sales',
      icon: '📈',
      description: 'Order fulfillment & revenue'
    },
    {
      id: 'inventory',
      label: 'Inventory Management',
      path: '/inventory',
      icon: '📦',
      description: 'Stock levels & materials'
    },
    {
      id: 'customer-insights',
      label: 'Quality Control',
      path: '/customers',
      icon: '✅',
      description: 'Defects & yield rates'
    },
    {
      id: 'brand-performance',
      label: 'Equipment Performance',
      path: '/brands',
      icon: '⚙️',
      description: 'OEE & downtime metrics'
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
            <span>Ultimo Analytics</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
