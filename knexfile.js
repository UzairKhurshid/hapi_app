require('dotenv').config();
const config = require('./server/config/config')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user:     config.user,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./server/migrations",
    },
    seeds: {
      directory: "./server/seeds",
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user:     config.user,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./server/migrations",
    },
    seeds: {
      directory: "./server/seeds",
    },
  }

};
