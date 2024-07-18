import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  @Post()
  create(@Body() body: TransactionDto) {
    return { ...body, some: 'text1' };
  }

  @Put()
  update(@Body() body: TransactionDto) {
    //todo: how to include id
    return body;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return id;
  }
}
