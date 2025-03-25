/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Authors } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Authors)
    private authorsRepository: Repository<Authors>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(newAuthor);
  }

  findAll() {
    return this.authorsRepository.find();
  }

  findOne(id: number) {
    return this.authorsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.authorsRepository.delete(id);
  }

  async findBooksByAuthor(id: number) {
    return this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }
}

