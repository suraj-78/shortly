const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { UnauthorizedError, ConflictError, InternalError, ValidationError } = require('../utils/errors');
const prisma = require('../models/prisma'); // Import the real Prisma client

const logger = console; // Using console as our logger
const SALT_ROUNDS = 10; // Equivalent to bcrypt cost

/**
 * Generates a JWT for a given user ID.
 */
const generateToken = (userId) => {
    try {
        // Use a strong, secret key from environment variables
        const secret = process.env.JWT_SECRET || 'your-super-secret-key-replace-this';
        if (secret === 'your-super-secret-key-replace-this') {
            logger.warn('WARNING: Using default JWT secret. Please set JWT_SECRET in .env');
        }

        // Your Go code uses RS256, which requires a private key.
        // For simplicity, this uses HS256 (HMAC with SHA-256) with a secret.
        // If you want to keep RS256, you'd use:
        // const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
        // const token = jwt.sign({ id: userId }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });
        
        const token = jwt.sign({ id: userId }, secret, { expiresIn: '24h' });
        return { type: 'Bearer', token };
    } catch (err) {
        logger.error('Token generation failed', err);
        throw new InternalError('Token generation failed');
    }
};

/**
 * Registers a new user.
 * Equivalent to Register method in userService.
 */
exports.register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new ValidationError('Name, email, and password are required');
    }
    // TODO: Add stronger email/password validation logic here

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Generate UUID
    const userId = crypto.randomUUID();

    // Save user
    try {
        const newUser = await prisma.user.create({
            data: { 
                id: userId, 
                name, 
                email, 
                password: hashedPassword 
            }
        });
        
        logger.info('User registered successfully', { userId: newUser.id });
        
        // Generate and return token
        return generateToken(newUser.id);
    } catch (err) {
        logger.error('Error saving new user', err);
        throw new InternalError('Save operation failed');
    }
};

/**
 * Logs in an existing user.
 * Equivalent to Login method in userService.
 */
exports.login = async ({ email, password }) => {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        logger.warn('Login attempt failed: user not found', { email });
        throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        logger.warn('Login attempt failed: invalid password', { email });
        throw new UnauthorizedError('Invalid email or password');
    }

    logger.info('Login successful', { userId: user.id });
    
    // Generate and return token
    return generateToken(user.id);
};

/**
 * Logs out a user.
 * Equivalent to Logout method in userService.
 */
exports.logout = async () => {
    // With stateless JWTs, logout is primarily a client-side action
    // (deleting the token/cookie).
    // If you had a token blacklist, you would add logic here.
    return;
};