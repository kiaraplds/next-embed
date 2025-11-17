import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import SpotterPage from './pages/SpotterPage';
import RestrictedPage from './pages/RestrictedPage';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/spotter" element={<SpotterPage />} />
            <Route path="/restricted" element={<RestrictedPage />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
