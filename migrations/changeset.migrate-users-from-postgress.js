const {  retrieveDataFromPostgres } = require('../setup/postgres.setup');
const {
  mapUserPGDBtoUserMongoDB,
} = require('../src/migrations-manual/migrations-manual');

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

module.exports = {
  async up(db, client) {
    const pgQuery = 'SELECT * FROM users'

    const res = await retrieveDataFromPostgres({
      log: console.log,
      error: console.error,
    },
    dbConfig,
    );
    const userMongoDb = mapUserPGDBtoUserMongoDB(res);
    console.log('Postgres data========================:', res);
  },

  async down(db, client) {},
};
