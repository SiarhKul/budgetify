import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AccountService } from '../account.service';
import { AccountDto } from '../dto/account.dto';
import { Currency } from '../../ts/account/account.enum';
import { Account } from '../../schemas/account.schema';
import { getModelToken } from '@nestjs/mongoose';
import {
  ACCOUNT_ID_DUMMY,
  AccountModel,
  USER_ID_DUMMY,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';

const ACCOUNT_DTO: AccountDto = {
  title: 'Test Account',
  description: 'This is a test account',
  currency: Currency.EUR,
  userId: USER_ID_DUMMY,
};

const mockAccountModel = {
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  find: jest.fn(),
};

describe('GIVEN AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getModelToken(Account.name),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('SHOULD create an account', async () => {
    // Arrange
    mockAccountModel.create.mockResolvedValue(ACCOUNT_DTO);

    // Act
    const result = await service.createAccount(ACCOUNT_DTO);

    // Assert
    expect(result).toBe(ACCOUNT_DTO);
    expect(mockAccountModel.create).toHaveBeenCalledWith(ACCOUNT_DTO);
  });

  describe('GIVEN updateAccount method', () => {
    it('should throw an error when updating a non-existing account', async () => {
      //Act
      mockAccountModel.findOneAndUpdate.mockResolvedValue(null);

      //Assert
      await expect(
        service.updateAccount(USER_ID_DUMMY, ACCOUNT_DTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('SHOULD updateAccount method returns correct data', async () => {
      //Arrange
      mockAccountModel.findOneAndUpdate.mockImplementation(
        (accountDto: AccountDto) => {
          return Promise.resolve(new AccountModel(accountDto));
        },
      );

      //Act
      const result = await service.updateAccount(ACCOUNT_ID_DUMMY, ACCOUNT_DTO);

      //Assert
      expect(mockAccountModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: ACCOUNT_ID_DUMMY },
        ACCOUNT_DTO,
        { new: true },
      );

      expect(result._id).toBeInstanceOf(ObjectId);
    });
  });

  describe('GIVEN deleteAccount method', () => {
    it('should delete an account', async () => {
      // Arrange
      const accountDto: Account = {
        balance: 0,
        title: 'Deleted Account',
        description: 'This is a deleted account',
        currency: Currency.EUR,
        userId: new ObjectId(USER_ID_DUMMY),
      };

      mockAccountModel.findOneAndDelete.mockResolvedValue(
        new AccountModel(accountDto),
      );

      //Act
      const result = await service.deleteAccount(ACCOUNT_ID_DUMMY);

      // Assert
      expect(result._id).toBeInstanceOf(ObjectId);
    });

    it('should throw an error when deleting a non-existing account', async () => {
      //Arrange
      mockAccountModel.findOneAndDelete.mockResolvedValue(null);

      //Act and Assert
      await expect(service.deleteAccount(ACCOUNT_ID_DUMMY)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should get all accounts', async () => {
    //Arrange
    mockAccountModel.find.mockResolvedValue([ACCOUNT_DTO]);
    //Act
    const result = await service.getAccounts(USER_ID_DUMMY);

    //Assert
    expect(result).toEqual([ACCOUNT_DTO]);
    expect(mockAccountModel.find).toHaveBeenCalledWith({
      userId: USER_ID_DUMMY,
    });
  });
});
