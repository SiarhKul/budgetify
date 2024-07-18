import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckService } from './health-check/health-check.service';

@Module({
  imports: [],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, HealthCheckService],
})
export class AppModule {}
