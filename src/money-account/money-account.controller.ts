import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { MoneyAccountService } from './money-account.service';
import { MoneyAccountDto } from './dto/money-account.dto';
import { MoneyAccountDocument } from '../schemas/money-account.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { ObjectId } from 'mongodb';
import { IRequest } from '../ts/auth/auth.interfaces';

@Controller('money-account')
export class AccountController {
  constructor(private readonly accountService: MoneyAccountService) {}

  @Post()
  createAccount(
    @Body() account: MoneyAccountDto,
    @Request() req: IRequest,
  ): Promise<MoneyAccountDocument> {
    account.userId = req.user.sub;

    return this.accountService.createAccount(account);
  }

  @Put(':id')
  updateAccount(
    @ParamMongoObjectId() accountId: string,
    @Body() account: MoneyAccountDto,
  ): Promise<MoneyAccountDocument> {
    return this.accountService.updateAccount(accountId, account);
  }

  @Delete(':id')
  deleteAccount(
    @ParamMongoObjectId() accountId: string,
  ): Promise<MoneyAccountDocument> {
    return this.accountService.deleteAccount(accountId);
  }

  @Get()
  getAccountIds(@Request() req: IRequest): Promise<ObjectId[]> {
    const userId = req.user.sub;
    return this.accountService.getAccountIds(userId);
  }

  @Get(':id')
  getAccountById(
    @ParamMongoObjectId() accountId: string,
  ): Promise<MoneyAccountDocument> {
    return this.accountService.getAccountById(accountId);
  }
}
