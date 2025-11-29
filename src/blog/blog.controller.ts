import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog-dto';

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
    return this.blogService.getPost(id);
  }
}
