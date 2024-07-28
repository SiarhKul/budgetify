import { IsOptional, IsPositive, MinLength } from 'class-validator';
import { ObjectId } from 'mongodb';

export class PiggyBankDto {
  @MinLength(1, { message: 'Goal is too short' })
  goal: string;

  @IsPositive()
  goalAmount: number;

  @IsOptional()
  deposits: ObjectId[] = [];
}
