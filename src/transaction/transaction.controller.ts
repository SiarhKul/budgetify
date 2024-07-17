import { Body, Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  @Post()
  create(@Body('body') body: any) {}

  @Put()
  update() {}

  @Delete()
  delete() {}
}
