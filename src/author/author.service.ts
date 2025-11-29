import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async getAuthors() {
    return this.authorRepository.find();
  }

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const authorToSave = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(authorToSave);
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundException('نویسنده پیدا نشد');
    }

    return author;
  }

  async getAuthorPosts(authorId: number) {
    return this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.posts', 'posts')
      .where('author.id=:id', { id: authorId })
      .getOne();
  }
}
