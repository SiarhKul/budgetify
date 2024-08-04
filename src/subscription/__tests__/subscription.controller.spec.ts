import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from '../subscription.controller';
import { SubscriptionService } from '../subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { Categories } from '../../ts/transactons/transactions.enums';
import {
  SUBSCRIPTION_DTO_DUMMY,
  SUBSCRIPTION_ID_DUMMY,
  SubscriptionsModel,
} from '../../helpers/tests/doubles';

const mockSubscriptionService = {
  create: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
};

describe('SubscriptionController', () => {
  let controller: SubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        {
          provide: SubscriptionService,
          useValue: mockSubscriptionService,
        },
      ],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
  });

  it('should create a subscription', async () => {
    //Arrange
    mockSubscriptionService.create.mockResolvedValueOnce(
      new SubscriptionsModel(SUBSCRIPTION_DTO_DUMMY),
    );

    //Act
    await controller.create(SUBSCRIPTION_DTO_DUMMY);

    //Assert
    expect(mockSubscriptionService.create).toHaveBeenCalledWith(
      SUBSCRIPTION_DTO_DUMMY,
    );
  });

  it('should find a subscription by id', async () => {
    //Arrange
    mockSubscriptionService.findOne.mockResolvedValueOnce(
      new SubscriptionsModel(SUBSCRIPTION_DTO_DUMMY),
    );

    //Act
    await controller.findOne(SUBSCRIPTION_ID_DUMMY);

    //Assert
    expect(mockSubscriptionService.findOne).toHaveBeenCalledWith(
      SUBSCRIPTION_ID_DUMMY,
    );
  });

  it('should remove a subscription by id', async () => {
    //Arrange
    mockSubscriptionService.remove.mockResolvedValueOnce(
      new SubscriptionsModel(SUBSCRIPTION_DTO_DUMMY),
    );

    //Act
    await controller.remove(SUBSCRIPTION_ID_DUMMY);

    //Assert
    expect(mockSubscriptionService.remove).toHaveBeenCalledWith(
      SUBSCRIPTION_ID_DUMMY,
    );
  });

  it('should update a subscription', async () => {
    //Arrange
    mockSubscriptionService.update.mockResolvedValueOnce(
      new SubscriptionsModel(SUBSCRIPTION_DTO_DUMMY),
    );
    //Act
    await controller.update(SUBSCRIPTION_ID_DUMMY, SUBSCRIPTION_DTO_DUMMY);
    //Assert
    expect(mockSubscriptionService.update).toHaveBeenCalledWith(
      SUBSCRIPTION_ID_DUMMY,
      SUBSCRIPTION_DTO_DUMMY,
    );
  });
});
