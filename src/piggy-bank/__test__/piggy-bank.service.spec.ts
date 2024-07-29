import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankService } from '../piggy-bank.service';
import { Model } from 'mongoose';
import { PiggyBankDeposit } from '../../schemas/piggy-bank-deposit.schema';
import {
  OBJECT_ID_DUMMY,
  PIGGY_BANK_DEPOSIT_DTO_DUMMY,
  PIGGY_BANK_DTO_DUMMY,
  PiggyBankDepositModel,
  PiggyBankModel,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';
import { getModelToken } from '@nestjs/mongoose';
import { PiggyBank } from '../../schemas/piggy-bank.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PiggyBankDto } from '../dto/piggy-bank.dto';

import { PiggyBankDepositDto } from '../dto/piggy-bank-deposit.dto';

const mockPiggyBankModel = {
  findOne: jest.fn(),
  create: jest
    .fn()
    .mockImplementation((piggyBank: PiggyBankDto) =>
      Promise.resolve(new PiggyBankModel(piggyBank)),
    ),
  find: jest.fn().mockReturnValue({
    populate: jest.fn(),
  }),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  aggregate: jest.fn(),
};

const mockPiggyBankDepositModel: Partial<Model<PiggyBankDeposit>> = {
  create: jest.fn().mockImplementation((dto: PiggyBankDepositDto) => {
    const piggyBankDeposit = new PiggyBankDepositModel(dto);
    piggyBankDeposit._id = new ObjectId(OBJECT_ID_DUMMY);
    return Promise.resolve(piggyBankDeposit);
  }),
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
    it('should throw the exception if piggy bank is created', async () => {
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
      expect(mockPiggyBankModel.findOne).toHaveBeenCalledWith({
        goal: PIGGY_BANK_DTO_DUMMY.goal,
      });
      expect(mockPiggyBankModel.create).toHaveBeenCalledWith(
        PIGGY_BANK_DTO_DUMMY,
      );
    });
  });

  it('should getAllPiggyBanks be called with "deposit"', async () => {
    await service.getAllPiggyBanks();

    expect(mockPiggyBankModel.find().populate).toHaveBeenCalledWith('deposits');
  });

  it('updatePiggyBank should be called with the correct arguments', async () => {
    mockPiggyBankModel.findByIdAndUpdate.mockImplementation((id, dto) =>
      Promise.resolve(new PiggyBankModel(dto)),
    );

    const piggyBankUpdated = await service.updatePiggyBank(
      OBJECT_ID_DUMMY,
      PIGGY_BANK_DTO_DUMMY,
    );

    expect(piggyBankUpdated._id).toBeInstanceOf(ObjectId);
    expect(mockPiggyBankModel.findByIdAndUpdate).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
      PIGGY_BANK_DTO_DUMMY,
      { new: true },
    );
  });

  it('updatePiggyBank should throw the exception', async () => {
    mockPiggyBankModel.findByIdAndUpdate.mockResolvedValue(null);
    await expect(
      service.updatePiggyBank(OBJECT_ID_DUMMY, PIGGY_BANK_DTO_DUMMY),
    ).rejects.toThrow(NotFoundException);
  });

  describe('GIVEN PiggyBank.deletePiggyBank', () => {
    it('should deletePiggyBank delete piggy bank by an Id', async () => {
      mockPiggyBankModel.findByIdAndDelete.mockImplementation((id) => {
        const piggyBankModel = new PiggyBankModel(PIGGY_BANK_DTO_DUMMY);
        piggyBankModel._id = id;
        return Promise.resolve(piggyBankModel);
      });

      const piggyBank = await service.deletePiggyBank(OBJECT_ID_DUMMY);
      expect(piggyBank._id.toString()).toBe(OBJECT_ID_DUMMY.toString());
    });

    it('should deletePiggyBank throw the exception', () => {
      mockPiggyBankModel.findByIdAndDelete.mockResolvedValue(null);

      expect(service.deletePiggyBank(OBJECT_ID_DUMMY)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should ', async () => {
    mockPiggyBankModel.findByIdAndUpdate.mockReturnValue({});

    await service.depositToPiggyBank(PIGGY_BANK_DEPOSIT_DTO_DUMMY);

    expect(mockPiggyBankDepositModel.create).toHaveBeenCalledWith(
      PIGGY_BANK_DEPOSIT_DTO_DUMMY,
    );
    expect(mockPiggyBankModel.findByIdAndUpdate).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
      { $push: { deposits: new ObjectId(OBJECT_ID_DUMMY) } },
      { new: true, useFindAndModify: false },
    );
  });
});
