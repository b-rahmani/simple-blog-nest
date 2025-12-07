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
  @IsNotEmpty({ message: 'متن مقاله الزامی است' })
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty({ message: 'نویسنده مقاله الزامی است' })
  authorId: number;

  @IsInt({ each: true, message: 'تگ‌ها باید به صورت id باشند' })
  @ArrayUnique({ message: 'تگ‌ها نباید تکراری باشند' })
  @ArrayMinSize(1, { message: 'حداقل یک تگ باید انتخاب شود' })
  tags: number[];
}
