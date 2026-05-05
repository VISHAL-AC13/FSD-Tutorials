import React from 'react';

function FeedbackList({ feedbacks }) {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="feedback-list-container glass-panel">
        <h2>Recent Feedback</h2>
        <div className="empty-state">
          <p>No feedback submitted yet. Be the first to share your thoughts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-list-container glass-panel">
      <h2>Recent Feedback</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <div className="feedback-header">
              <h3>{feedback.studentName}</h3>
              <span className="email-badge">{feedback.email}</span>
            </div>
            {feedback.contactNo && (
              <div className="contact-info">
                📞 {feedback.contactNo}
              </div>
            )}
            <div className="feedback-body">
              <p>"{feedback.message}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;
