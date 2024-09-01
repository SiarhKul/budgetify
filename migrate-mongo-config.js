const config = {
  mongodb: {
    url: 'mongodb+srv://admin:12345@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses',

    databaseName: 'test',
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',

  migrationFileExtension: '.js',

  useFileHash: false,

  // Don't change this, unless you know what you're doing
  // moduleSystem: 'commonjs',
};

console.log('=========================', process.env.NODE_ENV);

module.exports = config;
