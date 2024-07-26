import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

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

  @Put(':id')
  updatePiggyBank(
    @ParamMongoObjectId('id') id: string,
    @Body() piggyBank: PiggyBankDto,
  ) {
    return this.piggyBankService.updatePiggyBank(id, piggyBank);
  }

  @Delete(':id')
  deletePiggyBank(@ParamMongoObjectId('id') id: string) {
    return this.piggyBankService.deletePiggyBank(id);
  }
}
