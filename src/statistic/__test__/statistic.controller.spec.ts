import { Test, TestingModule } from '@nestjs/testing';
import { StatisticController } from '../statistic.controller';
import { StatisticService } from '../statistic.service';
import { GetStatisticByDateDto } from '../dto/get-statistic-by-date.dto';
import { ObjectId } from 'mongodb';

const mockStatisticService = {
  getStatisticByDate: jest.fn(),
};

describe('GIVEN StatisticController', () => {
  let controller: StatisticController;
  let service: StatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticController],
      providers: [
        {
          provide: StatisticService,
          useValue: mockStatisticService,
        },
      ],
    }).compile();

    controller = module.get<StatisticController>(StatisticController);
    service = module.get<StatisticService>(StatisticService);
  });

  it('SHOULD controller be called with correct arguments', async () => {
    const id = new ObjectId().toHexString();
    const body: GetStatisticByDateDto = {
      startDate: new Date(),
      endDate: new Date(),
      totalExpenses: 150,
    };

    await controller.getStatisticByDate(id, body);

    expect(service.getStatisticByDate).toHaveBeenCalledWith(
      body.startDate,
      body.endDate,
      body.totalExpenses,
      id,
    );
  });
});
