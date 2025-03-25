import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Login de usuario',
    example: 'juan.perez',
  })
  @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
  @IsString({ message: 'Login debe ser una cadena de texto' })
  login: string;

  @ApiProperty({
    description: 'Refresh Token',
    example: '',
  })
  @IsNotEmpty({ message: 'El refresh token no puede ser un valor vacío' })
  @IsString({ message: 'El refresh token debe ser una cadena de texto' })
  refresh_token: string;
}
