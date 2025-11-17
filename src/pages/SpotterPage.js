import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotterEmbed, EmbedEvent, Action } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot, THOUGHTSPOT_CONFIG } from '../services/thoughtSpotConfig';
import { useUser } from '../context/UserContext';
import './SpotterPage.css';

const SpotterPage = () => {
  const navigate = useNavigate();
  const { hasAccess } = useUser();
  const embedRef = useRef(null);
  const spotterEmbedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user has access to Spotter
  useEffect(() => {
    if (!hasAccess('spotter')) {
      navigate('/restricted');
    }
  }, [hasAccess, navigate]);

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
        // Reference: https://developers.thoughtspot.com/docs/embed-spotter
        const spotterEmbed = new SpotterEmbed(embedRef.current, {
          frameParams: {
            width: '100%',
            height: '870px',
          },
          worksheetId: THOUGHTSPOT_CONFIG.worksheetId,
          searchOptions: {
            searchQuery: '', // Start with empty query
          },
          locale: 'en-GB',
          showSpotterLimitations: false,
          // Configure visible actions - enable coaching, editing, and pinning
          visibleActions: [
            Action.Pin,                    // Enable pinning answers
            Action.Save,                   // Enable saving answers
            Action.Edit,                   // Enable editing answers
            Action.Download,               // Enable downloading data
            Action.PreviewDataSpotter,     // Enable data preview
            Action.ResetSpotterChat,       // Enable resetting conversation
            Action.SpotterFeedback,        // Enable coaching/feedback widget
            Action.EditPreviousPrompt,     // Enable editing previous prompts
            Action.DeletePreviousPrompt,   // Enable deleting previous prompts
            Action.ModifyAnswer            // Enable modifying generated answers
          ],
          // No disabled actions - all features enabled
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

  // Handle example query clicks - reinitialize Spotter with new query
  const handleExampleClick = async (query) => {
    try {
      // Clear the existing embed
      if (embedRef.current) {
        embedRef.current.innerHTML = '';
      }
      
      // Reinitialize ThoughtSpot SDK
      await initializeThoughtSpot();
      
      // Create new Spotter embed with the selected query
      const spotterEmbed = new SpotterEmbed(embedRef.current, {
        frameParams: {
          width: '100%',
          height: '870px',
        },
        worksheetId: THOUGHTSPOT_CONFIG.worksheetId,
        searchOptions: {
          searchQuery: query, // Populate with the clicked question
        },
        locale: 'en-GB',
        showSpotterLimitations: false,
        visibleActions: [
          Action.Pin,
          Action.Save,
          Action.Edit,
          Action.Download,
          Action.PreviewDataSpotter,
          Action.ResetSpotterChat,
          Action.SpotterFeedback,
          Action.EditPreviousPrompt,
          Action.DeletePreviousPrompt,
          Action.ModifyAnswer
        ],
        disabledActions: [],
        disabledActionReason: "Contact your administrator to enable this feature"
      });
      
      // Store reference
      spotterEmbedRef.current = spotterEmbed;
      
      // Add event listeners
      spotterEmbed.on(EmbedEvent.Init, () => {
        console.log('Spotter initialized with query:', query);
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
      console.error('Error reinitializing Spotter with query:', error);
      setError('Failed to execute query. Please try again.');
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
      category: "Fashion & Leather Goods",
      icon: "👜",
      questions: [
        "Show me Louis Vuitton sales performance by region this quarter",
        "Which Dior product lines are trending highest in Asia-Pacific?"
      ]
    },
    {
      category: "Wines & Spirits",
      icon: "🥂",
      questions: [
        "What are Moët & Chandon sales trends across European markets?",
        "Show me Hennessy market share compared to competitors"
      ]
    },
    {
      category: "Perfumes & Cosmetics",
      icon: "💄",
      questions: [
        "Show me Sephora same-store sales performance by country",
        "Which Dior fragrances are best-sellers this season?"
      ]
    }
  ];

  return (
    <div className="spotter-page">
      <div className="askfinda-layout">
        {/* Left Sidebar - Glass Questions Panel */}
        <div className="questions-sidebar">
          <div className="questions-header">
            <div className="nextq-branding">
              <span className="nextq-icon">✨</span>
              <div className="nextq-title">
                <h2>Spotter</h2>
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
            <p>Loading Spotter...</p>
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
