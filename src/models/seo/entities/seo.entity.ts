import { RefType } from 'src/enums/ref-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('seo')
export class Seo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refId: number;

  @Column({ type: 'enum', enum: RefType })
  refType: RefType;

  @Column({ nullable: true })
  metaTitle: string;

  @Column({ nullable: true })
  metaDescription: string;

  @Column({ nullable: true })
  metaKeywords: string;

  @Column({ nullable: true })
  canonical: string;

  @Column({ nullable: true })
  ogTitle: string;

  @Column({ nullable: true })
  ogDescription: string;

  @Column({ nullable: true })
  ogImage: string;

  @Column({ nullable: true })
  robots: string;

  @Column({ type: 'json', nullable: true })
  schema: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
