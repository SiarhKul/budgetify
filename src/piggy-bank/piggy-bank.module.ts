import { Module } from '@nestjs/common';
import { PiggyBankController } from './piggy-bank.controller';
import { PiggyBankService } from './piggy-bank.service';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  providers: [PiggyBankService],
  controllers: [PiggyBankController],
})
export class PiggyBankModule {}
