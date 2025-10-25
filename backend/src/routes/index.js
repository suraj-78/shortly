const express = require('express');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const urlRoutes = require('./urlRoutes');
const urlController = require('../controllers/urlController');

// Create the main router instance
const router = express.Router();

// Configure CORS Options
const corsOptions = {
  // CRITICAL: Ensure this environment variable is EXACTLY 'https://shortly-tan-six.vercel.app' in Vercel settings
  origin: process.env.CORS_ALLOWED_ORIGINS || '*', 
  methods: 'GET,POST,PATCH,DELETE,OPTIONS', // Include OPTIONS
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // MUST be true for cookies/auth headers
  optionsSuccessStatus: 204 // Standard for preflight
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