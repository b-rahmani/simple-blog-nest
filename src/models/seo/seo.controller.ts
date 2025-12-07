import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateSeoDto } from './dto/create-seo-dto';
import { SeoService } from './seo.service';
import { RefType } from 'src/enums/ref-type.enum';
import { RefTypeValidationPipe } from 'src/shared/pipes/ref-type-validation.pipe';

@Controller('seo')
export class SeoController {
  constructor(private readonly SeoService: SeoService) {}

  @Post()
  create(@Body() createSeoDto: CreateSeoDto) {
    return this.SeoService.create(createSeoDto);
  }

  @Get()
  getSeo(
    @Query('refId') refId: number,
    @Query('refType', RefTypeValidationPipe) refType: RefType,
  ) {
    return this.SeoService.findByRefOrFail(refId, refType);
  }

  @Patch()
  updateSeo(
    @Query('refId') refId: number,
    @Query('refType', RefTypeValidationPipe) refType: RefType,
    @Body() updateSeoDto: CreateSeoDto,
  ) {
    const seo = this.SeoService.updateByRef(+refId, refType, updateSeoDto);
    return seo;
  }
}
