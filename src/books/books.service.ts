/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  findAll() {
    return this.booksRepository.find();
  }

  findOne(id: number) {
    return this.booksRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.booksRepository.delete(id);
  }
}