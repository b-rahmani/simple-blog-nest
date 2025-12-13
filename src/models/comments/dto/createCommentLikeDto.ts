import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsEnum, IsIn, Min } from 'class-validator';

export class CreateCommentLikeDto {
  @IsInt()
  commentId: number;

  @ApiProperty({ example: 1, description: 'شناسه کاربر (موقت - بعداً از توکن میاد)' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @IsIn([1, -1])
  value: 1 | -1;
}
