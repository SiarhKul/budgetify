import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../../schemas/transaction.schema';
import { getModelToken } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {
  TRANSACTION_DTO_DUMMY,
  TransactionModel,
} from '../../helpers/tests/doubles';

class FakeTransactionModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});

  save = jest
    .fn()
    .mockResolvedValue(new TransactionModel(TRANSACTION_DTO_DUMMY));
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          useValue: FakeTransactionModel,
          provide: getModelToken(Transaction.name),
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should create a transaction successfully', async () => {
    const {
      _id,
      transactionType,
      title,
      categories,
      amount,
      payee,
      description,
    } = await service.createTransaction(TRANSACTION_DTO_DUMMY);

    expect(transactionType).toEqual(TRANSACTION_DTO_DUMMY.transactionType);
    expect(title).toEqual(TRANSACTION_DTO_DUMMY.title);
    expect(categories).toEqual(TRANSACTION_DTO_DUMMY.categories);
    expect(amount).toEqual(TRANSACTION_DTO_DUMMY.amount);
    expect(payee).toEqual(TRANSACTION_DTO_DUMMY.payee);
    expect(description).toEqual(TRANSACTION_DTO_DUMMY.description);

    expect(_id).toBeInstanceOf(ObjectId);
  });
});
