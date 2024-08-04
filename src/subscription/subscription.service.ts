import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from '../schemas/subscription.schema';
import { Model } from 'mongoose';
import { Account } from '../schemas/account.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,

    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    await this.accountModel.findOneAndUpdate(
      {
        _id: createSubscriptionDto.accountId,
      },
      {
        $inc: {
          balance: -createSubscriptionDto.amount,
        },
      },
      {
        new: true,
      },
    );

    return this.subscriptionModel.create(createSubscriptionDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
