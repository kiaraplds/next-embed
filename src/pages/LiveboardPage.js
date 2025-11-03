import React, { useEffect, useRef, useState } from 'react';
import { LiveboardEmbed, EmbedEvent, Action } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot, THOUGHTSPOT_CONFIG } from '../services/thoughtSpotConfig';
import { useUser } from '../context/UserContext';
import WeeklyInsights from '../components/WeeklyInsights';
import './LiveboardPage.css';

const LiveboardPage = () => {
  const embedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const initializeLiveboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize ThoughtSpot SDK
        await initializeThoughtSpot();
        
        // Clear any existing embed
        if (embedRef.current) {
          embedRef.current.innerHTML = '';
        }
        
        // Check if user has Gold tier (AI features access)
        const hasAIAccess = currentUser.tier.id === 'gold';
        
        // AI Highlights and SpotIQ actions to hide for Bronze users
        // Reference: https://developers.thoughtspot.com/docs/actions
        const aiActionsToHide = hasAIAccess ? [] : [
          Action.AIHighlights,
          Action.SpotIQAnalyze
        ];
        
        // Create new Liveboard embed with tier-based features
        const liveboardEmbed = new LiveboardEmbed(embedRef.current, {
          frameParams: {
            width: '100%',
            height: '100%',
          },
          liveboardId: THOUGHTSPOT_CONFIG.liveboardId,
          fullHeight: true,
          // Hide AI Highlights and SpotIQ buttons for Bronze users
          hideActions: aiActionsToHide,
          disabledActions: aiActionsToHide,
          // Disable AI features for Bronze users
          enableSearchAssist: hasAIAccess,
          enableSpotIQAssist: hasAIAccess,
          // Enable advanced styling and grouping features
          // Reference: https://developers.thoughtspot.com/docs/Interface_LiveboardViewConfig#_isliveboardstylingandgroupingenabled
          isLiveboardStylingAndGroupingEnabled: true,
        });
        
        // Add event listeners
        liveboardEmbed.on(EmbedEvent.Init, () => {
          console.log('Liveboard initialized successfully');
          console.log(`User tier: ${currentUser.tier.name} - AI features: ${hasAIAccess ? 'Enabled' : 'Hidden'}`);
        });
        
        liveboardEmbed.on(EmbedEvent.Load, () => {
          console.log('Liveboard loaded successfully');
          setIsLoading(false);
        });
        
        liveboardEmbed.on(EmbedEvent.Error, (error) => {
          console.error('Liveboard error:', error);
          setError('Failed to load liveboard. Please check your connection and try again.');
          setIsLoading(false);
        });
        
        // Render the embed
        await liveboardEmbed.render();
        
      } catch (error) {
        console.error('Error initializing Liveboard:', error);
        setError('Failed to initialize dashboard. Please check your configuration.');
        setIsLoading(false);
      }
    };
    
    initializeLiveboard();
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
      <WeeklyInsights />
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      )}
      <div className="embed-container">
        <div ref={embedRef} className="thoughtspot-embed" />
      </div>
    </div>
  );
};

export default LiveboardPage;
