// Import the service that contains the business logic
const userService = require('../services/userServices');
// Import our standardized response helpers
const { success, error } = require('../utils/response');

// Equivalent to UserLogin
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // Use the error helper for a 400 Bad Request
            return error(res, 400, 'Email and password are required.');
        }

        // Call the service to perform the logic
        const tokenResponse = await userService.login({ email, password });

        // Set authentication cookie
        // The 'secure' and 'sameSite' options are crucial for production security
        res.cookie('token', tokenResponse.token, {
            httpOnly: true, // Not accessible by client-side JS
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
            sameSite: 'strict', // Helps prevent CSRF
            maxAge: 24 * 60 * 60 * 1000 // 24 hours (matches token expiry)
        });

        // Use the success helper for a 200 OK
        return success(res, 200, 'Login successful!', tokenResponse);
    } catch (err) {
        // Handle errors thrown by the service (e.g., UnauthorizedError)
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to UserRegister
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return error(res, 400, 'Name, email, and password are required.');
        }

        // Call the service
        const tokenResponse = await userService.register({ name, email, password });

        // Set authentication cookie just like in login
        res.cookie('token', tokenResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Use the success helper for a 201 Created
        return success(res, 201, 'Registration successful!', tokenResponse);
    } catch (err) {
        return error(res, err.statusCode || 500, err.message || 'Internal Server Error');
    }
};

// Equivalent to UserLogout
exports.logout = (req, res) => {
    // Invalidate the cookie by clearing it and setting an expiry date in the past
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Set expiry to a past date
    });
    
    // Use the success helper for a 200 OK
    return success(res, 200, 'Logout successful!');
};

// --- NEW FUNCTION ---
exports.getMe = (req, res) => {
    // The user ID was attached in the 'protect' middleware
    const userId = req.user.id;
    return success(res, 200, 'User is authenticated', { id: userId });
};

