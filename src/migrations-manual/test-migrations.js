// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const dbConfig = {
  user: 'user',
  host: 'localhost',
  database: 'migration_db',
  password: 'password',
  port: 5432,
};

const DB_QUERY = 'SELECT * FROM users';

const retrieveDataFromPostgres = async () => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    const result = await client.query(DB_QUERY);
    console.log('Query result:', result.rows);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    try {
      await client.end();
      console.log('Connection to PostgreSQL closed');
    } catch (err) {
      console.error('Error closing connection', err);
    }
  }
};

retrieveDataFromPostgres().then((r) =>
  console.log('Postgres data========================:', r),
);
