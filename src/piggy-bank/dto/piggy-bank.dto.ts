import { IsOptional, IsPositive, MinLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsMongoObjectId } from '../../decorators/IsMongoObjectId';

export class PiggyBankDto {
  @MinLength(1, { message: 'Goal is too short' })
  goal: string;

  @IsPositive()
  goalAmount: number;

  @IsOptional()
  deposits?: ObjectId[] = [];

  @IsOptional()
  userId?: string;

  @IsMongoObjectId()
  accountId: string;
}
