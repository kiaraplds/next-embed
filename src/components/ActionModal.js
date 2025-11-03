import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './ActionModal.css';

const ActionModal = ({ insight, onClose }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'System',
      avatar: '🤖',
      message: `Insight detected: ${insight.label}. How would you like to proceed?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: currentUser.name,
      avatar: currentUser.name.split(' ').map(n => n[0]).join(''),
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setComments([...comments, newComment]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: comments.length + 2,
        user: 'NextQuestion AI',
        avatar: '✨',
        message: generateAIResponse(insight, message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setComments(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (insight, userMessage) => {
    if (insight.id === 2) {
      return "Store footfall decline is concerning but expected given the retail shift to online. I recommend increasing click-and-collect promotions and in-store experiences to drive traffic. Should I draft a strategy proposal?";
    } else if (insight.id === 1) {
      return "Excellent online growth! International markets are outperforming expectations. The +21.9% international surge suggests strong demand for UK fashion abroad. Should I generate a detailed regional breakdown?";
    } else if (insight.id === 3) {
      return "The Autumn Womenswear collection is performing exceptionally well. Knitwear and Coats are leading categories. I recommend increasing stock allocation by 35% for these items ahead of peak winter season.";
    } else if (insight.id === 4) {
      return "International expansion is driving significant growth. Third-party platforms like Zalando and Nordstrom are proving highly effective. Should I analyze which markets have the highest conversion rates?";
    } else {
      return "I'm analyzing this insight. Would you like me to schedule a follow-up report or create a task for your team?";
    }
  };

  const quickActions = [
    { icon: '📧', label: 'Email Team', action: 'email' },
    { icon: '📊', label: 'Generate Report', action: 'report' },
    { icon: '✅', label: 'Create Task', action: 'task' }
  ];

  const handleQuickAction = (action) => {
    const actionMessage = {
      id: comments.length + 1,
      user: 'System',
      avatar: '🤖',
      message: `Action initiated: ${action.label}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setComments([...comments, actionMessage]);
  };

  return (
    <div className="action-modal-overlay" onClick={onClose}>
      <div className="action-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-icon">{insight.icon}</div>
            <div className="modal-title-section">
              <h3 className="modal-title">{insight.label}</h3>
              <p className="modal-subtitle">{insight.description}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Insight Details */}
          <div className="insight-details-card">
            <h4>Details</h4>
            <p>{insight.details}</p>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  <span className="quick-action-icon">{action.icon}</span>
                  <span className="quick-action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comments/Chat Interface */}
          <div className="comments-section">
            <h4>Discussion & Notes</h4>
            <div className="comments-list">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`comment ${comment.user === currentUser.name ? 'user-comment' : 'system-comment'}`}
                >
                  <div className="comment-avatar">{comment.avatar}</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                    <div className="comment-message">{comment.message}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form className="comment-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment or ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="comment-submit-btn">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;

