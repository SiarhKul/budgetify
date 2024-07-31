import { IsTypeOfDate } from '../../decorators/IsTypeOfDate';
import { IsPositive } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsMongoObjectId } from '../../decorators/IsMongoObjectId';

export class PiggyBankDepositDto {
  @IsMongoObjectId()
  piggyBankId: ObjectId;

  @IsPositive()
  amountToSave: number;

  @IsTypeOfDate()
  date: Date;
}
