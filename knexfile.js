// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: {
      database: "hack-or-snooze",
      user: "postgres",
      password: process.env.DBPASSWORD,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./dataBase/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./dataBase/seeds",
      tableName: "knex_seeds",
    },
  },
};
