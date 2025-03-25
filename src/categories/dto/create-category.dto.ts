/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Título de categoría',
    example: 'Suspenso',
  })
  @IsNotEmpty({ message: 'Título no puede ser un valor vacío' })
  @IsString({ message: 'Título debe ser una cadena de texto' })
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción de categoría',
    example: '',
  })
  @IsOptional()
  @IsString({ message: 'Descripción debe ser una cadena de texto' })
  description: string;

  // @ApiPropertyOptional({
  //   description: 'Estado de categoría',
  //   example: 'true',
  // })
  @IsBoolean({ message: 'Habilitado debe ser tipo boleano' })
  enabled: boolean;
}
