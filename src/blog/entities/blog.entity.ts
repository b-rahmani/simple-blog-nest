import { Author } from 'src/author/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;
}
