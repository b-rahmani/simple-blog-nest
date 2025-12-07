import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductCategoriesService } from 'src/models/product-categories/product-categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly productCategoryService: ProductCategoriesService,
  ) {}

  async getProducts() {
    const products = this.productRepository.find({ relations: ['category'] });
    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.productCategoryService.getCategoryOrFail(
      createProductDto.categoryId,
    );
    const productToSave = this.productRepository.create({
      ...createProductDto,
      category,
    });
    return this.productRepository.save(productToSave);
  }
}
