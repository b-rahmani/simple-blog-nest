import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('hello')
  sayHello(): object {
    return { message: 'hello' };
  }

  @Get('')
  getPosts() {
    return this.blogService.getPosts();
  }

  @Post()
  async cratePost(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createPost(createBlogDto);
  }

  @Get(':id')
  async getPost(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (error) =>
          new BadRequestException('شناسه باید عدد معتبر باشد.'),
      }),
    )
    id: number,
  ) {
    return this.blogService.getPostWithSeo(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.blogService.deletePost(id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.updatePost(id, updateBlogDto);
  }
}
