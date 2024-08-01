import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { Account, AccountDocument } from '../schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  createAccount(account: AccountDto): Promise<AccountDocument> {
    return this.accountModel.create(account);
  }
}