import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/UserContext';
import './ActionModal.css';

const ActionModal = ({ insight, onClose }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState('');
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'System',
      avatar: '🤖',
      message: `Insight detected: ${insight.label}. How would you like to proceed?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // List of colleagues that can be tagged
  const colleagues = [
    { id: 1, name: 'Sophie Martin', role: 'Brand Manager - Louis Vuitton', avatar: 'SM' },
    { id: 2, name: 'Jean Dubois', role: 'Sales Director - Europe', avatar: 'JD' },
    { id: 3, name: 'Marie Laurent', role: 'Marketing Director - Dior', avatar: 'ML' },
    { id: 4, name: 'Pierre Rousseau', role: 'Supply Chain Manager', avatar: 'PR' },
    { id: 5, name: 'Isabelle Moreau', role: 'Retail Operations - Sephora', avatar: 'IM' },
    { id: 6, name: 'Thomas Bernard', role: 'Analytics Lead', avatar: 'TB' }
  ];

  const handleTagUser = (colleague) => {
    setTaggedUsers([...taggedUsers, colleague]);
    setShowTagMenu(false);
    setMessage(message + `@${colleague.name} `);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: currentUser.name,
      avatar: currentUser.name.split(' ').map(n => n[0]).join(''),
      message: message.trim(),
      taggedUsers: taggedUsers,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setComments([...comments, newComment]);
    setMessage('');
    setTaggedUsers([]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: comments.length + 2,
        user: 'Enlighter',
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
    { icon: '👥', label: 'Tag Colleague', action: 'tag' },
    { icon: '📧', label: 'Email Team', action: 'email' },
    { icon: '📊', label: 'Generate Report', action: 'report' },
    { icon: '✅', label: 'Create Task', action: 'task' }
  ];

  const handleQuickAction = (action) => {
    if (action.action === 'tag') {
      setShowTagMenu(!showTagMenu);
      return;
    }
    
    const actionMessage = {
      id: comments.length + 1,
      user: 'System',
      avatar: '🤖',
      message: `Action initiated: ${action.label}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setComments([...comments, actionMessage]);
  };

  // Render modal using a portal to document.body to escape any z-index stacking contexts
  return ReactDOM.createPortal(
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
                  className={`quick-action-btn ${action.action === 'tag' && showTagMenu ? 'active' : ''}`}
                  onClick={() => handleQuickAction(action)}
                >
                  <span className="quick-action-icon">{action.icon}</span>
                  <span className="quick-action-label">{action.label}</span>
                </button>
              ))}
            </div>
            
            {/* Tag Colleague Menu */}
            {showTagMenu && (
              <div className="tag-menu">
                <h5>Select colleague to tag:</h5>
                <div className="colleagues-list">
                  {colleagues.map((colleague) => (
                    <button
                      key={colleague.id}
                      className="colleague-item"
                      onClick={() => handleTagUser(colleague)}
                    >
                      <div className="colleague-avatar">{colleague.avatar}</div>
                      <div className="colleague-info">
                        <div className="colleague-name">{colleague.name}</div>
                        <div className="colleague-role">{colleague.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                    {comment.taggedUsers && comment.taggedUsers.length > 0 && (
                      <div className="tagged-users">
                        {comment.taggedUsers.map((user, idx) => (
                          <span key={idx} className="tagged-user-badge">
                            @{user.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form className="comment-form" onSubmit={handleSubmit}>
              {taggedUsers.length > 0 && (
                <div className="input-tagged-users">
                  {taggedUsers.map((user, idx) => (
                    <span key={idx} className="input-tag">
                      @{user.name}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => setTaggedUsers(taggedUsers.filter((_, i) => i !== idx))}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="input-wrapper">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Add a comment, tag colleagues, or ask a question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="comment-submit-btn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ActionModal;

