import { Author } from 'src/models/author/entities/author.entity';
import { Tag } from 'src/models/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  // JoinColumn,
  ManyToOne,
  OneToOne,
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

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  image: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];
}
