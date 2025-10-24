/*
 * Copyright 2025 (Your Name)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ... (license header) ...
 */

// 1. Load Configuration
require('dotenv').config();

// 2. Import Core Modules
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser'); // Added cookie-parser
const mainRouter = require('./src/routes'); // Combine all our API routes
const prisma = require('./src/models/prisma'); // Import Prisma client
const redisClient = require('./src/models/redis'); // Import Redis client
// const { setupSwagger } = require('./src/config/swagger'); // For API docs

// 3. Initialize Logger
const logger = console;

// 4. Initialize Express App
const app = express();

// 5. Apply Core Middleware
// CORS is now handled in src/routes/index.js
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies, needed for auth

// 6. Setup Swagger API Documentation (Placeholder)
// This is the equivalent of 'router.New(app.Handler, ...)'
// setupSwagger(app);

// 7. Setup API Routes
app.use('/api', mainRouter);

// Add the top-level redirect handler
const urlController = require('./src/controllers/urlController');
app.get('/:shortCode', urlController.redirectUrl);

// 8. Create HTTP Server
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

// 9. Graceful Shutdown
const gracefulShutdown = () => {
    logger.log('Received shutdown signal, shutting down gracefully...');

    server.close(async () => {
        logger.log('HTTP server closed.');

        try {
            await prisma.$disconnect();
            logger.log('PostgreSQL connection closed.');

            if (redisClient.isOpen) {
                await redisClient.quit();
                logger.log('Redis client closed.');
            }

            process.exit(0);
        } catch (err) {
            logger.error('Error during graceful shutdown:', err);
            process.exit(1);
        }
    });

    const shutdownTimeout = parseInt(process.env.GRACEFUL_SHUTDOWN_TIMEOUT || '10000', 10);
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, shutdownTimeout);
};

// Listen for termination signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// 10. Start the Server
const startServer = async () => {
    try {
        // Connect to Redis
        await redisClient.connect();
        logger.log('Connected to Redis successfully.');
        
        // Prisma connects lazily, but we can ping to confirm
        await prisma.$queryRaw`SELECT 1`;
        logger.log('Connected to PostgreSQL successfully.');

        // Start listening
        server.listen(PORT, () => {
            logger.log(`Server running on http://localhost:${PORT}`);
            // logger.log(`API Docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (err) {
        logger.error('Failed to start server:', err);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Run the server
startServer();