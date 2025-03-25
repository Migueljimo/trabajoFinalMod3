/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { Authors } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
