import { BlogPost } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @OneToMany(() => BlogPost, (BlogPost) => BlogPost.author)
  posts: BlogPost[];
}
