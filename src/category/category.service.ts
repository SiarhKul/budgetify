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

  async findOne(categoryId: string): Promise<CategoryDocument> {
    return this.categoryModel.findById(categoryId);
  }

  //todo: check uniqueness of category title
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<{ _id: string }> {
    return this.categoryModel.findByIdAndDelete(id, { projection: { _id: 1 } });
  }
}
