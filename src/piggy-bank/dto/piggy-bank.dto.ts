import { IsPositive, MinLength } from 'class-validator';

export class PiggyBankDto {
  @MinLength(1, { message: 'Goal is too short' })
  goal: string;

  @IsPositive()
  goalAmount: string;
}
