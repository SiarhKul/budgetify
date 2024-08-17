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
import { MoneyAccount } from '../../schemas/money-account.schema';
import { TransactionType } from '../../ts/transactons/transactions.enums';
import { MoneyAccountService } from '../../money-account/money-account.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

type TMockTransactionModel = {
  [K in keyof typeof TransactionModel]?: jest.Mock;
};
const mockTransactionModel: TMockTransactionModel = {
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

const mockMoneyAccountService: Partial<MoneyAccountService> = {
  subtractOrSumBalance: jest.fn().mockResolvedValue(new MoneyAccount()),
};

describe('GIVEN TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
        {
          provide: MoneyAccountService,
          useValue: mockMoneyAccountService,
        },
        {
          provide: FileUploadService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it.each([
    {
      balance: TRANSACTION_DTO_DUMMY.amount,
      dto: TRANSACTION_DTO_DUMMY,
      testDescription: 'SHOULD increase balance',
    },
    {
      balance: -TRANSACTION_DTO_DUMMY.amount,
      dto: {
        ...TRANSACTION_DTO_DUMMY,
        transactionType: TransactionType.EXPENSES,
      },
      testDescription: 'SHOULD decrease balance',
    },
  ])('$testDescription', async ({ balance, dto }) => {
    const result = await service.createTransaction(dto, []);

    expect(result._id).toBeInstanceOf(ObjectId);

    expect(mockMoneyAccountService.subtractOrSumBalance).toHaveBeenCalledWith(
      TRANSACTION_DTO_DUMMY.accountId,
      balance,
    );
  });

  it('SHOULD return list of transactions', async () => {
    const transactions = await service.getAllTransactions();
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]._id).toBeInstanceOf(ObjectId);
  });

  describe('GIVEN TransactionService.deleteTransaction', () => {
    it('SHOULD delete a transaction and return it', async () => {
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

    it('SHOULD throw an error when deleting a non-existing transaction', async () => {
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

  describe('GIVEN TransactionService.updateTransaction', () => {
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

    it('SHOULD throw an error when updating a non-existing transaction', async () => {
      mockTransactionModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.updateTransaction('1', TRANSACTION_DTO_DUMMY),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
