import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MoneyAccountService } from '../money-account/money-account.service';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, MoneyAccountService],
})
export class SubscriptionModule {}
