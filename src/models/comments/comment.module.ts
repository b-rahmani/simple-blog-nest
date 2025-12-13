import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { BlogCommentsController } from '../blog/blog-comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentLike])],
  controllers: [CommentController,BlogCommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
