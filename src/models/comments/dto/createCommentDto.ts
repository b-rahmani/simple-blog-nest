import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { RefType } from 'src/enums/ref-type.enum';

export class CreateCommentDto {
  @ApiProperty({
    description: 'نوع محتوا: post | product | comment',
    enum: Object.values(RefType),
    example: 'post',
  })
  @IsEnum(RefType, { message: 'refType درست نیست' })
  refType: RefType;

  @ApiProperty({ example: 1 })
  @IsInt()
  refId: number;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsInt({ message: 'شناسه والد باید عدد باشد' })
  parentId?: number;

  @ApiProperty({
    example: 1,
    description: 'شناسه کاربر (موقت - بعداً از توکن میاد)',
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
