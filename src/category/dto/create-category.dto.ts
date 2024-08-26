import { TransactionType } from '../../ts/transactons/transactions.enums';
import { IsEnum, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @MinLength(1)
  title: string;
}
