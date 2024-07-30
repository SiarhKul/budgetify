import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankService } from '../piggy-bank.service';
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

const mockPiggyBankDepositModel = {
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
  // Arrange, Act and Assert
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
    await service.getAllPiggyBanks();

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
      mockPiggyBankModel.findByIdAndDelete.mockImplementation((id) => {
        const piggyBankModel = new PiggyBankModel(PIGGY_BANK_DTO_DUMMY);
        piggyBankModel._id = id;
        return Promise.resolve(piggyBankModel);
      });

      //Act
      const piggyBank = await service.deletePiggyBank(OBJECT_ID_DUMMY);

      //Assert
      expect(piggyBank._id.toString()).toBe(OBJECT_ID_DUMMY.toString());
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
    it('should throw an error if the id is invalid', async () => {
      //Act and Assert
      await expect(service.getInfoPiggyBank('1')).rejects.toThrow(
        new BadRequestException('Invalid ObjectId'),
      );
    });

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
