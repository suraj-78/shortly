const express = require('express');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const urlRoutes = require('./urlRoutes');
const urlController = require('../controllers/urlController');

// Create the main router instance
const router = express.Router();

// Configure CORS Options
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : '*',
  methods: process.env.CORS_ALLOWED_METHODS || 'GET,POST,PATCH,DELETE',
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
  credentials: process.env.CORS_ALLOW_CREDENTIALS === 'true',
  maxAge: parseInt(process.env.CORS_MAX_AGE || '3600', 10),
};

// Apply CORS middleware to all routes handled by this router
router.use(cors(corsOptions));

// --- Mount the specific routers ---
// This is the equivalent of `h.handlers.Router(r)`
router.use('/user', userRoutes);
router.use('/url', urlRoutes);

// --- Public API Routes ---
// GET /api/health
router.get('/health', (req, res) => {
  res.status(200).send('App is running!');
});

router.get('/:shortCode', urlController.getLongUrl);


// Export the main router to be used in server.js
module.exports = router;