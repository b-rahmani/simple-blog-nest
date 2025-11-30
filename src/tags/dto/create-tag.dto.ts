import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 'نام تگ الزامی است' })
  name: string;

  @IsString({ message: 'توضیحات تگ باید شامل حروف باشد' })
  description: string;
}
