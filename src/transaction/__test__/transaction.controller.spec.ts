import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { TransactionDto } from '../dto/transaction.dto';
import {
  OBJECT_ID_DUMMY,
  TRANSACTION_DTO_DUMMY,
  TransactionModel,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';

const mockTransactionService: Partial<TransactionService> = {
  createTransaction: jest
    .fn()
    .mockImplementation(
      (transaction: TransactionDto) => new TransactionModel(transaction),
    ),
  deleteTransaction: jest
    .fn()
    .mockImplementation((id: string) => new ObjectId(id)),
  findTransactionByTitle: jest.fn().mockResolvedValue([]),
};

describe('GIVE TransactionController', () => {
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
    const transaction = await controller.create(TRANSACTION_DTO_DUMMY, []);

    expect(transaction.transactionType).toEqual(
      TRANSACTION_DTO_DUMMY.transactionType,
    );
    expect(transaction.title).toEqual(TRANSACTION_DTO_DUMMY.title);
    expect(transaction._id).toBeInstanceOf(ObjectId);
  });

  it('should return a correct mongo objectId ', async () => {
    const transaction = await controller.delete(OBJECT_ID_DUMMY);

    expect(transaction._id).toBeInstanceOf(ObjectId);
  });

  it('should be called with the correct arguments', async () => {
    const DUMMY_SEARCH_TERM = 'dummy_search_term';
    await controller.findTransactionByName({ searchTerm: DUMMY_SEARCH_TERM });

    expect(mockTransactionService.findTransactionByTitle).toHaveBeenCalledWith(
      DUMMY_SEARCH_TERM,
    );
  });
});
