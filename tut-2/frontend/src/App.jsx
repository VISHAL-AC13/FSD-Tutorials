import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/attendance';

function App() {
  const [attendance, setAttendance] = useState([]);
  const [newStudent, setNewStudent] = useState('');

  // Fetch the attendance list
  const fetchAttendance = async () => {
    try {
      const response = await axios.get(API_URL);
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Add new student (helper function)
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.trim()) return;
    try {
      await axios.post(API_URL, { studentName: newStudent, status: 'Absent' });
      setNewStudent('');
      fetchAttendance();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Update attendance status
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      // Update UI instantly
      setAttendance(attendance.map(record => 
        record._id === id ? { ...record, status: newStatus } : record
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete attendance record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Update UI instantly
      setAttendance(attendance.filter(record => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Attendance Management</h1>
      
      <form onSubmit={handleAddStudent} className="add-form">
        <input 
          type="text" 
          value={newStudent} 
          onChange={(e) => setNewStudent(e.target.value)} 
          placeholder="Enter student name"
          required 
        />
        <button type="submit">Add Student</button>
      </form>

      <div className="attendance-list">
        {attendance.map((record) => (
          <div key={record._id} className={`record-card ${record.status.toLowerCase()}`}>
            <div className="info">
              <h3>{record.studentName}</h3>
              <p>Status: <strong>{record.status}</strong></p>
            </div>
            <div className="actions">
              <button 
                className="toggle-btn" 
                onClick={() => handleUpdateStatus(record._id, record.status)}
              >
                Mark {record.status === 'Present' ? 'Absent' : 'Present'}
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {attendance.length === 0 && <p>No attendance records found.</p>}
      </div>
    </div>
  );
}

export default App;
