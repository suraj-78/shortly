// Custom error classes for better error handling in services and controllers

/**
 * Base error class that all other custom errors will extend from.
 */
class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        // Captures the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 400 Bad Request
 * Use for invalid user input (e.g., missing fields, invalid email format).
 */
class ValidationError extends BaseError {
    constructor(message = 'Invalid input') {
        super(message, 400);
    }
}

/**
 * 401 Unauthorized
 * Use when a user is not authenticated (e.g., missing or invalid JWT).
 */
class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

/**
 * 404 Not Found
 * Use when a resource cannot be found (e.g., URL not found, user not found).
 */
class NotFoundError extends BaseError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

/**
 * 409 Conflict
 * Use when an action conflicts with the current state (e.g., email already exists).
 */
class ConflictError extends BaseError {
    constructor(message = 'Resource conflict') {
        super(message, 409);
    }
}

/**
 * 500 Internal Server Error
 * Use for unexpected server errors (e.g., database connection failed).
 */
class InternalError extends BaseError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}

// Export all the custom error classes
module.exports = {
    BaseError,
    ValidationError,
    UnauthorizedError,
    NotFoundError,
    ConflictError,
    InternalError
};