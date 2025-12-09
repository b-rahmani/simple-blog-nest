import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  ArrayUnique,
  IsInt,
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

  // @IsInt({ each: true, message: 'تگ‌ها باید به صورت id باشند' })
  // @ArrayUnique({ message: 'تگ‌ها نباید تکراری باشند' })
  // @ArrayMinSize(1, { message: 'حداقل یک تگ باید انتخاب شود' })
  tags: number[] | string;
}
