import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors() {
    return this.authorService.getAuthors();
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  findAuthor(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (error) =>
          new BadRequestException('شناسه باید عدد معتبر باشد.'),
      }),
    )
    id: number,
  ) {
    return this.authorService.findOne(id);
  }

  @Get(':id/posts')
  getAuthorPosts(@Param('id') id: number) {
    return this.authorService.getAuthorPosts(id);
  }
}
