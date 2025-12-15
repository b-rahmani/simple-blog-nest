// blog/blog-comments.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger';
import { CommentService } from '../comments/comment.service';

import { RefType } from 'src/enums/ref-type.enum';
import { CreateBlogCommentDto } from './dto/create-blog-comment';

@ApiTags('Blog Comments')
@Controller('posts/:postId/comments')
export class BlogCommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'ثبت کامنت برای مقاله' })
  @ApiBadRequestResponse({
    description: 'خطای اعتبارسنجی داده‌ها',
    schema: {
      example: {
        message: 'Validation failed',
        errors: [
          {
            field: 'parentId',
            messages: ['شناسه والد باید عدد باشد'],
          },
        ],
      },
    },
  })
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateBlogCommentDto,
  ) {
    return this.commentService.create(
      { ...dto, refId: postId, refType: RefType.POST },
      dto.userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'لیست کامنت‌های مقاله' })
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    // return this.commentService.findNestedByRef(RefType.POST, postId);
    return this.commentService.findNestedByRefUnlimited(RefType.POST, postId);
  }
}
