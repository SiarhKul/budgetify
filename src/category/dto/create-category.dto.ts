import { TransactionType } from '../../ts/transactons/transactions.enums';
import { IsEnum, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsEnum(TransactionType, {
    message: 'Not allowed value for transaction type',
  })
  transactionType: TransactionType;

  @MinLength(1, {
    message: 'Title is too short',
  })
  title: string;
}
