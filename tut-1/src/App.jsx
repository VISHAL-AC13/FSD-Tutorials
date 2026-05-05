import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './index.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleAddFeedback = (newFeedback) => {
    // Add new feedback to the top of the list
    setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks]);
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>Student Feedback Portal</h1>
        <p>We value your thoughts and suggestions.</p>
      </header>

      <main className="main-content">
        <div className="layout-grid">
          <section className="form-section">
            <FeedbackForm onSubmit={handleAddFeedback} />
          </section>
          <section className="list-section">
            <FeedbackList feedbacks={feedbacks} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
