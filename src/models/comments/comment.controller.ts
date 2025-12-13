import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { CreateCommentLikeDto } from './dto/createCommentLikeDto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto, dto.userId);
  }

  @Post('like')
  like(@Body() dto: CreateCommentLikeDto) {
    return this.commentService.like(dto, dto.userId);
  }


  @Get()
  getComments() {
    return this.commentService.getAllComments();
  }

}
