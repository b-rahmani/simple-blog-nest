import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RefType } from 'src/enums/ref-type.enum';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  refId: number;

  @IsNotEmpty()
  @IsEnum(RefType)
  refType: RefType;

  @IsOptional()
  @IsInt()
  parentId: number;

  @IsInt()
  userId: number;
}
