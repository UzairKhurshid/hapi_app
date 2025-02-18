// helpers/rateLimiter.js
module.exports = (server) => {
    server.events.on('response', (request) => {
        // Log when a rate limit is exceeded
        if (request.response.statusCode === 429) {
            console.log(`Rate limit exceeded for ${request.info.remoteAddress} on ${request.path}`);
        }
    });
};