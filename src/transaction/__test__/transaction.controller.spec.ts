import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { TransactionDto } from '../dto/transaction.dto';
import { Categories, TransactionType } from '../../enums/common';
import { ObjectId } from 'mongodb';
import { Transaction } from '../../schemas/transaction.schema';

const TRANSACTION_DTO: TransactionDto = {
  transactionType: TransactionType.INCOME,
  title: 'some title',
  categories: Categories.HOME,
  amount: 1,
  paymentDate: new Date(),
  payee: 'Jon Doe',
  description: 'Describe',
};

const TRANSACTION_MODEL = {
  ...TRANSACTION_DTO,
  _id: new ObjectId(),
};

const mockTransactionService: Partial<TransactionService> = {
  createTransaction: jest
    .fn()
    .mockImplementation((transaction: TransactionDto) => {
      const newTransaction = new Transaction();
      Object.assign(newTransaction, transaction);

      return { ...newTransaction, _id: TRANSACTION_MODEL._id };
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
    const resCall = await controller.create(TRANSACTION_DTO);

    expect(resCall).toEqual(TRANSACTION_MODEL);
  });
});
