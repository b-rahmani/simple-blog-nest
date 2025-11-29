import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BlogModule } from './blog/blog.module';
import { AuthorModule } from './author/author.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    CatsModule,
    BlogModule,
    ProductsModule,
    AuthorModule,
    ProductCategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bloguser',
      password: '1234',
      database: 'blog_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
