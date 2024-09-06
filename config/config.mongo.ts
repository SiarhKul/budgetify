import type { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

export const useFactoryReturn = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  const logger = new Logger('ConfigModule');

  const mongoDbUsername = configService.get<string>('MONGODB_USERNAME');
  const mongoDbPassword = configService.get<string>('MONGODB_PASSWORD');
  const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses`;
  const maskedUri = uri.replace(/\/\/(.*):(.*)@/, '//*****:*****@');

  logger.log(`MongoDB connection string: ${maskedUri}`);

  return {
    connectTimeoutMS: 100000,
    uri,
  };
};
