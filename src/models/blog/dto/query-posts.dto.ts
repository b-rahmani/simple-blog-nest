import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PostSortBy } from 'src/enums/post-sort-by.enum';
import { SortOrder } from 'src/enums/sort-order.enum';

export class QueryPostsDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'nestjs',
    description: 'جستجو در عنوان پست‌ها بر اساس این مقدار',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: PostSortBy,
    default: PostSortBy.CREATED_AT,
    description: 'مرتب سازی بر اساس این فیلد',
  })
  @IsOptional()
  @IsIn(['createdAt', 'title'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.DESC,
    description: 'ترتیب مرتب سازی',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';
}
