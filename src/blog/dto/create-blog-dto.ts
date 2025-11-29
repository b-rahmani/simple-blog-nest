import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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
}
