const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { protect } = require('../middleware/authMiddleware');

// --- Protected URL Routes ---

// IMPORTANT: All routes in this file are protected.
// We apply the 'protect' middleware to the entire router.
// This is equivalent to your Go `r.Group(func(r chi.Router) { r.Use(...) })`
router.use(protect);

// GET /api/urls (Get paginated URLs)
router.get('/', urlController.getPaginatedUrls);

// POST /api/url/create
router.post('/create', urlController.createShortUrl);

// PATCH /api/url/update
router.patch('/update', urlController.updateUrl);

// DELETE /api/url/{urlId}
router.delete('/:urlId', urlController.deleteUrl);

// GET /api/url/analytics/{shortCode}
router.get('/analytics/:shortCode', urlController.getAnalytics);


module.exports = router;