import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}
  //todo: check uniqueness of category title
  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<CategoryDocument> {
    const category: Category = {
      ...createCategoryDto,
      userId: userId,
    };

    return await this.categoryModel.create(category);
  }

  async findAll(userId: string): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ userId: userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
