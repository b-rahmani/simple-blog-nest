import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  ArrayUnique,
  IsInt,
  IsArray,
  isNotEmpty,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'عنوان مقاله الزامی است' })
  title: string;

  //   @IsString()
  // @ApiProperty({
  //   description: 'متن کامنت',
  //   example: 'این مقاله فوق‌العاده بود!',
  //   required: true,
  //   minLength: 10,
  // })
  // @isNotEmpty({ message: 'کامنت نباید خالی باشد' })


  @IsNotEmpty({ message: 'متن مقاله الزامی است' })
  content: string;

  // @IsOptional()
  // @IsString()
  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // image?: string;
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'شناسه نویسنده باید عدد باشد' })
  @IsNotEmpty({ message: 'نویسنده مقاله الزامی است' })
  authorId: number;

  @ApiProperty({
    required: false,
    oneOf: [
      { type: 'string', example: '1,2,3' },
      { type: 'string', example: '[1,2,3]' },
    ],
  })
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(Number).filter((n) => !isNaN(n));
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map(Number).filter((n) => !isNaN(n));
        }
      } catch {
        return value
          .split(',')
          .map((s) => Number(s.trim()))
          .filter((n) => !isNaN(n));
      }
    }
    return [];
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'شناسه تگ‌ها باید عدد باشد' })
  tags?: number[];
}
