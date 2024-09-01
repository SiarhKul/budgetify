import { ENVs, getEnv } from './utils/env-util';

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

const config =
  envConfigs[getEnv()] ||
  (() => {
    throw new Error('Invalid environment');
  })();

export default config;
