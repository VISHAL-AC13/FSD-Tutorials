import React, { useState } from 'react';

function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    contactNo: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.email || !formData.message) {
      alert('Please fill out the required fields.');
      return;
    }
    
    onSubmit(formData);
    
    setFormData({
      studentName: '',
      email: '',
      contactNo: '',
      message: ''
    });
  };

  return (
    <div className="feedback-form-container glass-panel">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="studentName">Student Name *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email ID *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactNo">Contact No.</label>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Feedback Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Share your thoughts..."
            rows="4"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
