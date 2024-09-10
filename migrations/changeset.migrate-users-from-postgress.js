const { retrieveDataFromPostgres } = require('../setup/postgres.setup');

const pgQuery = 'SELECT * FROM users';

/**
 * Maps an array of Postgres users to MongoDB users format.
 *
 * @param {IUserPGDB[]} pgUsers - The array of users from the Postgres database.
 * @returns {User[]} - The array of users formatted for MongoDB.
 */
const mapToMongoDbUsers = (pgUsers) => {
  return pgUsers.map((userFromPGDB) => ({
    email: userFromPGDB.email,
    password: userFromPGDB.password,
  }));
};

module.exports = {
  async up(db, client) {

    const pgUsers = await retrieveDataFromPostgres(pgQuery);
    const mongoDbUsers =mapToMongoDbUsers(pgUsers)
    console.log('pgUsers', pgUsers);
    console.log('mongoDbUsers',mongoDbUsers)
  },

  async down(db, client) {
  },
};
