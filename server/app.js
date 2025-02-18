require('dotenv').config()
const Hapi = require('@hapi/hapi');
const jwtAuthPlugin = require('./plugins/jwtAuth');
const rateLimiterPlugin = require('./plugins/rateLimiter');
const rateLimitHelper = require('./helpers/rateLimiter');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');


// server initialization
const app = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    server.ext('onPreHandler', async (request, h) => {
        // console.log(request.headers)
        return h.continue;
    });
    

    // Registering Authentication plugin
    await server.register({
        plugin: jwtAuthPlugin,
        options: { secret: process.env.JWT_SECRET },
    });

    // Registering Rate Limiter plugin
    await server.register({
        plugin: rateLimiterPlugin,
        options: {
          enabled: true, // Enable rate limiting
          userLimit: 20, // 100 requests per minute per user
          userCache: { expiresIn: 60 * 1000 }, // Cache duration for 1 minute
        },
    });

    // Register routes
    server.route(authRoutes); // Authentication routes (no auth needed)
    server.route(userRoutes); // protected by JWT
    
    rateLimitHelper(server);

    await server.start();
    console.log('Server is up and running on port:',process.env.PORT,",   Info:",server.info.uri);
};

app().catch(err => {
    console.error(err);
    process.exit(1);
});
