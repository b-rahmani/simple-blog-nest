import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty({ message: 'نام دسته بندی محصول الزامی است' })
  name: string;
}
