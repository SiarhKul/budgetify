const { Client } = require('pg');

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

const retrieveDataFromPostgres = async (pgQuery, logger={
  log: console.log,
  error: console.error,
}) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    logger.log('Connected to PostgreSQL database');

    const result = await client.query(pgQuery);
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

module.exports = {  retrieveDataFromPostgres };
