import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Books } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Books])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
