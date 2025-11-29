import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductCategory } from 'src/product-categories/entities/product-category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async getProducts() {
    const products = this.productRepository.find({ relations: ['category'] });
    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.productCategoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('دسته بندی پیدا نشد');
    }

    const productToSave = this.productRepository.create({
      ...createProductDto,
      category,
    });
    return this.productRepository.save(productToSave);
  }
}
