import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog.entity';
import { AuthorModule } from 'src/models/author/author.module';
import { TagsModule } from 'src/models/tags/tags.module';
import { SeoModule } from 'src/models/seo/seo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
    AuthorModule,
    TagsModule,
    SeoModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
