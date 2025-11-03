import React, { useEffect, useRef, useState } from 'react';
import { SpotterEmbed, EmbedEvent, Action } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot, THOUGHTSPOT_CONFIG } from '../services/thoughtSpotConfig';
import './SpotterPage.css';

const SpotterPage = () => {
  const embedRef = useRef(null);
  const spotterEmbedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSpotter = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize ThoughtSpot SDK
        await initializeThoughtSpot();
        
        // Clear any existing embed
        if (embedRef.current) {
          embedRef.current.innerHTML = '';
        }
        
        // Create new Spotter embed
        const spotterEmbed = new SpotterEmbed(embedRef.current, {
          frameParams: {
            width: '100%',
            height: '100%',
          },
          worksheetId: THOUGHTSPOT_CONFIG.worksheetId,
          searchOptions: {
            searchQuery: '', // Start with empty query
          },
          locale: 'en-GB',
          showSpotterLimitations: false,
          // Configure visible actions
          visibleActions: [
            Action.Pin,
            Action.Save,
            Action.Download,
            Action.PreviewDataSpotter,
            Action.ResetSpotterChat,
            Action.SpotterFeedback,
            Action.EditPreviousPrompt,
            Action.DeletePreviousPrompt
          ],
          // Disable some actions if needed
          disabledActions: [],
          disabledActionReason: "Contact your administrator to enable this feature"
        });
        
        // Store reference for later use
        spotterEmbedRef.current = spotterEmbed;
        
        // Add event listeners
        spotterEmbed.on(EmbedEvent.Init, () => {
          console.log('Spotter initialized');
        });
        
        spotterEmbed.on(EmbedEvent.Load, () => {
          console.log('Spotter loaded');
          setIsLoading(false);
        });
        
        spotterEmbed.on(EmbedEvent.Error, (error) => {
          console.error('Spotter error:', error);
          setError('Failed to load AI assistant. Please check your connection and try again.');
          setIsLoading(false);
        });
        
        // Render the embed
        await spotterEmbed.render();
        
      } catch (error) {
        console.error('Error initializing Spotter:', error);
        setError('Failed to initialize AI assistant. Please check your configuration.');
        setIsLoading(false);
      }
    };
    
    initializeSpotter();
  }, []);

  // Handle example query clicks
  const handleExampleClick = async (query) => {
    if (spotterEmbedRef.current) {
      try {
        // Use the SpotterEmbed API to set the search query
        await spotterEmbedRef.current.navigateToAnswerFromQuery(query);
      } catch (error) {
        console.error('Error setting query:', error);
        // Fallback: try to use the search method if available
        try {
          await spotterEmbedRef.current.search(query);
        } catch (fallbackError) {
          console.error('Fallback search also failed:', fallbackError);
        }
      }
    }
  };

  if (error) {
    return (
      <div className="spotter-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const exampleQueries = [
    {
      category: "Product Performance",
      icon: "📊",
      questions: [
        "Show me top selling products by region",
        "Which SKUs have the highest margins?",
        "Show me products with declining sales"
      ]
    },
    {
      category: "Inventory & Stock",
      icon: "📦",
      questions: [
        "What's our inventory turnover rate?",
        "Show me low stock items that need reordering",
        "Which products have the highest stock levels?"
      ]
    },
    {
      category: "Sales Analysis",
      icon: "📈",
      questions: [
        "Compare sales performance across different product categories",
        "What are the seasonal trends for our bestsellers?",
        "Show me revenue trends for the last quarter"
      ]
    }
  ];

  return (
    <div className="spotter-page">
      <div className="nextquestion-layout">
        {/* Left Sidebar - Glass Questions Panel */}
        <div className="questions-sidebar">
          <div className="questions-header">
            <div className="nextq-branding">
              <span className="nextq-icon">✨</span>
              <div className="nextq-title">
                <h2>NextQuestion</h2>
                <p>Your AI Analyst</p>
              </div>
            </div>
          </div>

          <div className="questions-content">
            <h4 className="questions-subtitle">💬 Suggested Questions</h4>
            
            {exampleQueries.map((category, catIndex) => (
              <div key={catIndex} className="question-category">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.category}</span>
                </div>
                <div className="category-questions">
                  {category.questions.map((question, qIndex) => (
                    <button
                      key={qIndex}
                      className="question-card"
                      onClick={() => handleExampleClick(question)}
                      title={`Click to ask: ${question}`}
                    >
                      <span className="question-bullet">→</span>
                      <span className="question-text">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="questions-footer">
              <div className="footer-tip">
                <span className="tip-icon">💡</span>
                <span>Click any question to start analyzing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Area - Spotter Embed */}
        <div className="spotter-main">
          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading NextQuestion...</p>
            </div>
          )}
          <div className="embed-container">
            <div ref={embedRef} className="thoughtspot-embed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotterPage;
