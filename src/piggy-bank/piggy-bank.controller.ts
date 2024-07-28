import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { PiggyBankDocument } from '../schemas/piggy-bank.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';

@Controller('piggy-bank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  @Post()
  create(@Body() piggyBank: PiggyBankDto): Promise<PiggyBankDocument> {
    return this.piggyBankService.createBiggyBank(piggyBank);
  }

  @Post('deposit')
  depositToPiggyBank(@Body() deposit: PiggyBankDepositDto) {
    return this.piggyBankService.depositToPiggyBank(deposit);
  }

  @Post('info')
  getInfoPiggyBank(@Body() body: { id: string }) {
    return this.piggyBankService.getInfoPiggyBank(body.id);
  }

  @Get()
  getAllPiggyBanks(): Promise<PiggyBankDocument[]> {
    return this.piggyBankService.getAllPiggyBanks();
  }

  @Put(':id')
  updatePiggyBank(
    @ParamMongoObjectId('id') id: string,
    @Body() piggyBank: PiggyBankDto,
  ): Promise<PiggyBankDocument> {
    return this.piggyBankService.updatePiggyBank(id, piggyBank);
  }

  @Delete(':id')
  deletePiggyBank(
    @ParamMongoObjectId('id') id: string,
  ): Promise<PiggyBankDocument> {
    //todo: transfer all many to the account
    return this.piggyBankService.deletePiggyBank(id);
  }
}