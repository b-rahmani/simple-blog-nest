import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'عنوان محصول الزامی است' })
  title: string;

  @IsNotEmpty({ message: 'قیمت محصول الزامی است' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'دسته بندی محصول الزامی است' })
  categoryId: number;
}
