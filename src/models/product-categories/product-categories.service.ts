import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryDto } from './dto/create-product-category-dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  async findAll() {
    return await this.productCategoriesRepository.find();
  }

  async findOne(id: number) {
    return await this.productCategoriesRepository.findOne({ where: { id } });
  }

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategoryToSave = this.productCategoriesRepository.create(
      createProductCategoryDto,
    );
    return this.productCategoriesRepository.save(productCategoryToSave);
  }

  // async getProducts(categoryId: number) {
  //   return this.productCategoriesRepository.findOne({
  //     where: { id: categoryId },
  //     relations: ['products', ],
  //   });
  // }
  async getProducts(categoryId: number) {
    return this.productCategoriesRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id=:id', { id: categoryId })
      .getOne();
  }

  //queries

  async getCategoryOrFail(id: number) {
    const category = await this.productCategoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('دسته بندی پیدا نشد');
    }
    return category;
  }
}
