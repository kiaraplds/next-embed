import React, { useEffect, useRef, useState } from 'react';
import { AppEmbed, EmbedEvent, Page, HomepageModule } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot } from '../services/thoughtSpotConfig';
import './WatchlistEmbed.css';

const WatchlistEmbed = () => {
  const embedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeWatchlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize ThoughtSpot SDK
        await initializeThoughtSpot();
        
        // Clear any existing embed
        if (embedRef.current) {
          embedRef.current.innerHTML = '';
        }
        
        // Create AppEmbed focused on Home page with only watchlist visible
        const appEmbed = new AppEmbed(embedRef.current, {
          frameParams: {
            width: '100%',
            height: '100%',
          },
          pageId: Page.Home,
          fullHeight: true,
          showPrimaryNavbar: false,
          // Enable modular home experience
          modularHomeExperience: true,
          // Hide all homepage modules except watchlist
          hiddenHomepageModules: [
            HomepageModule.Search,
            HomepageModule.Favorite,
            HomepageModule.Trending,
            HomepageModule.Learning,
            HomepageModule.MyLibrary,
          ],
          // Show only the watchlist module
          reorderedHomepageModules: [HomepageModule.Watchlist],
          // Hide left navigation
          hideHomepageLeftNav: true,
        });
        
        // Add event listeners
        appEmbed.on(EmbedEvent.Init, () => {
          console.log('Watchlist initialized');
        });
        
        appEmbed.on(EmbedEvent.Load, () => {
          console.log('Watchlist loaded');
          setIsLoading(false);
        });
        
        appEmbed.on(EmbedEvent.Error, (error) => {
          console.error('Watchlist error:', error);
          setError('Failed to load watchlist. Please check your connection and try again.');
          setIsLoading(false);
        });
        
        // Render the embed
        await appEmbed.render();
        
      } catch (error) {
        console.error('Error initializing Watchlist:', error);
        setError('Failed to initialize watchlist. Please check your configuration.');
        setIsLoading(false);
      }
    };
    
    initializeWatchlist();
  }, []);
  
  if (error) {
    return (
      <div className="watchlist-error">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="watchlist-container">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading KPI Watchlist...</p>
        </div>
      )}
      <div ref={embedRef} className="watchlist-embed" />
    </div>
  );
};

export default WatchlistEmbed;


