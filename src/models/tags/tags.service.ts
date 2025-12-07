import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefType } from 'src/enums/ref-type.enum';

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

  // findOne(refId: number, refType: RefType) {
  //   return this.tagsRepository.findOne({ where: { refId, refType } });
  // }

  async findByName(name: string) {
    return this.tagsRepository.find({ where: { name } });
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
  // async updateByRef(
  //   refId: number,
  //   refType: RefType,
  //   updateTagDto: UpdateTagDto,
  // ) {
  //   const tag = await this.tagsRepository.findOne({
  //     where: { refId, refType },
  //   });

  //   if (!tag) {
  //     throw new NotFoundException('تگ پیدا نشد');
  //   }

  //   Object.assign(tag, updateTagDto);

  //   return this.tagsRepository.save(tag);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }

  // queries

  async findTagsByListOfIds(ids: number[]) {
    const tags = await this.tagsRepository.find({
      where: { id: In(ids) },
    });

    return tags;
  }
}
