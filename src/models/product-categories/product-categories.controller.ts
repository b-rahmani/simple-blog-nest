import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category-dto';
import { ProductCategoriesService } from './product-categories.service';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Get()
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get(':id/products')
  getProductsByCategory(@Param('id') id: number) {
    return this.productCategoriesService.getProducts(id);
  }
}
