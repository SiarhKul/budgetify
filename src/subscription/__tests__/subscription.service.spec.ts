import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../subscription.service';
import { getModelToken } from '@nestjs/mongoose';
import { Subscription } from '../../schemas/subscription.schema';
import {
  SUBSCRIPTION_DOCUMENT_DUMMY,
  SUBSCRIPTION_DTO_DUMMY,
  SUBSCRIPTION_ID_DUMMY,
} from '../../helpers/tests/doubles';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';
import { MoneyAccountService } from '../../money-account/money-account.service';

const mockSubscriptionModel = {
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

const mockAccountService = {
  subtractOrSumBalance: jest.fn(),
};
describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let accountService: MoneyAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getModelToken(Subscription.name),
          useValue: mockSubscriptionModel,
        },
        {
          provide: MoneyAccountService,
          useValue: mockAccountService,
        },
      ],
    }).compile();

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
    accountService = module.get<MoneyAccountService>(MoneyAccountService);
  });

  it('creates a subscription and updates account balance', async () => {
    //Act
    await subscriptionService.create(SUBSCRIPTION_DTO_DUMMY);

    //Assert
    expect(accountService.subtractOrSumBalance).toHaveBeenCalledWith(
      SUBSCRIPTION_DTO_DUMMY.accountId,
      -SUBSCRIPTION_DTO_DUMMY.amount,
    );
    expect(mockSubscriptionModel.create).toHaveBeenCalledWith(
      SUBSCRIPTION_DTO_DUMMY,
    );
  });

  describe('GIVEN SubscriptionService.findOne', () => {
    it('finds a subscription by id', async () => {
      //Arrange
      mockSubscriptionModel.findById.mockReturnValue(
        SUBSCRIPTION_DOCUMENT_DUMMY,
      );

      //Act
      const result = await subscriptionService.findOne(SUBSCRIPTION_ID_DUMMY);

      //Assert
      expect(mockSubscriptionModel.findById).toHaveBeenCalledWith(
        SUBSCRIPTION_ID_DUMMY,
      );
      expect(result._id).toBeInstanceOf(ObjectId);
    });

    it('throws an error when no subscription is found by id', async () => {
      //Arrange
      mockSubscriptionModel.findById.mockReturnValue(null);

      //Act and Assert
      await expect(
        subscriptionService.findOne(SUBSCRIPTION_ID_DUMMY),
      ).rejects.toThrow(NotFoundException);
    });
  });

  it('removes a subscription by id', async () => {
    //Arrange
    mockSubscriptionModel.findByIdAndDelete.mockReturnValue(
      SUBSCRIPTION_DOCUMENT_DUMMY,
    );

    //Act
    const result = await subscriptionService.remove(SUBSCRIPTION_ID_DUMMY);

    //Assert
    expect(mockSubscriptionModel.findByIdAndDelete).toHaveBeenCalledWith(
      SUBSCRIPTION_ID_DUMMY,
    );
    expect(result._id).toBeInstanceOf(ObjectId);
  });

  it('updates a subscription', async () => {
    //Arrange
    mockSubscriptionModel.findByIdAndUpdate.mockResolvedValueOnce(
      SUBSCRIPTION_DOCUMENT_DUMMY,
    );

    //Act
    const result = await subscriptionService.update(
      SUBSCRIPTION_ID_DUMMY,
      SUBSCRIPTION_DTO_DUMMY,
    );
    //Assert
    expect(result._id).toBeInstanceOf(ObjectId);
    expect(mockSubscriptionModel.findByIdAndUpdate).toHaveBeenCalledWith(
      SUBSCRIPTION_ID_DUMMY,
      SUBSCRIPTION_DTO_DUMMY,
      { new: true },
    );
  });
});
