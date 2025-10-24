// Import the service that contains the business logic
const urlService = require('../services/urlServices');
// Import our standardized response helpers
const { success, error } = require('../utils/response');

// Equivalent to CreateShortURL
exports.createShortUrl = async (req, res) => {
    try {
        const { long_url } = req.body;
        // The user ID is attached to `req.user` by the auth middleware
        const userId = req.user.id;

        if (!long_url) {
            return error(res, 400, 'long_url is required.');
        }

        const newUrl = await urlService.createShortUrl(userId, long_url);
        // Return 201 Created
        return success(res, 201, 'Short URL created successfully', newUrl);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to GetPaginatedURLs
exports.getPaginatedUrls = async (req, res) => {
    try {
        const userId = req.user.id;
        // Query params from Express are strings, so we parse them to integers
        const limit = parseInt(req.query.limit, 10);
        const offset = parseInt(req.query.offset, 10);

        if (isNaN(limit) || isNaN(offset)) {
            return error(res, 400, 'Limit and offset must be valid numbers.');
        }

        const urls = await urlService.getPaginatedUrls(userId, limit, offset);
        return success(res, 200, 'Success!', urls);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to GetAnalytics
exports.getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shortCode } = req.params;

        const count = await urlService.getAnalytics(shortCode, userId);
        return success(res, 200, 'Success!', count);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to UpdateURL
exports.updateUrl = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, new_url } = req.body; // Matches 'valueobject.URLUpdateRequest'

        if (!id || !new_url) {
            return error(res, 400, 'id and new_url are required.');
        }

        await urlService.updateUrl(id, userId, new_url);
        return success(res, 200, 'URL updated successfully!', null);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to DeleteURL
exports.deleteUrl = async (req, res) => {
    try {
        const userId = req.user.id;
        const { urlId } = req.params;

        await urlService.deleteUrl(urlId, userId);
        return success(res, 200, 'URL deleted successfully!', null);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// --- Public Handlers ---

// Equivalent to RedirectUser (handles GET /{shortCode})
exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // Ignore favicon requests
        if (shortCode === 'favicon.ico') {
            return res.status(204).end();
        }

        const longUrl = await urlService.getOriginalUrl(shortCode);
        
        // 302 Found redirect
        return res.redirect(302, longUrl);
    } catch (err) {
        // If URL not found, redirect to a fallback page or show a 404
        // For now, we'll just send the error
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to GetLongURL (handles GET /api/{shortCode})
exports.getLongUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const longUrl = await urlService.getOriginalUrl(shortCode);
        
        return success(res, 200, 'Success!', longUrl);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};