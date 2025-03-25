/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Authors } from "src/authors/entities/author.entity";
import { Category } from "src/categories/entities/category.entity";

@Entity('books')
export class Books {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column({ length: 20, unique: true })
    isbn: string;

    @Column({ length: 100 })
    publisher: string;

    @Column()
    publication_year: number;

    @Column({ length: 50 })
    genre: string;

    @ManyToOne(() => Authors, (author) => author.books, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: Authors;

    @ManyToOne(() => Category, (category) => category.books, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'category_id' }) // Agrega la columna category_id en la BD
    category: Category;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: true })
    updated_at: Date;

    @Column({ name: 'created_by', type: 'int', nullable: true }) // ID del usuario que crea el libro
    createdBy: number;

    @Column({ name: 'updated_by', type: 'int', nullable: true }) // ID del usuario que actualiza el libro
    updatedBy: number;
}
