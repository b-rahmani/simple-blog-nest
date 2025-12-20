import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'لوازم الکترونیکی' })
  @IsNotEmpty({ message: 'نام دسته بندی محصول الزامی است' })
  name: string;
}
