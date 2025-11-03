import React, { useState, useRef, useEffect } from 'react';
import { SpotterAgentEmbed } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot, THOUGHTSPOT_CONFIG } from '../services/thoughtSpotConfig';
import './ChatBubble.css';

const ChatBubble = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your NEXT Analytics Assistant. Ask me anything about your product data!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [spotterAgent, setSpotterAgent] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize SpotterAgent
  useEffect(() => {
    const initSpotter = async () => {
      try {
        await initializeThoughtSpot();
        
        const agent = new SpotterAgentEmbed({
          worksheetId: THOUGHTSPOT_CONFIG.worksheetId,
        });
        
        setSpotterAgent(agent);
      } catch (error) {
        console.error('Failed to initialize SpotterAgent:', error);
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        }]);
      }
    };

    if (isOpen && !spotterAgent) {
      initSpotter();
    }
  }, [isOpen, spotterAgent]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !spotterAgent || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await spotterAgent.sendMessage(inputMessage);
      
      if (response.error) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "I encountered an error processing your request. Please try again or rephrase your question.",
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        }]);
      } else {
        // Create a message with the visualization container
        const botMessage = {
          id: Date.now() + 1,
          text: "Here's what I found:",
          sender: 'bot',
          timestamp: new Date(),
          container: response.container
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Something went wrong. Please try your question again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "Show me top selling products",
    "What's our inventory turnover?",
    "Sales by region",
    "Brand performance this month"
  ];

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
    setTimeout(handleSendMessage, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-bubble-overlay">
      <div className="chat-bubble">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <span>🤖</span>
            </div>
            <div className="chat-title">
              <h4>NEXT Analytics Assistant</h4>
              <span className="chat-status">Online</span>
            </div>
          </div>
          <button className="chat-close" onClick={onClose}>
            <span>✕</span>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className={`message-bubble ${message.isError ? 'error' : ''}`}>
                <p>{message.text}</p>
                {message.container && (
                  <div 
                    className="message-visualization"
                    ref={(el) => {
                      if (el && message.container && !el.hasChildNodes()) {
                        el.appendChild(message.container);
                      }
                    }}
                  />
                )}
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-bubble loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-prompts">
            <p>Try asking:</p>
            <div className="prompt-buttons">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="quick-prompt-btn"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-area">
          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your data..."
              className="chat-input"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="chat-send-btn"
            >
              <span>➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
