import { UpdateBlogDto } from 'src/models/blog/dto/update-blog-dto';
import { ProductCategory } from 'src/models/product-categories/entities/product-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ProductCategory, (pc) => pc.products)
  category: ProductCategory;
}
