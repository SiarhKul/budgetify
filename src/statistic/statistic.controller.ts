import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { GetStatisticByDateDto } from './dto/get-statistic-by-date.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post('category/:id')
  @HttpCode(HttpStatus.OK)
  getStatisticByDate(
    @ParamMongoObjectId() id: string,
    @Body() body: GetStatisticByDateDto,
  ) {
    return this.statisticService.getStatisticByDate(
      body.startDate,
      body.endDate,
      body.totalExpenses,
      id,
    );
  }
}
