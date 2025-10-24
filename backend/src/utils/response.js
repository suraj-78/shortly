/**
 * Formats a successful JSON response.
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code (e.g., 200, 201).
 * @param {string} message - A descriptive message.
 * @param {object | null} data - The payload data (or null).
 */
exports.success = (res, statusCode = 200, message, data) => {
    return res.status(statusCode).json({
        message,
        data: data || null
    });
};

/**
 * Formats an error JSON response.
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code (e.g., 400, 404, 500).
 * @param {string} message - A descriptive error message.
 */
exports.error = (res, statusCode = 500, message) => {
    return res.status(statusCode).json({
        message,
        data: null
    });
};