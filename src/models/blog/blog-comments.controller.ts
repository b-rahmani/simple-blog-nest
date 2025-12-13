// blog/blog-comments.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentService } from '../comments/comment.service';

import { RefType } from 'src/enums/ref-type.enum';
import { CreateCommentDto } from '../comments/dto/createCommentDto';

@ApiTags('Blog Comments')
@Controller('posts/:postId/comments')
export class BlogCommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'ثبت کامنت برای مقاله' })
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto, dto.userId);
  }

  @Get()
  @ApiOperation({ summary: 'لیست کامنت‌های مقاله' })
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findByRef(RefType.POST, postId);
  }
}
