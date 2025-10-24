const { createClient } = require('redis');
const logger = console;

// Create a single client instance
const redisClient = createClient({
    // url: 'redis://username:password@host:port'
    // We'll read the URL from the .env file
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
});

// We'll connect in server.js, but export the client here
module.exports = redisClient;
