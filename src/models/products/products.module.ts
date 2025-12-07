import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductCategoriesModule } from 'src/models/product-categories/product-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductCategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
