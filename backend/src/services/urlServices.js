const { nanoid } = require('nanoid');
const crypto = require('crypto');
const { InternalError, NotFoundError, ValidationError, UnauthorizedError } = require('../utils/errors');
const prisma = require('../models/prisma'); // Import the real Prisma client
const redisClient = require('../models/redis'); // Import the real Redis client

const logger = console; // Using console as our logger
const MAX_RETRIES = 5; // Max retries for short code generation
const CACHE_TTL_SECONDS = 5 * 60; // 5 minutes (matches Go code)

/**
 * Validates a URL string.
 */
const validateUrl = (url) => {
    try {
        // Use Node.js's native URL parser
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * Creates a short URL with collision detection and retries.
 * Equivalent to createShortURLWithRetries.
 */
const createShortUrlWithRetries = async (userId, longUrl) => {
    if (!validateUrl(longUrl)) {
        throw new ValidationError('Invalid URL format');
    }

    for (let i = 0; i < MAX_RETRIES; i++) {
        // Generate a 7-character short code, matching your Go project
        const shortCode = nanoid(7);
        
        // Check for collision
        const existing = await prisma.url.findUnique({
            where: { shortUrl: shortCode },
            select: { id: true } // Only select 'id' for efficiency
        });

        // If no collision, create the URL
        if (!existing) {
            const urlId = crypto.randomUUID();

            // Save to repository (Prisma)
            const newUrl = await prisma.url.create({
                data: {
                    id: urlId,
                    userId: userId,
                    shortUrl: shortCode,
                    longUrl: longUrl
                }
            });
            
            logger.info('Short URL created successfully', { shortCode: newUrl.shortUrl, urlId: newUrl.id });
            return newUrl;
        }
    }

    // If we exit the loop, we've failed all retries
    logger.error('Failed to create short URL after retries', { userId });
    throw new InternalError('Max retries exceeded, failed to generate unique short code');
};

/**
 * Creates a short URL.
 * Equivalent to CreateShortURL method in urlService.
 */
exports.createShortUrl = async (userId, longUrl) => {
    const url = await createShortUrlWithRetries(userId, longUrl);
    // Return the DTO (Data Transfer Object)
    return {
        id: url.id,
        short_url: url.shortUrl,
        long_url: url.longUrl,
        redirects: url.redirects,
        created_at: url.createdAt
    };
};

/**
 * Gets the original URL for a short code, using cache-aside logic.
 * Equivalent to GetOriginalURL method in urlService.
 */
exports.getOriginalUrl = async (shortCode) => {
    logger.info('Processing get original URL request', { shortCode });

    // 1. Try to get from cache
    try {
        let cachedUrl = await redisClient.get(shortCode);
        if (cachedUrl) {
            logger.debug('URL found in cache', { shortCode });
            // Fire-and-forget the redirect increment (no need to await)
            prisma.url.update({
                where: { shortUrl: shortCode },
                data: { redirects: { increment: 1 } }
            }).catch(err => logger.error('Failed to increment redirect count', err));
            
            return cachedUrl;
        }
    } catch (err) {
        logger.error('Redis GET failed', err);
        // Continue to database, cache is not critical
    }

    // 2. Find in repository (database)
    const url = await prisma.url.findUnique({ where: { shortUrl: shortCode } });

    if (!url) {
        logger.warn('URL not found in database', { shortCode });
        throw new NotFoundError('URL not found');
    }

    // 3. Cache the result (Set with expiry)
    try {
        await redisClient.set(shortCode, url.longUrl, {
            EX: CACHE_TTL_SECONDS
        });
    } catch (err) {
        logger.error('Redis SET failed', err);
        // Do not fail the request, just log the error
    }

    // 4. Increment redirects (await this one since it's the first time)
    try {
        await prisma.url.update({
            where: { shortUrl: shortCode },
            data: { redirects: { increment: 1 } }
        });
    } catch (err) {
        logger.error('Failed to increment redirect count', err);
        // Do not fail the request
    }

    logger.info('URL retrieval from DB successful', { shortCode });
    return url.longUrl;
};

/**
 * Gets a paginated list of URLs for a specific user.
 * Equivalent to GetPaginatedURLs method in urlService.
 */
exports.getPaginatedUrls = async (userId, limit, offset) => {
    const urls = await prisma.url.findMany({
        where: { userId },
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
    });

    // Map to the DTO response format
    return urls.map(url => ({
        id: url.id,
        short_url: url.shortUrl,
        long_url: url.longUrl,
        redirects: url.redirects,
        created_at: url.createdAt
    }));
};

/**
 * Gets the redirect count for a URL.
 * Equivalent to GetAnalytics method in urlService.
 */
exports.getAnalytics = async (shortCode, userId) => {
    const url = await prisma.url.findUnique({
        where: { shortUrl: shortCode },
        select: { redirects: true, userId: true } // Only get what we need
    });

    if (!url) {
        throw new NotFoundError('URL not found');
    }

    // Check ownership
    if (url.userId !== userId) {
        throw new UnauthorizedError('Not authorized to view analytics');
    }

    return url.redirects;
};

/**
 * Updates the long URL for a short code.
 * Equivalent to UpdateURL method in urlService.
 */
exports.updateUrl = async (urlId, userId, newLongUrl) => {
    if (!validateUrl(newLongUrl)) {
        throw new ValidationError('Invalid new URL format');
    }

    const url = await prisma.url.findUnique({ where: { id: urlId } });
    if (!url) {
        throw new NotFoundError('URL not found');
    }

    // Check ownership
    if (url.userId !== userId) {
        throw new UnauthorizedError('Not authorized to update this URL');
    }

    // Update the database
    await prisma.url.update({
        where: { id: urlId },
        data: { longUrl: newLongUrl }
    });

    // Invalidate cache
    try {
        await redisClient.del(url.shortUrl);
    } catch (err) {
        logger.error('Redis DEL failed', err);
    }
};

/**
 * Deletes a URL.
 * Equivalent to DeleteURL method in urlService.
 */
exports.deleteUrl = async (urlId, userId) => {
    const url = await prisma.url.findUnique({ where: { id: urlId } });
    if (!url) {
        throw new NotFoundError('URL not found');
    }

    // Check ownership
    if (url.userId !== userId) {
        throw new UnauthorizedError('Not authorized to delete this URL');
    }

    // Delete from database
    await prisma.url.delete({ where: { id: urlId } });

    // Invalidate cache
    try {
        await redisClient.del(url.shortUrl);
    } catch (err) {
        logger.error('Redis DEL failed', err);
    }
};