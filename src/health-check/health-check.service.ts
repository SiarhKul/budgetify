import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHealthCheck() {
    return 'Server is up and running';
  }
  getConnectionToDB(): string[] {
    return ['fake connection'];
  }
}
