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
  amount: number;

  @IsTypeOfDate()
  paymentDate: Date;

  @IsOptional()
  payee?: string;

  @IsOptional()
  description?: string;

  @IsMongoId()
  accountId: string;
}
