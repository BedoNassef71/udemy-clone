import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    if (await this.categoryModel.findOne({ slug: createCategoryDto.slug })) {
      throw new ConflictException('category is already exists');
    }
    return this.categoryModel.create(createCategoryDto);
  }

  findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndRemove(id);
  }
}
