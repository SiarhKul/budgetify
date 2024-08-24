import { IsTypeOfDate } from '../../decorators/IsTypeOfDate';
import { IsMongoObjectId } from '../../decorators/IsMongoObjectId';

export class RetrieveMonthlyStatisticDto {
  @IsTypeOfDate()
  startDate: Date;

  @IsTypeOfDate()
  endDate: Date;

  @IsMongoObjectId()
  accountId: string;
}
