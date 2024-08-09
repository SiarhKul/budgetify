import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { AccountDocument } from '../schemas/account.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { UserId } from '../decorators/UserId';
import { IRequest } from '../ts/auth/auth.interfaces';

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

  @Get()
  getAccounts(@Request() req: IRequest): Promise<AccountDocument[]> {
    const userId: string = req.user.sub;
    return this.accountService.getAccounts(userId);
  }
}
