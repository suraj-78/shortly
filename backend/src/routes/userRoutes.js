const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// --- Public User Routes ---

// POST /api/user/register
router.post('/register', userController.register);

// POST /api/user/login
router.post('/login', userController.login);


// GET /api/user/me (NEW)
// This route is just for checking if the user's token is valid
router.get('/me', protect, userController.getMe);

// GET /api/user/logout
router.get('/logout', protect, userController.logout);

module.exports = router;