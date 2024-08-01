import { Body, Controller, Get, Headers } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  createAccount(
    @Body() account: AccountDto,
    @Headers('Authorization') userId: string,
  ) {
    account.userId = userId;

    return this.accountService.createAccount(account);
  }
}
