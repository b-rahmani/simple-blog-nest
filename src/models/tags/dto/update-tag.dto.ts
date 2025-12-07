import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
// import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  // @IsOptional()
  // @IsString({ message: 'توضیحات تگ الزامی است' })
  // description: string;
}
