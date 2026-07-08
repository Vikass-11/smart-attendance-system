const db = require('../config/db');

const markAttendance = async (studentId, markedBy, date, status) => {
    const [result] = await db.query(
        `INSERT INTO attendance (student_id, marked_by, date, status)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by)`,
        [studentId, markedBy, date, status]
    );
    return result;
};

const getStudentAttendance = async (studentId) => {
    const [rows] = await db.query(
        `SELECT id, date, status, created_at, updated_at
         FROM attendance
         WHERE student_id = ?
         ORDER BY date DESC`,
        [studentId]
    );
    return rows;
};

const getAttendanceByDate = async (date) => {
    const [rows] = await db.query(
        `SELECT a.id, a.status, u.id AS student_id, u.name AS student_name
         FROM attendance a
         JOIN users u ON a.student_id = u.id
         WHERE a.date = ? AND u.role = 'student'
         ORDER BY u.name`,
        [date]
    );
    return rows;
};

const calculatePercentage = async (studentId) => {
    const [rows] = await db.query(
        `SELECT
            COUNT(*) AS total_days,
            SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_days
         FROM attendance
         WHERE student_id = ?`,
        [studentId]
    );

    const { total_days, present_days } = rows[0];
    const percentage = total_days > 0 ? ((present_days / total_days) * 100).toFixed(2) : "0.00";

    return { totalDays: total_days, presentDays: present_days, percentage: parseFloat(percentage) };
};

const getStudentsBelowThreshold = async (threshold = 75) => {
    const [rows] = await db.query(
        `SELECT
            u.id, u.name, u.email,
            COUNT(a.id) AS total_days,
            SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_days,
            ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS percentage
         FROM users u
         JOIN attendance a ON u.id = a.student_id
         WHERE u.role = 'student'
         GROUP BY u.id
         HAVING percentage < ?
         ORDER BY percentage ASC`,
        [threshold]
    );
    return rows;
};

module.exports = {
    markAttendance,
    getStudentAttendance,
    getAttendanceByDate,
    calculatePercentage,
    getStudentsBelowThreshold,
};