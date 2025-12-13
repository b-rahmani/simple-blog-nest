import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { CreateCommentLikeDto } from './dto/createCommentLikeDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { Comment } from './entities/comment.entity';
import { RefType } from 'src/enums/ref-type.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(CommentLike)
    private likeRepo: Repository<CommentLike>,
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const comment = this.commentRepo.create({
      ...dto,
      userId,
    });
    return this.commentRepo.save(comment);
  }

  async like(dto: CreateCommentLikeDto, userId: number) {
    const existing = await this.likeRepo.findOne({
      where: { commentId: dto.commentId, userId },
    });

    if (existing) {
      existing.value = dto.value;
      return this.likeRepo.save(existing);
    }

    return this.likeRepo.save(
      this.likeRepo.create({
        commentId: dto.commentId,
        userId,
        value: dto.value,
      }),
    );
  }

  async findByRef(refType: RefType, refId: number) {
    return this.commentRepo.find({
      where: { refType, refId },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllComments() {
    return this.commentRepo.find();
  }
}
