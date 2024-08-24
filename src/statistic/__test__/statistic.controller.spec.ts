import { Test, TestingModule } from '@nestjs/testing';
import { StatisticController } from '../statistic.controller';
import { StatisticService } from '../statistic.service';
import { GetStatisticByDateDto } from '../dto/get-statistic-by-date.dto';
import { ACCOUNT_ID_DUMMY } from '../../helpers/tests/doubles';

const mockStatisticService = {
  getStatisticByDate: jest.fn(),
  retrieveMonthlyStatistic: jest.fn(),
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

  it('SHOULD getStatisticByDate be called with correct arguments', async () => {
    const DUMMY_BODY: GetStatisticByDateDto = {
      startDate: new Date(),
      endDate: new Date(),
      totalExpenses: 150,
    };

    await controller.getStatisticByDate(ACCOUNT_ID_DUMMY, DUMMY_BODY);

    expect(service.getStatisticByDate).toHaveBeenCalledWith(
      DUMMY_BODY.startDate,
      DUMMY_BODY.endDate,
      DUMMY_BODY.totalExpenses,
      ACCOUNT_ID_DUMMY,
    );
  });

  it('SHOULD retrieveMonthlyStatistic be called with correct arguments', async () => {
    const DUMMY_BODY = {
      startDate: new Date(),
      endDate: new Date(),
      accountId: ACCOUNT_ID_DUMMY,
    };

    await controller.retrieveMonthlyStatistic(DUMMY_BODY);

    expect(service.retrieveStatisticsByDateRange).toHaveBeenCalledWith(
      DUMMY_BODY,
    );
  });
});
