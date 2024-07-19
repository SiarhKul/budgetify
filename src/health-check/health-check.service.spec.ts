import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';

describe('GIVEN HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();

    service = module.get(HealthCheckService);
  });

  it('should be defined', () => {
    const callServiceResult = service.getHealthCheck();
    expect(callServiceResult).toBe('Server is up and running');
  });
});
