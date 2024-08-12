import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from '../schemas/subscription.schema';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../schemas/money-account.schema';
import { MoneyAccountService } from '../money-account/money-account.service'; // import AccountModule

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
      {
        name: MoneyAccount.name,
        schema: MoneyAccountSchema,
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, MoneyAccountService],
})
export class SubscriptionModule {}
