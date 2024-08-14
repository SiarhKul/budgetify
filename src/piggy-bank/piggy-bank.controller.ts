import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { PiggyBankService } from './piggy-bank.service';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { PiggyBankDocument } from '../schemas/piggy-bank.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';
import { PiggyBankDepositDocument } from '../schemas/piggy-bank-deposit.schema';
import { IRequest } from '../ts/auth/auth.interfaces';

@Controller('piggy-bank')
export class PiggyBankController {
  constructor(private readonly piggyBankService: PiggyBankService) {}

  @Post()
  create(
    @Body() piggyBank: PiggyBankDto,
    @Request() req: IRequest,
  ): Promise<PiggyBankDocument> {
    piggyBank.userId = req.user.sub;

    return this.piggyBankService.createBiggyBank(piggyBank);
  }

  @Post('deposit')
  depositToPiggyBank(
    @Body() deposit: PiggyBankDepositDto,
  ): Promise<PiggyBankDepositDocument> {
    return this.piggyBankService.depositToPiggyBank(deposit);
  }

  @Get()
  getAllPiggyBanks(@Request() req: IRequest): Promise<PiggyBankDocument[]> {
    const userId = req.user.sub;
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
    return this.piggyBankService.deletePiggyBank(id);
  }

  @Get(':id')
  getInfoPiggyBank(@ParamMongoObjectId('id') id: string) {
    return this.piggyBankService.getInfoPiggyBank(id);
  }
}
