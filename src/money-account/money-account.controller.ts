import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MoneyAccountService } from './money-account.service';
import { MoneyAccountDto } from './dto/money-account.dto';
import { MoneyAccountDocument } from '../schemas/money-account.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { UserId } from '../decorators/UserId';
import { ObjectId } from 'mongodb';

@Controller('money-account')
export class AccountController {
  constructor(private readonly accountService: MoneyAccountService) {}

  @Post()
  createAccount(
    @Body() account: MoneyAccountDto,
    @UserId() userId: string,
  ): Promise<MoneyAccountDocument> {
    account.userId = userId;

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

  //todo: extract userId from @Request after implementation auth
  @Get()
  getAccountIds(@UserId() userId: string): Promise<ObjectId[]> {
    return this.accountService.getAccountIds(userId);
  }

  @Get(':id')
  getAccountById(
    @ParamMongoObjectId() accountId: string,
  ): Promise<MoneyAccountDocument> {
    return this.accountService.getAccountById(accountId);
  }
}
