import { IsEnum, IsMongoId, IsOptional, MinLength } from 'class-validator';
import { Currency } from '../../ts/account/account.enum';

export class AccountDto {
  @MinLength(1, { message: 'Title is too short' })
  title: string;

  @IsEnum(Currency)
  currency: Currency;

  @MinLength(1, { message: 'Description is too short' })
  description: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;
}
