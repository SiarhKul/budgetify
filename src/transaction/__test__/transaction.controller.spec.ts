import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { TransactionDto } from '../dto/transaction.dto';
import {
  TRANSACTION_DTO_DUMMY,
  TransactionModel,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';

const mockTransactionService: Partial<TransactionService> = {
  createTransaction: jest
    .fn()
    .mockImplementation((transaction: TransactionDto) => {
      return new TransactionModel(transaction);
    }),
};

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get(TransactionController);
  });

  it('should return the created transaction when valid data is provided', async () => {
    const transaction = await controller.create(TRANSACTION_DTO_DUMMY);

    expect(transaction.transactionType).toEqual(
      TRANSACTION_DTO_DUMMY.transactionType,
    );
    expect(transaction.title).toEqual(TRANSACTION_DTO_DUMMY.title);
    expect(transaction._id).toBeInstanceOf(ObjectId);
  });
});
