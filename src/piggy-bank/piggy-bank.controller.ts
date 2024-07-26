import { Body, Controller, Get, Post } from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';

@Controller('piggy-bank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  @Post()
  create(@Body() piggyBank: PiggyBankDto) {
    return this.piggyBankService.createBiggyBank(piggyBank);
  }

  @Get()
  getAllPiggyBanks() {
    return this.piggyBankService.getAllPiggyBanks();
  }
}
