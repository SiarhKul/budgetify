// eslint-disable-next-line @typescript-eslint/no-var-requires
const { connectPostgres } = require('../setup/postgres.setup');
module.exports = {
  async up(db, client) {
    const res = await connectPostgres({
      log: console.log,
      error: console.error,
    });
    console.log('Postgres data========================:', res);
  },

  async down(db, client) {},
};
