import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private heathCheckService: HealthCheckService) {}

  @Get()
  getHealthCheck() {
    return this.heathCheckService.getHealthCheck();
  }
}
