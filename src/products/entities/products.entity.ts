import { ProductCategory } from 'src/product-categories/entities/product-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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
