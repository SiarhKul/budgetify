// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const dbConfig = {
  user: 'user',
  host: 'localhost',
  database: 'migration_db',
  password: 'password',
  port: 5432,
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
connectPostgres({
  log: console.log,
  error: console.error,
}).then((r) => console.log('Postgres data========================:', r));
