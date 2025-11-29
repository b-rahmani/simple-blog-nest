import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'نام نویسنده الزامی است' })
  name: string;
}
