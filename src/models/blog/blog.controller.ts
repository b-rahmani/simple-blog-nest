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
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MulterExceptionFilter } from 'src/common/filters/multer-exception.filter';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import { ParsedBlogData } from 'src/types/ParsedBlogData';
import { ParseTagsPipe } from 'src/constants/parse-tags.pipe';
import { QueryPostsDto } from './dto/query-posts.dto';

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

  @Get('/paginated')
  findAll(@Query() query:QueryPostsDto) {
    return this.blogService.findAllPaginated(query);
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
    // @Body('tags', ParseTagsPipe) tags: number[],
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('🔥 body:', createBlogDto);
    console.log('🔥 FILE:', file);

    createBlogDto.authorId = Number(createBlogDto.authorId);
    // const payload = { ...createBlogDto, tags };

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
