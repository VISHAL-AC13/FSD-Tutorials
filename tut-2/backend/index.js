const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = "";
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create Mongoose Schema & Model
const attendanceSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' },
    date: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// GET: Fetch attendance list
app.get('/api/attendance', async (req, res) => {
    try {
        const records = await Attendance.find().sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add new attendance record (for testing/initialization)
app.post('/api/attendance', async (req, res) => {
    try {
        const newRecord = new Attendance({
            studentName: req.body.studentName,
            status: req.body.status || 'Absent'
        });
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Update attendance status
app.put('/api/attendance/:id', async (req, res) => {
    try {
        const updatedRecord = await Attendance.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Delete attendance record
app.delete('/api/attendance/:id', async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
