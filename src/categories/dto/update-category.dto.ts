import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Título de categoría',
    example: 'Suspenso',
  })
  @IsOptional()
  @IsString({ message: 'Título debe ser una cadena de texto' })
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción de categoría',
    example: '',
  })
  @IsOptional()
  @IsString({ message: 'Descripción debe ser una cadena de texto' })
  description: string;

  @ApiPropertyOptional({
    description: 'Estado de categoría',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean({ message: 'Habilitado debe ser tipo boleano' })
  enabled: boolean;
}
