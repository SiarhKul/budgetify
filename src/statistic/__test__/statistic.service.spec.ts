import { Test, TestingModule } from '@nestjs/testing';
import { StatisticService } from '../statistic.service';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from '../../schemas/transaction.schema';
import { CategoriesStatistic } from '../../ts/statistic/statistic.interface';
import { ObjectId } from 'mongodb';
import {
  ACCOUNT_ID_DUMMY,
  TransactionModel,
} from '../../helpers/tests/doubles';
import { Categories } from '../../ts/transactons/transactions.enums';

type TMockTransactionModel = {
  [K in keyof typeof TransactionModel]?: jest.Mock;
};

const mockTransactionModel: TMockTransactionModel = {
  aggregate: jest.fn().mockResolvedValue([]),
};

describe('GIVEN StatisticService', () => {
  let service: StatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<StatisticService>(StatisticService);
  });

  it('returns categorized amounts under total expenses', async () => {
    //Arrange
    const selectedTransactionByDate: CategoriesStatistic[] = [
      { _id: new ObjectId(), amount: 50, category: Categories.HOME },
      { _id: new ObjectId(), amount: 100, category: Categories.RENT },
    ];

    mockTransactionModel.aggregate.mockResolvedValue(selectedTransactionByDate);

    //Act
    const result = await service.getStatisticByDate(
      new Date(),
      new Date(),
      200,
      ACCOUNT_ID_DUMMY,
    );

    //Assert
    expect(result).toEqual({
      sum: 150,
      [Categories.HOME]: 50,
      [Categories.RENT]: 100,
      totalExpenses: 200,
    });
  });

  it('handles empty transaction list', async () => {
    //Arrange
    mockTransactionModel.aggregate.mockResolvedValue([]);

    //Act
    const result = await service.getStatisticByDate(
      new Date(),
      new Date(),
      200,
      '1234567890',
    );

    //Assert
    expect(result).toEqual({ sum: 0, totalExpenses: 200 });
  });
});
