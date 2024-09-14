const { ENVs, getEnv } = require('./utils/env-util');

const baseConfig = {
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};

const envConfigs = {
  [ENVs.dev]: {
    ...baseConfig,
    mongodb: {
      url: 'mongodb://admin:12345@localhost:27017/',
      databaseName: 'test',
    },
  },
  [ENVs.test]: {
    ...baseConfig,
    mongodb: {
      url: '',
      databaseName: '',
    },
  },
  [ENVs.prod]: {
    ...baseConfig,
    mongodb: {
      url: '',
      databaseName: '',
    },
  },
};

const migrateMongoConfig =
  envConfigs[getEnv()] ||
  (() => {
    throw new Error('Invalid environment');
  })();

module.exports = {
  migrateMongoConfig,
};
