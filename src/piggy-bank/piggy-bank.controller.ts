import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { PiggyBankDocument } from '../schemas/piggy-bank.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';
import { PiggyBankDepositDocument } from '../schemas/piggy-bank-deposit.schema';
import { ObjectId } from 'mongodb';

@Controller('piggy-bank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  //done
  @Post()
  create(
    @Body() piggyBank: PiggyBankDto,
    @Headers('Authorization') tempUserId: string,
  ): Promise<PiggyBankDocument> {
    piggyBank.user = new ObjectId(tempUserId);

    return this.piggyBankService.createBiggyBank(piggyBank);
  }
  //done
  @Post('deposit')
  depositToPiggyBank(
    @Body() deposit: PiggyBankDepositDto,
  ): Promise<PiggyBankDepositDocument> {
    return this.piggyBankService.depositToPiggyBank(deposit);
  }
  //done
  @Get()
  getAllPiggyBanks(
    @Headers('Authorization') tempUserId: string,
  ): Promise<PiggyBankDocument[]> {
    console.log('headers', tempUserId);
    return this.piggyBankService.getAllPiggyBanks(tempUserId);
  }
  //done
  @Put(':id')
  updatePiggyBank(
    @ParamMongoObjectId('id') id: string,
    @Body() piggyBank: PiggyBankDto,
  ): Promise<PiggyBankDocument> {
    return this.piggyBankService.updatePiggyBank(id, piggyBank);
  }
  //done
  @Delete(':id')
  deletePiggyBank(
    @ParamMongoObjectId('id') id: string,
  ): Promise<PiggyBankDocument> {
    //todo: transfer all many to the account
    return this.piggyBankService.deletePiggyBank(id);
  }
  //done
  @Get(':id')
  getInfoPiggyBank(@ParamMongoObjectId('id') id: string) {
    return this.piggyBankService.getInfoPiggyBank(id);
  }
}
