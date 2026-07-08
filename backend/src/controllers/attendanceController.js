const attendanceModel = require('../models/attendanceModel');

const markAttendance = async (req, res) => {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
        return res.status(400).json({ error: 'studentId, date, and status are required' });
    }

    if (!['present', 'absent', 'late'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        await attendanceModel.markAttendance(studentId, req.user.id, date, status);
        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to mark attendance', details: err.message });
    }
};

const getMyAttendance = async (req, res) => {
    try {
        const records = await attendanceModel.getStudentAttendance(req.user.id);
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch attendance', details: err.message });
    }
};

const getMyPercentage = async (req, res) => {
    try {
        const result = await attendanceModel.calculatePercentage(req.user.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to calculate percentage', details: err.message });
    }
};

const getClassAttendance = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'date query param is required' });
    }

    try {
        const records = await attendanceModel.getAttendanceByDate(date);
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch class attendance', details: err.message });
    }
};

const getLowAttendanceStudents = async (req, res) => {
    const threshold = req.query.threshold ? parseFloat(req.query.threshold) : 75;

    try {
        const students = await attendanceModel.getStudentsBelowThreshold(threshold);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch low attendance students', details: err.message });
    }
};

module.exports = {
    markAttendance,
    getMyAttendance,
    getMyPercentage,
    getClassAttendance,
    getLowAttendanceStudents,
};