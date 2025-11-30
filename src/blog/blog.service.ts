import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './entities/blog.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog-dto';
import { Author } from 'src/author/entities/author.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { UpdateBlogDto } from './dto/update-blog-dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getPosts() {
    const blog = this.blogRepository.find({ relations: ['author', 'tags'] });
    return blog || [];
  }
  async getPost(id: number) {
    const blog = this.blogRepository.findOne({
      where: { id },
      relations: ['author', 'tags'],
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
    const tags = await this.tagRepository.find({
      where: { id: In(createBlogDto.tags) },
    });

    const postToSave = this.blogRepository.create({
      ...createBlogDto,
      tags,
      author,
    });
    return this.blogRepository.save(postToSave);
  }

  async deletePost(id: number) {
    const post = await this.blogRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('پست پیدا نشد');
    }

    return this.blogRepository.remove(post);
  }

  async updatePost(id: number, updateBlogDto: UpdateBlogDto) {
    const post = await this.blogRepository.findOne({
      where: { id },
      relations: ['author', 'tags'],
    });

    if (!post) {
      throw new NotFoundException('پست پیدا نشد');
    }

    Object.assign(post, updateBlogDto);

    if (updateBlogDto.authorId) {
      const newAuthor = await this.authorRepository.findOne({
        where: { id: updateBlogDto.authorId },
      });

      if (!newAuthor) {
        throw new NotFoundException('نویسنده پیدا نشد');
      }
      post.author = newAuthor;
    }

    if (updateBlogDto.tags) {
      const tags = await this.tagRepository.find({
        where: { id: In(updateBlogDto.tags) },
      });
      post.tags = tags;
    }

    return this.blogRepository.save(post);
  }
}
