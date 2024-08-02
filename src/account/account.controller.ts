import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AccountDocument } from '../schemas/account.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { UserId } from '../decorators/UserId';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(
    @Body() account: AccountDto,
    @Headers('Authorization') userId: string,
  ): Promise<AccountDocument> {
    account.userId = userId;

    return this.accountService.createAccount(account);
  }

  @Put()
  updateAccount(
    @Headers('Authorization') userId: string,
    @Body() account: AccountDto,
  ): Promise<AccountDocument> {
    return this.accountService.updateAccount(userId, account);
  }

  @Delete(':id')
  deleteAccount(
    @ParamMongoObjectId() accountId: string,
  ): Promise<AccountDocument> {
    return this.accountService.deleteAccount(accountId);
  }

  @Get()
  getAccounts(@UserId() userId: string): Promise<AccountDocument[]> {
    return this.accountService.getAccounts(userId);
  }
}
