import { Injectable, NotFoundException } from '@nestjs/common';
import { PiggyBank } from '../schemas/piggy-bank.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PiggyBankDto } from './dto/piggy-bank.dto';
import {
  PiggyBankDeposit,
  PiggyBankDepositDocument,
} from '../schemas/piggy-bank-deposit.schema';
import { PiggyBankDepositDto } from './dto/piggy-bank-deposit.dto';

@Injectable()
export class PiggyBankService {
  constructor(
    @InjectModel(PiggyBank.name)
    private piggyBankModel: Model<PiggyBank>,

    @InjectModel(PiggyBankDeposit.name)
    private readonly piggyBankDepositModel: Model<PiggyBankDeposit>,
  ) {}

  createBiggyBank(piggyBank: PiggyBankDto) {
    //todo: handle the case when piggy bank with the same name already exists
    return this.piggyBankModel.create(piggyBank);
  }

  async getAllPiggyBanks() {
    return this.piggyBankModel.find().populate('deposits');
  }

  async updatePiggyBank(id: string, piggyBank: PiggyBankDto) {
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

  async deletePiggyBank(id: string) {
    const findByIdAndDelete = await this.piggyBankModel.findByIdAndDelete(id);

    if (!findByIdAndDelete) {
      throw new NotFoundException('No piggy bank found with the given id');
    }

    return findByIdAndDelete;
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
}
