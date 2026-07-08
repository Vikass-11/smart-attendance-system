const express = require('express');
const router = express.Router();
const { registerUser, getMe } = require('../controllers/authController');
const { verifyFirebaseOnly, verifyToken } = require('../middleware/auth');

router.post('/register', verifyFirebaseOnly, registerUser);
router.get('/me', verifyToken, getMe);

module.exports = router;