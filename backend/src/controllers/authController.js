const db = require('../config/db');

const registerUser = async (req, res) => {
    const { name, role, departmentId } = req.body;
    const { uid, email } = req.user_pending; // set by verifyFirebaseOnly middleware below

    if (!name || !role) {
        return res.status(400).json({ error: 'Name and role are required' });
    }

    if (!['student', 'faculty', 'admin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const [existing] = await db.query(
            'SELECT id FROM users WHERE firebase_uid = ?',
            [uid]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'User already registered' });
        }

        const [result] = await db.query(
            'INSERT INTO users (firebase_uid, name, email, role, department_id) VALUES (?, ?, ?, ?, ?)',
            [uid, name, email, role, departmentId || null]
        );

        res.status(201).json({
            id: result.insertId,
            uid,
            name,
            email,
            role,
            departmentId: departmentId || null,
        });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

const getMe = async (req, res) => {
    res.json(req.user);
};

module.exports = { registerUser, getMe };