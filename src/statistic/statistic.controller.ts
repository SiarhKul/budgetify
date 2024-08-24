import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { GetStatisticByDateDto } from './dto/get-statistic-by-date.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import {
  CategorizedAmountsUnder,
  IMonthlyStatistic,
} from '../ts/statistic/statistic.interface';
import { RetrieveMonthlyStatisticDto } from './dto/retrieve-monthly-statistic.dto';

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
    @Body() body: RetrieveMonthlyStatisticDto,
  ): Promise<IMonthlyStatistic[]> {
    return this.statisticService.retrieveStatisticsByDateRange(body);
  }
}
