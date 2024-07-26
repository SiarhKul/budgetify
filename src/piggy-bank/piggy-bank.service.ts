import { Injectable, NotFoundException } from '@nestjs/common';
import { PiggyBank } from '../schemas/piggy-bank.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PiggyBankDto } from './dto/piggy-bank.dto';

@Injectable()
export class PiggyBankService {
  constructor(
    @InjectModel(PiggyBank.name)
    private piggyBankModel: Model<PiggyBank>,
  ) {}

  createBiggyBank(piggyBank: PiggyBankDto) {
    return this.piggyBankModel.create(piggyBank);
  }

  async getAllPiggyBanks() {
    return this.piggyBankModel.find();
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
}
