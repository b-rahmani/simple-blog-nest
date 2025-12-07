import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { Seo } from './entities/seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seo])],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {}
