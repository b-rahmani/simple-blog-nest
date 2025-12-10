import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  ArrayUnique,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'عنوان مقاله الزامی است' })
  title: string;

  //   @IsString()
  @ApiProperty({
    description: 'متن کامنت',
    example: 'این مقاله فوق‌العاده بود!',
    required: true,
    minLength: 10,
  })
  @IsNotEmpty({ message: 'متن مقاله الزامی است' })
  content: string;

  // @IsOptional()
  // @IsString()
  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // image?: string;

  @IsString()
  @IsNotEmpty({ message: 'نویسنده مقاله الزامی است' })
  authorId: number;

  @ApiProperty({
    required: false,
    oneOf: [
      { type: 'string', example: '1,2,3' },
      { type: 'string', example: '[1,2,3]' },
    ],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];
}
