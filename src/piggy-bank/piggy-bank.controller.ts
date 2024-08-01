import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { PiggyBankDocument } from '../schemas/piggy-bank.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';
import { PiggyBankDepositDocument } from '../schemas/piggy-bank-deposit.schema';
import { UserIdExtractedJwt } from '../decorators/UserIdExtractedJwt';

@Controller('piggy-bank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  @Post()
  create(
    @Body() piggyBank: PiggyBankDto,
    @UserIdExtractedJwt() userId: string,
  ): Promise<PiggyBankDocument> {
    piggyBank.user = userId;

    return this.piggyBankService.createBiggyBank(piggyBank);
  }

  @Post('deposit')
  depositToPiggyBank(
    @Body() deposit: PiggyBankDepositDto,
  ): Promise<PiggyBankDepositDocument> {
    return this.piggyBankService.depositToPiggyBank(deposit);
  }

  @Get()
  getAllPiggyBanks(
    @UserIdExtractedJwt() userId: string,
  ): Promise<PiggyBankDocument[]> {
    return this.piggyBankService.getAllPiggyBanks(userId);
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

  @Get(':id')
  getInfoPiggyBank(@ParamMongoObjectId('id') id: string) {
    return this.piggyBankService.getInfoPiggyBank(id);
  }
}
