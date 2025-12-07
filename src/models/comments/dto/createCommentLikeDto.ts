import { IsInt, IsEnum } from 'class-validator';
import { CommentLikeType } from 'src/enums/comment-like-type.enum';

export class CreateCommentLikeDto {
  @IsInt()
  commentId: number;

  @IsInt()
  userId: number;

  @IsEnum(CommentLikeType, { message: 'type درست نیست' })
  type: CommentLikeType;
}
