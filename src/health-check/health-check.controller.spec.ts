import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

const fakeHealthCheckService: Partial<HealthCheckService> = {
  getHealthCheck: jest.fn(),
};

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: fakeHealthCheckService,
        },
      ],
    }).compile();

    controller = module.get(HealthCheckController);
  });

  it('should be defined', () => {
    controller.getHealthCheck();
    expect(fakeHealthCheckService.getHealthCheck).toHaveBeenCalled();
  });
});
