import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog.entity';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), AuthorModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
