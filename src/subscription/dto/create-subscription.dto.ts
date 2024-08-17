import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Categories } from '../../ts/transactons/transactions.enums';
import { IsTypeOfDate } from '../../decorators/IsTypeOfDate';
import { ObjectId } from 'mongodb';

export class CreateSubscriptionDto {
  @MinLength(1, {
    message: 'Title is too short',
  })
  title: string;

  @IsEnum(Categories, {
    message: 'Not allowed value for categories',
  })
  categories: Categories;

  @IsPositive()
  amount: number;

  @IsTypeOfDate()
  paymentDate: Date;

  @IsOptional()
  description?: string;

  @IsMongoId()
  accountId: string;
}
