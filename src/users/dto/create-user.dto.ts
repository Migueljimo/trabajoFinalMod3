/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login o username de Usuario',
    example: 'juan.perez',
  })
  @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
  @IsString({ message: 'Login debe ser una cadena de texto' })
  login: string;

  @ApiProperty({
    description: 'Contraseña de usuario',
    example: '123456',
  })
  @IsNotEmpty({ message: 'Contraseña no puede ser un valor vacío' })
  @IsString({ message: 'Contraseña debe ser una cadena de texto' })
  password: string;

  @ApiProperty({
    description: 'Nombre completo',
    example: 'Juan Perez',
  })
  @IsNotEmpty({ message: 'Nombre no puede ser un valor vacío' })
  @IsString({ message: 'Nombre debe ser una cadena de texto' })
  fullname: string;

  @ApiProperty({
    description: 'Correo electrónica',
    example: 'juanperez@gmail.com',
  })
  @IsNotEmpty({ message: 'Email no puede ser un valor vacío' })
  @IsEmail({}, { message: 'Email debe ser un correo electrónico válido' })
  email: string;

  @ApiPropertyOptional({
    description: 'Teléfono',
    example: '3333333',
  })
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Rol de usuario',
    example: '',
  })
  role: UserRoleEnum;
}
