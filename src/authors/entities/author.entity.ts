/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OneToMany } from "typeorm";
import { Books } from "src/books/entities/book.entity";

@Entity('authors')
@Unique(['name'])
export class Authors {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    nationality: string;
 
    @Column({ type: 'date' })
    birth_date: string;

    @OneToMany(() => Books, (book) => book.author)
    books: Books[];

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: true })
    updated_at: Date;

    @Column({ name: 'created_by', type: 'int', nullable: true }) // Almacena el ID del usuario
    createdBy: number;

    @Column({ name: 'updated_by', type: 'int', nullable: true }) // Almacena el ID del usuario que actualiza
    updatedBy: number;

} 
