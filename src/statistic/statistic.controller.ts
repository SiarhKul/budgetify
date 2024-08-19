import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  getStatisticByDate(@Body() body: { startDate: Date; endDate: Date }) {
    return this.statisticService.getStatisticByDate(
      body.startDate,
      body.endDate,
    );
  }
}
