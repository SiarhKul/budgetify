import { IsPositive } from 'class-validator';
import { IsTypeOfDate } from '../../decorators/IsTypeOfDate';

export class GetStatisticByDateDto {
  @IsTypeOfDate()
  startDate: Date;

  @IsTypeOfDate()
  endDate: Date;

  @IsPositive()
  totalExpenses: number;
}
