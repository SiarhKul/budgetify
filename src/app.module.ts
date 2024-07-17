import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
