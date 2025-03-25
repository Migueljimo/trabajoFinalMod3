/* eslint-disable prettier/prettier */
import { Books } from 'src/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
@Unique(['title'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 180, nullable: true })
  description: string;

  // @Column({ default: false })
  // enabled: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', nullable: true })
  updated_at: Date;

  @Column({
    name: 'created_by',
    type: 'character varying',
    length: 30,
    nullable: true,
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    type: 'character varying',
    length: 30,
    nullable: true,
  })
  updatedBy: string;

  @OneToMany(() => Books, (book) => book.category)
  books: Books[];
}