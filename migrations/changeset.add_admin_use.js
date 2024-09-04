module.exports = {
  async up(db, client) {
    await db.collection('admins').insertOne({
      name: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@mail.com',
    });
  },

  async down(db, client) {
    await db.collection('admins').deleteOne({ email: 'JohnDoe@mail.com' });
  },
};
