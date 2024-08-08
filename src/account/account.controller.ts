import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AccountDocument } from '../schemas/account.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { UserId } from '../decorators/UserId';
import { AuthGuard } from '../auth/auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(
    @Body() account: AccountDto,
    @UserId() userId: string,
  ): Promise<AccountDocument> {
    account.userId = userId;

    return this.accountService.createAccount(account);
  }

  @Put(':id')
  updateAccount(
    @ParamMongoObjectId() accountId: string,
    @Body() account: AccountDto,
  ): Promise<AccountDocument> {
    return this.accountService.updateAccount(accountId, account);
  }

  @Delete(':id')
  deleteAccount(
    @ParamMongoObjectId() accountId: string,
  ): Promise<AccountDocument> {
    return this.accountService.deleteAccount(accountId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAccounts(@UserId() userId: string): Promise<AccountDocument[]> {
    return this.accountService.getAccounts(userId);
  }
}
