import { Injectable, NotFoundException } from '@nestjs/common';
import { MoneyAccountDto } from './dto/money-account.dto';
import {
  MoneyAccount,
  MoneyAccountDocument,
} from '../schemas/money-account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class MoneyAccountService {
  constructor(
    @InjectModel(MoneyAccount.name)
    private readonly accountModel: Model<MoneyAccount>,
  ) {}

  createAccount(account: MoneyAccountDto): Promise<MoneyAccountDocument> {
    return this.accountModel.create(account);
  }

  async updateAccount(
    accountId: string,
    account: MoneyAccountDto,
  ): Promise<MoneyAccountDocument> {
    const findOneAndUpdate = await this.accountModel.findOneAndUpdate(
      { _id: accountId },
      account,
      {
        new: true,
      },
    );

    if (!findOneAndUpdate) {
      throw new NotFoundException(
        'No money-account found with the given id due to update',
      );
    }

    return findOneAndUpdate;
  }

  async deleteAccount(accountId: string): Promise<MoneyAccountDocument> {
    const findOneAndDelete = await this.accountModel.findOneAndDelete({
      _id: accountId,
    });

    if (!findOneAndDelete) {
      throw new NotFoundException('No money-account found with the given id');
    }

    return findOneAndDelete;
  }

  async getAccountIds(userId: string): Promise<ObjectId[]> {
    return this.accountModel.find({ userId }, '_id');
  }

  async getAccountById(accountId: string): Promise<MoneyAccountDocument> {
    return this.accountModel.findById(accountId);
  }

  async subtractOrSumBalance(accountId: string, amount: number) {
    const findOneAndUpdate = await this.accountModel.findOneAndUpdate(
      {
        _id: accountId,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
      },
    );

    if (!findOneAndUpdate) {
      throw new NotFoundException(
        'No money-account found with the given id due to update',
      );
    }

    return findOneAndUpdate;
  }
}
