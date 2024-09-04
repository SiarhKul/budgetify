const { Client } = require('pg');

const retrieveDataFromPostgres = async (pgQuery, dbConfig, logger={
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
