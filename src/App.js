import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import LiveboardPage from './pages/LiveboardPage';
import SpotterPage from './pages/SpotterPage';
import ComingSoonPage from './pages/ComingSoonPage';
import RestrictedPage from './pages/RestrictedPage';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LiveboardPage />} />
            <Route path="/liveboard" element={<LiveboardPage />} />
            <Route path="/spotter" element={<SpotterPage />} />
            <Route path="/restricted" element={<RestrictedPage />} />
          <Route 
            path="/sales" 
            element={
              <ComingSoonPage 
                title="Sales Analytics" 
                description="Comprehensive revenue analysis, trends, and sales performance metrics across all channels and regions."
                icon="📈"
              />
            } 
          />
          <Route 
            path="/inventory" 
            element={
              <ComingSoonPage 
                title="Inventory Management" 
                description="Real-time stock levels, turnover rates, and inventory optimization insights for efficient supply chain management."
                icon="📦"
              />
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ComingSoonPage 
                title="Customer Insights" 
                description="Deep customer behavior analysis, segmentation, and personalization strategies to drive engagement."
                icon="👥"
              />
            } 
          />
          <Route 
            path="/brands" 
            element={
              <ComingSoonPage 
                title="Brand Performance" 
                description="Brand-specific KPIs, market share analysis, and competitive positioning insights for strategic decision making."
                icon="🏷️"
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
    </UserProvider>
  );
}

export default App;
