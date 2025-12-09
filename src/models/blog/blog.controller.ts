import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MulterExceptionFilter } from 'src/filters/multer-exception.filter';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
@UseFilters(MulterExceptionFilter)
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        title: { type: 'string' },
        content: { type: 'string' },
        tags: {
          oneOf: [
            { type: 'array', items: { type: 'number' } },
            { type: 'string', description: 'Comma-separated or JSON string' },
          ],
        },
        authorId: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/articles',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      // fileFilter: (req, file, cb) => {
      //   const allowedMimes = ['image/jpeg', 'image/webp'];

      //   if (allowedMimes.includes(file.mimetype)) {
      //     cb(null, true);
      //   } else {
      //     cb(
      //       new BadRequestException('فقط فرمت های jpeg و webp مجاز هستند'),
      //       false,
      //     );
      //   }
      // },
    }),
  )
  async createPost(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('🔥 RAW BODY:', createBlogDto);
    console.log('🔥 FILE:', file);

    // if (typeof createBlogDto.tags === 'string') {
    //   createBlogDto.tags = [Number(createBlogDto.tags)];
    // }

    // if (Array.isArray(createBlogDto.tags)) {
    //   createBlogDto.tags = createBlogDto.tags.map((tag) => Number(tag));
    // }

    createBlogDto.authorId = Number(createBlogDto.authorId);

    return this.blogService.createPost(createBlogDto, file);
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
