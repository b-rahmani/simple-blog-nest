import { RefType } from 'src/enums/ref-type.enum';
import { User } from 'src/models/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentLike } from './comment-like.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refId: number;

  @Column({ type: 'enum', enum: RefType })
  refType: RefType;

  //user
  // @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user: User;

  @Column()
  userId: number;

  //reply system
  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Comment;

  @Column({ nullable: true })
  parentId: number;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @Column('text')
  body: string;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: false })
  isActive: boolean;

  //like
  @OneToMany(() => CommentLike, (like) => like.comment)
  likes: CommentLike[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
