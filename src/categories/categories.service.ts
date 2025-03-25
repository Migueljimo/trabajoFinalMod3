/* eslint-disable prettier/prettier */
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Books } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  private async findOneOrFail(
    id: number,
    relations = false,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: {
        books: relations === true ? true : false,
      },
      select: {
        books: {
          id: true,
          title: true,
          publication_year: true,
          genre: true,
        },
      },
    });
    if (!category) {
      throw new NotFoundException(`La categoría con el Id ${id} no existe`);
    }
    return category;
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    login: string,
    role: UserRoleEnum,
  ): Promise<Category> {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException(
        'Su usuario no cuenta con los suficientes permisos',
      );
    }

    const existsCategory = await this.categoriesRepository.exists({
      where: {
        title: createCategoryDto.title,
      },
    });
    if (existsCategory) {
      throw new ConflictException('El título ya está registrado');
    }
    return this.categoriesRepository.save({
      ...createCategoryDto,
      createdBy: login,
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    relations = false,
  ): Promise<{ data: Category[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.categoriesRepository.findAndCount({
      skip: page > 0 ? (page - 1) * limit : 0,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        books: {
          id: true,
          title: true,
          publication_year: true,
          genre: true,
        },
      },
      relations: {
        books: relations ? true : false,
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  findOne(id: number, relations: boolean): Promise<Category> {
    return this.findOneOrFail(id, relations);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    login: string,
    role: UserRoleEnum
  ): Promise<Category> {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException(
        'Su usuario no cuenta con los suficientes permisos',
      );
    }

    const category = await this.findOneOrFail(id);

    if (updateCategoryDto.title != null) {
      category.title = updateCategoryDto.title;
    }
    if (updateCategoryDto.description != null) {
      category.description = updateCategoryDto.description;
    }
    // if (updateCategoryDto.enabled != null) {
    //   category.enabled = updateCategoryDto.enabled;
    // }
    category.updatedBy = login;

    return this.categoriesRepository.save(category);
  }

  async remove(id: number, cascade: boolean, role: UserRoleEnum) {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException(
        'Su usuario no cuenta con los suficientes permisos',
      );
    }

    const category = await this.findOneOrFail(id);
    if (cascade) {
      await this.booksRepository.delete({ category });
      return this.categoriesRepository.delete(id);
    } else {
      const countBooks = await this.booksRepository.countBy({
        category: { id: id },
      });
      if (countBooks > 0) {
        throw new ConflictException({
          message: `La categoría no se puede eliminar porque tiene ${countBooks} películas asociadas`,
        });
      } else {
        return this.categoriesRepository.delete(id);
      }
    }
  }

  async findBooks(id: number): Promise<Books[]> {
    const category = await this.findOneOrFail(id, true);
    return category.books;
  }
}