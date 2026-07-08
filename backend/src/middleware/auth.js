const admin = require('../config/firebase');
const db = require('../config/db');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);

        const [rows] = await db.query(
            'SELECT id, role, department_id FROM users WHERE firebase_uid = ?',
            [decoded.uid]
        );

        if (rows.length === 0) {
            return res.status(403).json({ error: 'User not registered in system' });
        }

        req.user = {
            uid: decoded.uid,
            email: decoded.email,
            id: rows[0].id,
            role: rows[0].role,
            departmentId: rows[0].department_id,
        };

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

const verifyFirebaseOnly = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        req.user_pending = { uid: decoded.uid, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};


const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

module.exports = { verifyToken, requireRole, verifyFirebaseOnly };
