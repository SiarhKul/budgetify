import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserId } from '../decorators/UserId';
import { CategoryDocument } from '../schemas/category.schema';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/find-by-title')
  findByTitle(@Query('title') title: string): Promise<CategoryDocument[]> {
    return this.categoryService.findByTitle(title);
  }

  @Get(':id')
  findOne(@ParamMongoObjectId() id: string): Promise<CategoryDocument> {
    return this.categoryService.findOne(id);
  }

  @Get()
  findAll(@UserId() userId: string): Promise<CategoryDocument[]> {
    return this.categoryService.findAll(userId);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UserId() userId: string,
  ): Promise<CategoryDocument> {
    return await this.categoryService.create(createCategoryDto, userId);
  }

  @Patch(':id')
  update(
    @ParamMongoObjectId() id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@ParamMongoObjectId() id: string): Promise<{ _id: string }> {
    return this.categoryService.remove(id);
  }
}
