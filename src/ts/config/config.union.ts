import getAppParameters from '../../../config/config.parameters';

export type TParameters = ReturnType<typeof getAppParameters>;

export type TEnvVar = {
  MONGODB_USERNAME: string;
  MONGODB_PASSWORD: string;
  JWT_SECRET: string;
};

export type TConfig = TParameters & TEnvVar;
