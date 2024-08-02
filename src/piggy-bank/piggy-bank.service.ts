import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PiggyBank, PiggyBankDocument } from '../schemas/piggy-bank.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import {
  PiggyBankDeposit,
  PiggyBankDepositDocument,
} from '../schemas/piggy-bank-deposit.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';
import { IInfoPiggyBank } from '../ts/piggy-bank/piggy-bank.interfaces';
import { Account } from '../schemas/account.schema';

@Injectable()
export class PiggyBankService {
  constructor(
    @InjectModel(PiggyBank.name)
    private piggyBankModel: Model<PiggyBank>,
    @InjectModel(PiggyBankDeposit.name)
    private readonly piggyBankDepositModel: Model<PiggyBankDeposit>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  async createBiggyBank(piggyBank: PiggyBankDto): Promise<PiggyBankDocument> {
    const existingPiggyBank = await this.piggyBankModel.findOne({
      goal: piggyBank.goal,
    });

    if (existingPiggyBank) {
      throw new BadRequestException(
        'A piggy bank with the same goal already exists',
      );
    }

    return this.piggyBankModel.create(piggyBank);
  }

  async getAllPiggyBanks(userId: string) {
    return this.piggyBankModel.find({ userId: userId }).populate('deposits');
  }

  async updatePiggyBank(
    id: string,
    piggyBank: PiggyBankDto,
  ): Promise<PiggyBankDocument> {
    const piggyBankUpdated = await this.piggyBankModel.findByIdAndUpdate(
      id,
      piggyBank,
      { new: true },
    );

    if (!piggyBankUpdated) {
      throw new NotFoundException('No piggy bank found with the given id');
    }

    return piggyBankUpdated;
  }

  async depositToPiggyBank(
    deposit: PiggyBankDepositDto,
  ): Promise<PiggyBankDepositDocument> {
    const createdDeposit = await this.piggyBankDepositModel.create(deposit);

    await this.piggyBankModel.findByIdAndUpdate(
      deposit.piggyBankId,
      {
        $push: { deposits: createdDeposit._id },
      },
      { new: true, useFindAndModify: false },
    );

    return createdDeposit;
  }

  async getInfoPiggyBank(id: string): Promise<IInfoPiggyBank> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const [piggyBankInfo] = await this.piggyBankModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      { $unwind: '$deposits' },
      {
        $lookup: {
          from: 'piggybankdeposits',
          localField: 'deposits',
          foreignField: '_id',
          as: 'deposits_temp',
        },
      },
      { $unwind: '$deposits_temp' },
      {
        $group: {
          _id: '$_id',
          goal: { $first: '$goal' },
          goalAmount: { $first: '$goalAmount' },
          sumCom: { $sum: '$deposits_temp.amountToSave' },
        },
      },
    ]);

    if (!piggyBankInfo) {
      throw new NotFoundException('No piggy bank found with the given id');
    }

    return piggyBankInfo;
  }

  async deletePiggyBank(id: string): Promise<PiggyBankDocument> {
    const find = await this.accountModel.find();
    console.log('=>(piggy-bank.service.ts:116) find', find);

    // const findByIdAndDelete = await this.piggyBankModel.findByIdAndDelete(id);
    const findByIdAndDelete: any = await this.piggyBankModel.find({ _id: id });

    if (!findByIdAndDelete) {
      throw new NotFoundException('No piggy bank found with the given id');
    }

    return findByIdAndDelete;
  }
}
