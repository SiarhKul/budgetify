const { Client } = require('pg');
// const dotenv = require('dotenv');
//
// dotenv.config({
//   path: `.env.dev`,
//   debug: true,
//   override: true,
// });

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

const connectPostgres = async (logger) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    logger.log('Connected to PostgreSQL database');

    const result = await client.query('SELECT * FROM users');
    logger.log('Query result:', result.rows);
    return result.rows;

  } catch (err) {
    logger.error('Error executing query', err);
  } finally {
    try {
      await client.end();
      logger.log('Connection to PostgreSQL closed');
    } catch (err) {
      logger.error('Error closing connection', err);
    }
  }
};

module.exports = { connectPostgres };

// connectPostgres({ log: console.log, error: console.error });
