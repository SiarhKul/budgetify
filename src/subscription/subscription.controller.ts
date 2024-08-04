import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get(':id')
  findOne(@ParamMongoObjectId() id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Delete(':id')
  remove(@ParamMongoObjectId() id: string) {
    return this.subscriptionService.remove(id);
  }

  @Patch(':id')
  update(
    @ParamMongoObjectId() id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }
}
