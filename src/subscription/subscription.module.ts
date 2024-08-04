import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from '../schemas/subscription.schema';
import { Account, AccountSchema } from '../schemas/account.schema';
import { AccountService } from '../account/account.service'; // import AccountModule

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, AccountService],
})
export class SubscriptionModule {}
