const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

// This is the middleware that protects your authenticated routes
exports.protect = (req, res, next) => {
    let token;

    // 1. Check for token in cookies (set during login)
    if (req.cookies.token) {
        token = req.cookies.token;
    } 
    // 2. Fallback: Check for Bearer token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Get the token part
    }

    // 3. If no token, return 401 Unauthorized
    if (!token) {
        return error(res, 401, 'Unauthorized: No token provided');
    }

    try {
        // 4. Verify the token
        // This must use the same secret (or public key if RS256) as your userService
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // 5. Attach the user's ID to the request object
        // Now, any protected controller can access `req.user.id`
        req.user = { id: decoded.id };

        // 6. Token is valid, proceed to the next middleware or controller
        next();
    } catch (err) {
        // If verification fails (e.g., expired, invalid signature)
        return error(res, 401, 'Unauthorized: Invalid token');
    }
};