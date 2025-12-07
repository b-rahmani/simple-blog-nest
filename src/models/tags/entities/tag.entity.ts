import { RefType } from 'src/enums/ref-type.enum';
import { BlogPost } from 'src/models/blog/entities/blog.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => BlogPost, (post) => post.tags)
  posts: BlogPost[];
}
