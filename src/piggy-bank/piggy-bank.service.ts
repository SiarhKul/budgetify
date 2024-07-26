import { Injectable } from '@nestjs/common';
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
}
