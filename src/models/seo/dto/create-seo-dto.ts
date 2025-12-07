import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RefType } from 'src/enums/ref-type.enum';

export class CreateSeoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'refId is required' })
  refId: number;

  @IsEnum(RefType, { message: 'refType درست نیست' })
  @IsNotEmpty({ message: 'refType الزامی است' })
  refType: RefType;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  canonical?: string;

  @IsOptional()
  @IsString()
  ogTitle?: string;

  @IsOptional()
  @IsString()
  ogDescription?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @IsString()
  robots?: string;

  @IsOptional()
  @IsString()
  schema?: any;
}
