import { Injectable } from '@nestjs/common';
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
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,

    private readonly accountService: AccountService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    await this.accountService.subtractOrSumBalance(
      createSubscriptionDto.accountId,
      -createSubscriptionDto.amount,
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
