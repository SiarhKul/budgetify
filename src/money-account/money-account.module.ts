import { Module } from '@nestjs/common';
import { AccountController } from './money-account.controller';
import { MoneyAccountService } from './money-account.service';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  controllers: [AccountController],
  providers: [MoneyAccountService],
})
export class MoneyAccountModule {}
