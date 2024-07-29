import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankService } from '../piggy-bank.service';
import { Model } from 'mongoose';
import { PiggyBankDeposit } from '../../schemas/piggy-bank-deposit.schema';
import {
  PIGGY_BANK_DTO_DUMMY,
  PiggyBankModel,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';
import { getModelToken } from '@nestjs/mongoose';
import { PiggyBank } from '../../schemas/piggy-bank.schema';
import { BadRequestException } from '@nestjs/common';
import { PiggyBankDto } from '../dto/piggy-bank.dto';

const mockPiggyBankModel = {
  // findOne: jest
  //   .fn()
  //   .mockImplementation((dto: PiggyBankDto) =>
  //     Promise.resolve(new PiggyBankModel(dto)),
  //   ),
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  aggregate: jest.fn(),
};

const mockPiggyBankDepositModel: Partial<Model<PiggyBankDeposit>> = {
  create: jest.fn(),
};

describe('GIVEN PiggyBankService', () => {
  let service: PiggyBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PiggyBankService,
        {
          provide: getModelToken(PiggyBank.name),
          useValue: mockPiggyBankModel,
        },
        {
          provide: getModelToken(PiggyBankDeposit.name),
          useValue: mockPiggyBankDepositModel,
        },
      ],
    }).compile();

    service = module.get<PiggyBankService>(PiggyBankService);
  });

  describe('GIVEN PiggyBankService.createBiggyBank', () => {
    it('should create a piggy bank', async () => {
      mockPiggyBankModel.findOne.mockImplementation((dto: PiggyBankDto) =>
        Promise.resolve(new PiggyBankModel(dto)),
      );

      await expect(
        service.createBiggyBank(PIGGY_BANK_DTO_DUMMY),
      ).rejects.toThrow(BadRequestException);

      expect(mockPiggyBankModel.findOne).toHaveBeenCalledWith({
        goal: PIGGY_BANK_DTO_DUMMY.goal,
      });
    });

    it('should create a piggy bank', async () => {
      mockPiggyBankModel.findOne.mockResolvedValue(null);

      const piggyBank = await service.createBiggyBank(PIGGY_BANK_DTO_DUMMY);

      expect(piggyBank._id).toBeInstanceOf(ObjectId);
      expect(mockPiggyBankModel.findOne).toHaveBeenCalledWith(
        PIGGY_BANK_DTO_DUMMY,
      );
    });
  });
});
