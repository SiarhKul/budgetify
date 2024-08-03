import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankService } from '../piggy-bank.service';
import { PiggyBankDeposit } from '../../schemas/piggy-bank-deposit.schema';
import {
  ACCOUNT_ID_DUMMY,
  OBJECT_ID_DUMMY,
  PIGGY_BANK_DEPOSIT_DTO_DUMMY,
  PIGGY_BANK_DTO_DUMMY,
  PIGGY_BANK_ID_DUMMY,
  PiggyBankDepositModel,
  PiggyBankModel,
  USER_ID_DUMMY,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';
import { getModelToken } from '@nestjs/mongoose';
import { PiggyBank } from '../../schemas/piggy-bank.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PiggyBankDto } from '../dto/piggy-bank.dto';

import { PiggyBankDepositDto } from '../dto/piggy-bank-deposit.dto';
import { Account } from '../../schemas/account.schema';

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

const mockPiggyBankDepositModel = {
  create: jest.fn(),
};

const mockAccountModel = {
  findOneAndUpdate: jest.fn(),
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
        {
          provide: getModelToken(Account.name),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    service = module.get<PiggyBankService>(PiggyBankService);
  });

  describe('GIVEN createBiggyBank', () => {
    it('should throw the exception if piggy bank is created', async () => {
      //Arrange
      mockPiggyBankModel.findOne.mockImplementation((dto: PiggyBankDto) =>
        Promise.resolve(new PiggyBankModel(dto)),
      );

      //Act
      await expect(
        service.createBiggyBank(PIGGY_BANK_DTO_DUMMY),
      ).rejects.toThrow(BadRequestException);

      //Assert
      expect(mockPiggyBankModel.findOne).toHaveBeenCalledWith({
        goal: PIGGY_BANK_DTO_DUMMY.goal,
      });
    });

    it('should create a piggy bank', async () => {
      //Arrange
      mockPiggyBankModel.findOne.mockResolvedValue(null);

      //Act
      const piggyBank = await service.createBiggyBank(PIGGY_BANK_DTO_DUMMY);

      //Assert
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
    //Act
    await service.getAllPiggyBanks(USER_ID_DUMMY);

    //Assert
    expect(mockPiggyBankModel.find().populate).toHaveBeenCalledWith('deposits');
  });

  it('updatePiggyBank should be called with the correct arguments', async () => {
    //Arrange
    mockPiggyBankModel.findByIdAndUpdate.mockImplementation((id, dto) =>
      Promise.resolve(new PiggyBankModel(dto)),
    );

    //Act
    const piggyBankUpdated = await service.updatePiggyBank(
      OBJECT_ID_DUMMY,
      PIGGY_BANK_DTO_DUMMY,
    );

    //Assert
    expect(piggyBankUpdated._id).toBeInstanceOf(ObjectId);
    expect(mockPiggyBankModel.findByIdAndUpdate).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
      PIGGY_BANK_DTO_DUMMY,
      { new: true },
    );
  });

  it('updatePiggyBank should throw the exception', async () => {
    //Arrange
    mockPiggyBankModel.findByIdAndUpdate.mockResolvedValue(null);

    //Act and Assert
    await expect(
      service.updatePiggyBank(OBJECT_ID_DUMMY, PIGGY_BANK_DTO_DUMMY),
    ).rejects.toThrow(NotFoundException);
  });

  describe('GIVEN deletePiggyBank', () => {
    it('should deletePiggyBank delete piggy bank by an Id', async () => {
      //Arrange
      mockPiggyBankModel.findByIdAndDelete.mockResolvedValue({
        _id: OBJECT_ID_DUMMY,
        userId: USER_ID_DUMMY,
        accountId: ACCOUNT_ID_DUMMY,
        goal: '789',
        goalAmount: 876,
        deposits: [
          new PiggyBankDepositModel({
            piggyBankId: PIGGY_BANK_ID_DUMMY,
            amountToSave: 1,
            date: new Date(),
          }),
          new PiggyBankDepositModel({
            piggyBankId: PIGGY_BANK_ID_DUMMY,
            amountToSave: 2,
            date: new Date(),
          }),
        ],
      });
      //Act
      const deletedPiggyBank = await service.deletePiggyBank(OBJECT_ID_DUMMY);

      //Assert
      expect(deletedPiggyBank._id.toString()).toBe(OBJECT_ID_DUMMY.toString());
      expect(mockAccountModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: deletedPiggyBank.accountId,
        },
        { balance: 3 },
      );
    });

    it('should deletePiggyBank throw the exception', () => {
      //Arrange
      mockPiggyBankModel.findByIdAndDelete.mockResolvedValue(null);

      //Act and Assert
      expect(service.deletePiggyBank(OBJECT_ID_DUMMY)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should depositToPiggyBank deposits to piggy bank', async () => {
    //Arrange
    const ID_DUMMY = new ObjectId(OBJECT_ID_DUMMY);

    mockPiggyBankModel.findByIdAndUpdate.mockReturnValue({});
    mockPiggyBankDepositModel.create.mockImplementation(
      (dto: PiggyBankDepositDto) => {
        const piggyBankDeposit = new PiggyBankDepositModel(dto);
        piggyBankDeposit._id = ID_DUMMY;
        return Promise.resolve(piggyBankDeposit);
      },
    );

    //Act
    await service.depositToPiggyBank(PIGGY_BANK_DEPOSIT_DTO_DUMMY);

    //Assert
    expect(mockPiggyBankDepositModel.create).toHaveBeenCalledWith(
      PIGGY_BANK_DEPOSIT_DTO_DUMMY,
    );
    expect(mockPiggyBankModel.findByIdAndUpdate).toHaveBeenCalledWith(
      ID_DUMMY,
      { $push: { deposits: ID_DUMMY } },
      { new: true, useFindAndModify: false },
    );
  });

  describe('GIVEN getInfoPiggyBank', () => {
    it('should return the piggy bank info', async () => {
      //Arrange
      const DUMMY_INFO_PIGGY_BANK = {
        _id: OBJECT_ID_DUMMY,
        goal: 'House',
        goalAmount: 100,
        sumCom: 2,
      };

      mockPiggyBankModel.aggregate.mockResolvedValue([DUMMY_INFO_PIGGY_BANK]);

      //Act
      const info = await service.getInfoPiggyBank(OBJECT_ID_DUMMY);

      //Assert
      expect(info).toEqual(DUMMY_INFO_PIGGY_BANK);
    });

    it('should return the piggy bank info', async () => {
      //Arrange
      mockPiggyBankModel.aggregate.mockResolvedValue([]);

      //Act and Assert
      await expect(service.getInfoPiggyBank(OBJECT_ID_DUMMY)).rejects.toThrow(
        new NotFoundException('No piggy bank found with the given id'),
      );
    });
  });
});
