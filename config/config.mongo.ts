import type { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

export const useFactoryReturn = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  const logger = new Logger('ConfigModule');

  const uri = configService.get<string>('MONGODB_CONNECTION_STRING');

  const maskedUri = uri.replace(/\/\/(.*):(.*)@/, '//*****:*****@');
  logger.log(`MongoDB connection string: ${maskedUri}`);

  return {
    connectTimeoutMS: 100000,
    uri,
  };
};
