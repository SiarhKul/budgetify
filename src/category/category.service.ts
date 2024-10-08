import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model } from 'mongoose';
import { SearchCriteriaCategoryDto } from './dto/search-criteria-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

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
    const findCategory: CategoryDocument | null =
      await this.categoryModel.findById(categoryId);

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    return findCategory;
  }

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

  async findByTitle(
    searchCriteria: SearchCriteriaCategoryDto,
  ): Promise<CategoryDocument[]> {
    return this.categoryModel.find({
      title: { $regex: searchCriteria.title, $options: 'i' },
    });
  }
}
