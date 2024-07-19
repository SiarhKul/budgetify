import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHealthCheck() {
    return 'Server up and running';
  }
  getConnectionToDB(): string[] {
    return ['fake connection'];
  }
}
