import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogCommentDto {
  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsInt({ message: 'شناسه والد باید عدد باشد' })
  parentId?: number;

  @ApiProperty({
    example: 0,
    description: 'شناسه کاربر (موقت)',
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({ example: 'متن کامنت' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
