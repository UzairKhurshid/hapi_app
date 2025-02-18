const HapiJwt = require('@hapi/jwt');

exports.plugin = {
    name: 'jwtAuth',
    version: '1.0.0',
    register: async (server, options) => {
        // Register JWT plugin
        await server.register(HapiJwt);

        // Define JWT authentication strategy
        server.auth.strategy('jwt', 'jwt', {
            keys: options.secret, // Secret key from .env
            verify: {
                aud: false,
                iss: false,
                sub: false,
                maxAgeSec: 3600, // Token expiration (1 hour)
            },
            validate: async (artifacts, request, h) => {
                // Extract user details from token
                const { id, email, role } = artifacts.decoded.payload;

                // Attach user info to request for later use
                return {
                    isValid: true,
                    credentials: { id, email, role },
                };
            },
        });

        console.log('✅ JWT Authentication Plugin Registered');
    }
};
