const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// --- Public User Routes ---

// POST /api/user/register
router.post('/register', userController.register);

// POST /api/user/login
router.post('/login', userController.login);

// --- Protected User Routes ---

// GET /api/user/logout
// Note: Even though logout clears a cookie, we protect it 
// to ensure only an authenticated user can log themselves out.
router.get('/logout', protect, userController.logout);

module.exports = router;