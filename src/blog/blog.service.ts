import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog-dto';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async getPosts() {
    const blog = this.blogRepository.find({ relations: ['author'] });
    return blog || [];
  }
  async getPost(id: number) {
    const blog = this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return blog;
  }

  async createPost(createBlogDto: CreateBlogDto) {
    const author = await this.authorRepository.findOne({
      where: { id: createBlogDto.authorId },
    });

    if (!author) {
      throw new NotFoundException('نویسنده پیدا نشد');
    }

    const postToSave = this.blogRepository.create({
      ...createBlogDto,
      author,
    });
    return this.blogRepository.save(postToSave);
  }
}
