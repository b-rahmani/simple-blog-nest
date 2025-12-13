import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './models/cats/cats.module';
import { BlogModule } from './models/blog/blog.module';
import { AuthorModule } from './models/author/author.module';
import { ProductsModule } from './models/products/products.module';
import { ProductCategoriesModule } from './models/product-categories/product-categories.module';
import { TagsModule } from './models/tags/tags.module';
import { SeoModule } from './models/seo/seo.module';
import { typeOrmConfig } from './database/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './models/comments/comment.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    TypeOrmModule.forRoot(typeOrmConfig),
    CatsModule,
    BlogModule,
    ProductsModule,
    AuthorModule,
    ProductCategoriesModule,
    TagsModule,
    SeoModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
