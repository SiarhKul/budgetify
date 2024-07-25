import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../../schemas/transaction.schema';
import {
  TRANSACTION_DTO_DUMMY,
  TransactionModel,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';
import { TransactionDto } from '../dto/transaction.dto';

const mockTransactionModel = {
  create: jest
    .fn()
    .mockImplementation((transaction: TransactionDto) =>
      Promise.resolve(new TransactionModel(transaction)),
    ),
  findByIdAndDelete: jest.fn(),
};

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should create a transaction', async () => {
    const result = await service.createTransaction(TRANSACTION_DTO_DUMMY);

    expect(result._id).toBeInstanceOf(ObjectId);
  });

  it('should delete a transaction and return it', async () => {
    const transaction = { _id: '1' };
    mockTransactionModel.findByIdAndDelete.mockResolvedValue(transaction);

    const result = await service.deleteTransaction(transaction._id);

    expect(result).toEqual(transaction);
    expect(mockTransactionModel.findByIdAndDelete).toHaveBeenCalledWith(
      transaction._id,
      {
        lean: true,
        select: '_id',
      },
    );
  });

  it('should throw an error when deleting a non-existing transaction', async () => {
    mockTransactionModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.deleteTransaction('1')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockTransactionModel.findByIdAndDelete).toHaveBeenCalledWith('1', {
      lean: true,
      select: '_id',
    });
  });
});
