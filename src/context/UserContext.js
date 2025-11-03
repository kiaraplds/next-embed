import React, { createContext, useState, useContext } from 'react';

// User tier definitions
export const USER_TIERS = {
  BRONZE: {
    id: 'bronze',
    name: 'Bronze',
    color: '#cd7f32',
    icon: '🥉',
    features: ['liveboard'],
    description: 'Basic analytics access'
  },
  GOLD: {
    id: 'gold',
    name: 'Gold',
    color: '#d4af37',
    icon: '🥇',
    features: ['liveboard', 'spotter', 'sales', 'inventory', 'customers', 'brands'],
    description: 'Full platform access with NextQuestion AI'
  }
};

// Mock users
export const MOCK_USERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@next.co.uk',
    tier: USER_TIERS.BRONZE,
    avatar: 'SJ',
    company: 'NEXT Brand Partner'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@next.co.uk',
    tier: USER_TIERS.GOLD,
    avatar: 'MC',
    company: 'NEXT Analytics Team'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.wilson@next.co.uk',
    tier: USER_TIERS.BRONZE,
    avatar: 'EW',
    company: 'NEXT Brand Partner'
  },
  {
    id: 4,
    name: 'David Martinez',
    email: 'david.martinez@next.co.uk',
    tier: USER_TIERS.GOLD,
    avatar: 'DM',
    company: 'NEXT Senior Analyst'
  }
];

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[1]); // Default to Gold user

  const switchUser = (userId) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      console.log(`Switched to ${user.tier.name} user: ${user.name}`);
    }
  };

  const hasAccess = (feature) => {
    return currentUser.tier.features.includes(feature);
  };

  const value = {
    currentUser,
    switchUser,
    hasAccess,
    allUsers: MOCK_USERS,
    userTiers: USER_TIERS
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

