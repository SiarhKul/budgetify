import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsPositive,
  MinLength,
} from 'class-validator';
import {
  Categories,
  TransactionType,
} from '../../ts/transactons/transactions.enums';
import { IsTypeOfDate } from '../../decorators/IsTypeOfDate';
import { Transform } from 'class-transformer';

export class TransactionDto {
  @IsEnum(TransactionType, {
    message: 'Not allowed value for transaction type',
  })
  transactionType: TransactionType;

  @MinLength(1, {
    message: 'Title is too short',
  })
  title: string;

  @IsEnum(Categories, {
    message: 'Not allowed value for categories',
  })
  categories: Categories;

  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsTypeOfDate()
  paymentDate: Date;

  @IsOptional()
  payee?: string;

  @IsOptional()
  description?: string;

  @IsMongoId()
  accountId: string;

  @IsOptional()
  attachedFile?: string;
}
// {
//   "transactionType": "Income",
//   "title": "some title",
//   "categories":"Home",
//   "amount":80,
//   "paymentDate": "2012-03-12",
//   "payee":"payee2",
//   "description": "description2",
//   "accountId": "66abf6a97bf3e2f09f4f843b"
// }
