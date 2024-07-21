import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { TransactionDto } from '../dto/transaction.dto';
import { Categories, TransactionType } from '../../enums/common';
import { Transaction } from '../../schemas/transaction.schema';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    const incomingTransactionModel = {
      transactionType: TransactionType.INCOME,
      title: 'some title',
      categories: Categories.HOME,
      amount: 1,
      paymentDate: '2023-07-19T00:00:00.000Z',
      payee: 'Jone Doe',
      description: 'dummy description',
    };
    const dto = new TransactionDto();

    expect(service).toBeDefined();
  });
});
