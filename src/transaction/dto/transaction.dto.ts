import { IsString, MinLength } from 'class-validator';

export class TransactionDto {
  @MinLength(1, {
    message: 'Title is too short',
  })
  title: string;
}
