import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { GetStatisticByDateDto } from './dto/get-statistic-by-date.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import {
  CategorizedAmountsUnder,
  IStatisticsByDateRange,
} from '../ts/statistic/statistic.interface';
import { StatisticsByDateRangeDto } from './dto/statistics-by-date-range.dto';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post('category/:id')
  @HttpCode(HttpStatus.OK)
  getStatisticByDate(
    @ParamMongoObjectId() accountId: string,
    @Body() body: GetStatisticByDateDto,
  ): Promise<CategorizedAmountsUnder> {
    return this.statisticService.getStatisticByDate(
      body.startDate,
      body.endDate,
      body.totalExpenses,
      accountId,
    );
  }

  @Post('monthly')
  @HttpCode(HttpStatus.OK)
  retrieveStatisticsByDateRange(
    @Body() body: StatisticsByDateRangeDto,
  ): Promise<IStatisticsByDateRange[]> {
    return this.statisticService.retrieveStatisticsByDateRange(body);
  }
}
