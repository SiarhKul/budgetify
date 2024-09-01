import { Client } from 'pg';

export const connectPostgres = async () => {
  const dbConfig = {
    user: 'user',
    host: 'localhost',
    database: 'migration_db',
    password: 'password',
    port: 5432,
  };

  const client = new Client(dbConfig);

  client
    .connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');

      client.query(
        `
        CREATE TABLE IF NOT EXISTS cars (
          id SERIAL PRIMARY KEY,
          make VARCHAR(255),
          model VARCHAR(255),
          year INT
        )
      `,
        (err) => {
          if (err) {
            console.error('Error creating table', err);
          } else {
            client.query('SELECT * FROM cars', (err, result) => {
              if (err) {
                console.error('Error executing query', err);
              } else {
                console.log('Query result:', result.rows);
              }

              client
                .end()
                .then(() => {
                  console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                  console.error('Error closing connection', err);
                });
            });
          }
        },
      );
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
};
