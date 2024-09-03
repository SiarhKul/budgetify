// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      url: 'mongodb+srv://admin:12345@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses',
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
