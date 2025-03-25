import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsNumber()
  publication_year: number;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  author_id: number;
}

export class UpdateBookDto {
  @IsString()
  title?: string;

  @IsString()
  isbn?: string;

  @IsString()
  publisher?: string;

  @IsNumber()
  publication_year?: number;

  @IsString()
  genre?: string;

  @IsNumber()
  authorId?: number;
}
