import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateAccount(
    accountId: string,
    account: AccountDto,
  ): Promise<AccountDocument> {
    const findOneAndUpdate = await this.accountModel.findOneAndUpdate(
      { _id: accountId },
      account,
      {
        new: true,
      },
    );

    if (!findOneAndUpdate) {
      throw new NotFoundException(
        'No account found with the given id due to update',
      );
    }

    return findOneAndUpdate;
  }

  async deleteAccount(accountId: string): Promise<AccountDocument> {
    const findOneAndDelete = await this.accountModel.findOneAndDelete({
      _id: accountId,
    });

    if (!findOneAndDelete) {
      throw new NotFoundException('No account found with the given id');
    }

    return findOneAndDelete;
  }

  async getAccounts(userId: string) {
    return this.accountModel.find({ userId });
  }
}
