import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateSeoDto } from './dto/create-seo-dto';
import { Seo } from './entities/seo.entity';
import { RefType } from 'src/enums/ref-type.enum';

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(Seo)
    private readonly seoRepository: Repository<Seo>,
  ) {}

  async create(CreateSeoDto: CreateSeoDto) {
    const existingSeo = await this.findByRefOrNull(
      CreateSeoDto.refId,
      CreateSeoDto.refType,
    );
    if (existingSeo) {
      throw new ConflictException(
        `seo with refId ${CreateSeoDto.refId} and refType ${CreateSeoDto.refType} already exists`,
      );
    }

    const seo = this.seoRepository.create(CreateSeoDto);
    return this.seoRepository.save(seo);
  }

  async findByRefOrFail(refId: number, refType: RefType) {
    const seo = await this.seoRepository.findOne({ where: { refId, refType } });

    if (!seo) {
      throw new NotFoundException(
        `seo with refId ${refId} and refType ${refType} not found`,
      );
    }

    return seo;
  }
  async findByRefOrNull(refId: number, refType: RefType) {
    const seo = await this.seoRepository.findOne({ where: { refId, refType } });

    if (!seo) {
      return null;
    }

    return seo;
  }

  async updateByRef(
    refId: number,
    refType: RefType,
    updateSeoDto: CreateSeoDto,
  ) {
    const seo = await this.findByRefOrFail(refId, refType);
    Object.assign(seo, updateSeoDto);

    return this.seoRepository.save(seo);
  }

  //   async update(id: number, updateSeoDto: CreateSeoDto) {
  //     const seo = await this.seoRepository.findOne({ where: { id } });

  //     const newSeo = Object.assign(seo, updateSeoDto);

  //     const updatedSeo = await this.seoRepository.save(newSeo);
  //     return updatedSeo;
  //   }
}
