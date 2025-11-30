import { BlogPost } from 'src/blog/entities/blog.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  //   @Column()
  //   createdAt: Date;

  @ManyToMany(() => BlogPost, (post) => post.tags)
  posts: BlogPost[];
}
