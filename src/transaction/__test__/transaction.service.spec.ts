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
  findByIdAndDelete: jest.fn(),
  create: jest
    .fn()
    .mockImplementation((transaction: TransactionDto) =>
      Promise.resolve(new TransactionModel(transaction)),
    ),
  find: jest
    .fn()
    .mockResolvedValue([new TransactionModel(TRANSACTION_DTO_DUMMY)]),
  findByIdAndUpdate: jest.fn(),
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
    const deleteAbleTransaction = { _id: '1' };
    mockTransactionModel.findByIdAndDelete.mockResolvedValue(
      deleteAbleTransaction,
    );

    const result = await service.deleteTransaction(deleteAbleTransaction._id);

    expect(result).toEqual(deleteAbleTransaction);
    expect(mockTransactionModel.findByIdAndDelete).toHaveBeenCalledWith(
      deleteAbleTransaction._id,
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

  it('should return list of transactions', async () => {
    const transactions = await service.getAllTransactions();
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]._id).toBeInstanceOf(ObjectId);
  });

  it('should return updated transaction', async () => {
    mockTransactionModel.findByIdAndUpdate.mockResolvedValue(
      new TransactionModel(TRANSACTION_DTO_DUMMY),
    );

    const transaction = await service.updateTransaction(
      '1',
      TRANSACTION_DTO_DUMMY,
    );

    expect(transaction._id).toBeInstanceOf(ObjectId);
    expect(mockTransactionModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      TRANSACTION_DTO_DUMMY,
      { new: true },
    );
  });

  it('should throw an error when updating a non-existing transaction', async () => {
    mockTransactionModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(
      service.updateTransaction('1', TRANSACTION_DTO_DUMMY),
    ).rejects.toThrow(NotFoundException);
  });
});
