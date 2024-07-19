import { Body, Controller, Post } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  @Post()
  create(@Body() body: TransactionDto) {
    return { ...body, some: 'text1' };
  }
}
