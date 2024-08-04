import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from '../schemas/subscription.schema';
import { Model } from 'mongoose';
import { AccountService } from '../account/account.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly accountService: AccountService,

    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    await this.accountService.subtractOrSumBalance(
      createSubscriptionDto.accountId,
      -createSubscriptionDto.amount,
    );

    return this.subscriptionModel.create(createSubscriptionDto);
  }

  async findOne(id: string): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findById(id);

    if (!subscription) {
      throw new NotFoundException('No subscription found with the given id');
    }

    return subscription;
  }

  async remove(id: string): Promise<SubscriptionDocument> {
    const deletedSubscription =
      await this.subscriptionModel.findByIdAndDelete(id);

    if (!deletedSubscription) {
      throw new NotFoundException('No subscription found with the given id');
    }

    return deletedSubscription;
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    const updatedSubscription = await this.subscriptionModel.findByIdAndUpdate(
      id,
      updateSubscriptionDto,
      {
        new: true,
      },
    );

    if (!updatedSubscription) {
      throw new NotFoundException('No subscription found with the given id');
    }
    return updatedSubscription;
  }
}
