import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
