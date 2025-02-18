const RateLimit = require('hapi-rate-limit');

const rateLimitPlugin = {
  name: 'rateLimitPlugin',
  register: async function (server, options) {
    await server.register({
      plugin: RateLimit,
      options: {
        enabled: options.enabled || true,          
        userLimit: options.userLimit || 100,       
        userCache: options.userCache || { expiresIn: 60 * 1000 }
      },
    });
  },
};

module.exports = rateLimitPlugin;
