const db = require('../config/db');

const submitLeaveRequest = async (studentId, reason, fromDate, toDate) => {
    const [result] = await db.query(
        `INSERT INTO leave_requests (student_id, reason, from_date, to_date, status)
         VALUES (?, ?, ?, ?, 'pending')`,
        [studentId, reason, fromDate, toDate]
    );
    return result;
};

const getStudentLeaveRequests = async (studentId) => {
    const [rows] = await db.query(
        `SELECT id, reason, from_date, to_date, status, created_at
         FROM leave_requests
         WHERE student_id = ?
         ORDER BY created_at DESC`,
        [studentId]
    );
    return rows;
};

const getPendingLeaveRequests = async () => {
    const [rows] = await db.query(
        `SELECT lr.id, lr.reason, lr.from_date, lr.to_date, lr.status, lr.created_at,
                u.id AS student_id, u.name AS student_name, u.email AS student_email
         FROM leave_requests lr
         JOIN users u ON lr.student_id = u.id
         WHERE lr.status = 'pending'
         ORDER BY lr.created_at ASC`
    );
    return rows;
};

const getLeaveRequestById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM leave_requests WHERE id = ?`,
        [id]
    );
    return rows[0];
};

const updateLeaveStatus = async (id, status, reviewedBy) => {
    const [result] = await db.query(
        `UPDATE leave_requests
         SET status = ?, reviewed_by = ?
         WHERE id = ?`,
        [status, reviewedBy, id]
    );
    return result;
};

module.exports = {
    submitLeaveRequest,
    getStudentLeaveRequests,
    getPendingLeaveRequests,
    getLeaveRequestById,
    updateLeaveStatus,
};