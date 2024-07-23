import type { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const useFactoryReturn = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  const mongoDbUsername = configService.get<string>('MONGODB_USERNAME');
  const mongoDbPassword = configService.get<string>('MONGODB_PASSWORD');
  const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses`;

  return {
    uri,
  };
};
