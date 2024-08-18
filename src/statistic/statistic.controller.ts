import { Body, Controller, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post()
  getStatisticByDate(@Body() body: { startDate: Date; endDate: Date }) {
    return this.statisticService.getStatisticByDate(
      body.startDate,
      body.endDate,
    );
  }
}
