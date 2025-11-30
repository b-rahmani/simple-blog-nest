import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tagToSave = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tagToSave);
  }

  findAll() {
    return this.tagsRepository.find();
  }

  findOne(id: number) {
    return this.tagsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagsRepository.findOne({ where: { id } });

    if (!tag) {
      throw new NotFoundException('تگ پیدا نشد');
    }
    const updatedTag = await this.tagsRepository.save({
      ...tag,
      ...updateTagDto,
    });

    return updatedTag;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
