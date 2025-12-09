import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './entities/blog.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';
import { AuthorService } from 'src/models/author/author.service';
import { TagsService } from 'src/models/tags/tags.service';
import { SeoService } from 'src/models/seo/seo.service';
import { RefType } from 'src/enums/ref-type.enum';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,

    private readonly authorService: AuthorService,

    private readonly tagsService: TagsService,

    private readonly SeoService: SeoService,
  ) {}

  async getPosts() {
    const blog = this.blogRepository.find({
      relations: ['author'],
    });
    return blog || [];
  }
  async getPost(id: number) {
    const post = await this.findPostOrFail(id, ['author', 'tags']);
    return post;
  }

  async getPostWithSeo(id: number) {
    const post = await this.findPostOrFail(id, ['author', 'tags']);
    const seo = await this.SeoService.findByRefOrNull(id, RefType.POST);

    return {
      ...post,
      seo: seo || null,
    };
  }

  async createPost(createBlogDto: CreateBlogDto, file?: Express.Multer.File) {
    console.log(' createBlogDto:', createBlogDto.tags);

    const imageUrl = file ? `/uploads/articles/${file.filename}` : null;

    const author = await this.authorService.findOrFail(createBlogDto.authorId);

    // const tags = await this.tagsService.findTagsByListOfIds(createBlogDto.tags);

    const postToSave = this.blogRepository.create({
      ...createBlogDto,
      image: imageUrl,
      tags: [],
      author,
    });
    return this.blogRepository.save(postToSave);
  }

  async deletePost(id: number) {
    const post = await this.findPostOrFail(id, []);

    return this.blogRepository.remove(post);
  }

  async updatePost(id: number, updateBlogDto: UpdateBlogDto) {
    const post = await this.findPostOrFail(id, []);

    Object.assign(post, updateBlogDto);

    if (updateBlogDto.authorId) {
      post.author = await this.authorService.findOrFail(updateBlogDto.authorId);
    }

    // if (updateBlogDto.tags) {
    //   post.tags = await this.tagsService.findTagsByListOfIds(
    //     updateBlogDto.tags,
    //   );
    // }

    return this.blogRepository.save(post);
  }

  async findPostOrFail(id: number, relations: string[] = ['author', 'tags']) {
    const post = await this.blogRepository.findOne({
      where: { id },
      relations,
    });

    if (!post) {
      throw new NotFoundException('پست پیدا نشد');
    }

    return post;
  }
}
