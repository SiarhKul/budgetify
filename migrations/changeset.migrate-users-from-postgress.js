const { retrieveDataFromPostgres } = require('../setup/postgres.setup');
const { mapUserPGDBtoUserMongoDB } = require('../src/migrations-manual/migrations-manual');


const pgQuery = 'SELECT * FROM users';

module.exports = {
  async up(db, client) {

    const res = await retrieveDataFromPostgres(pgQuery);
    const userMongoDb = mapUserPGDBtoUserMongoDB(res);
    console.log('Postgres data========================:', res);
    console.log('mapped data --------------------', userMongoDb);
  },

  async down(db, client) {
  },
};
