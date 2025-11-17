import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './VerticalSidebar.css';

const VerticalSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasAccess } = useUser();

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: '🏠',
      feature: 'liveboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/liveboard',
      icon: '📊',
      feature: 'liveboard'
    },
    {
      id: 'search',
      label: 'Spotter',
      path: '/spotter',
      icon: '🔍',
      feature: 'spotter'
    },
    {
      id: 'add',
      label: 'Add New',
      path: '/scenarios',
      icon: '➕',
      feature: 'liveboard'
    },
    {
      id: 'resources',
      label: 'Resources',
      path: '/resources',
      icon: '👥',
      feature: 'liveboard'
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/reports',
      icon: '📋',
      feature: 'liveboard'
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/projects',
      icon: '💼',
      feature: 'liveboard'
    },
    {
      id: 'team',
      label: 'Team',
      path: '/team',
      icon: '👨‍💼',
      feature: 'liveboard'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/calendar',
      icon: '📅',
      feature: 'liveboard'
    }
  ];

  const handleNavClick = (e, item) => {
    if (!hasAccess(item.feature)) {
      e.preventDefault();
      navigate('/restricted');
    }
    // Close sidebar on mobile after clicking
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <div className={`vertical-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-circle">
              <img src="/ultimo_nav_logo-Co9ExjYZ.svg" alt="Ultimo" className="sidebar-logo-img" />
            </div>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const hasItemAccess = hasAccess(item.feature);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''} ${!hasItemAccess ? 'restricted' : ''}`}
                title={hasItemAccess ? item.label : `${item.label} (Premium Only)`}
                onClick={(e) => handleNavClick(e, item)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {!hasItemAccess && <span className="lock-badge">🔒</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default VerticalSidebar;

