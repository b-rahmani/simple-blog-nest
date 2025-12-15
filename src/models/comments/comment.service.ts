import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { CreateCommentLikeDto } from './dto/createCommentLikeDto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

  async findNestedByRef(refType: RefType, refId: number) {
    return this.commentRepo.find({
      where: { refType, refId, parentId: IsNull() },
      relations: [
        'children',
        'children.children',
        'children.children.children',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async findNestedByRefUnlimited(refType: RefType, refId: number) {
    // همه کامنت‌ها رو بگیر
    const allComments = await this.commentRepo.find({
      where: { refType, refId },
      order: { createdAt: 'ASC' },
    });

    // تبدیل به درخت
    return this.buildTree(allComments);
  }

  private buildTree(comments: Comment[]): Comment[] {
    const map = new Map<number, Comment & { children: Comment[] }>();
    const roots: Comment[] = [];

    // اول همه رو با children خالی بساز
    comments.forEach((comment) => {
      map.set(comment.id, { ...comment, children: [] });
    });

    // بعد هر کدوم رو به والدش وصل کن
    comments.forEach((comment) => {
      const node = map.get(comment.id)!;

      if (!comment.parentId) {
        roots.push(node);
      } else {
        const parent = map.get(comment.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  }

  async getAllComments() {
    return this.commentRepo.find();
  }
}
