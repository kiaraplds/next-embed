import React, { useEffect, useRef, useState } from 'react';
import { AppEmbed, EmbedEvent, Page } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot } from '../services/thoughtSpotConfig';
import { useUser } from '../context/UserContext';
import './ReportsPage.css';

const ReportsPage = () => {
  const embedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const initializeReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize ThoughtSpot SDK
        await initializeThoughtSpot();
        
        // Clear any existing embed
        if (embedRef.current) {
          embedRef.current.innerHTML = '';
        }
        
        // Create AppEmbed to show the Liveboard library filtered by author
        // Reference: https://developers.thoughtspot.com/docs/embed-liveboard
        const appEmbed = new AppEmbed(embedRef.current, {
          frameParams: {
            width: '100%',
            height: '100vh',
          },
          // Use path to include author filter in URL
          path: '#/liveboards?author=kiara',
          fullHeight: true,
          showPrimaryNavbar: false,
        });
        
        // Add event listeners
        appEmbed.on(EmbedEvent.Init, () => {
          console.log('Reports library initialized successfully');
          console.log(`User tier: ${currentUser.tier.name}`);
        });
        
        appEmbed.on(EmbedEvent.Load, () => {
          console.log('Reports library loaded successfully');
          setIsLoading(false);
        });
        
        appEmbed.on(EmbedEvent.Error, (error) => {
          console.error('Reports library error:', error);
          setError('Failed to load your reports. Please check your connection and try again.');
          setIsLoading(false);
        });
        
        // Render the embed
        await appEmbed.render();
        
      } catch (error) {
        console.error('Error initializing Reports library:', error);
        setError('Failed to initialize reports library. Please check your configuration.');
        setIsLoading(false);
      }
    };
    
    initializeReports();
  }, [currentUser]); // Re-initialize when user switches
  
  if (error) {
    return (
      <div className="liveboard-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="liveboard-page">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      )}
      <div ref={embedRef} className="thoughtspot-embed" />
    </div>
  );
};

export default ReportsPage;

