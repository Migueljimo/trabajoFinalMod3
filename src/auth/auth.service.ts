/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existsUser = await this.usersRepository.exists({
      where: [{ login: createUserDto.login }, { email: createUserDto.email }],
    });
    if (existsUser) {
      throw new ConflictException(
        'El login o email ya se encuentra registrado con otro usuario',
      );
    }
    // saltRounds = 10, es recomendable ya que mayor valor aumenta la complejidad del hash pero también el uso de procesador
    const hashedPassword = await bcrypt.hash(
      this.configService.get<string>('ENCRYPTION_KEY') + createUserDto.password,
      10,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        role: true,
        password: true,
        fullname: true,
        email: true,
        phone: true,
      },
      where: {
        login: loginDto.login,
      },
    });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        this.configService.get<string>('ENCRYPTION_KEY') + loginDto.password,
        user.password,
      );
      if (isPasswordMatch) {
        const payload = {
          ...user,
          password: undefined,
        };

        return {
          access_token: this.jwtService.sign(
            { ...payload, token_type: 'ACCESS' },
            {
              expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN')}m`,
            },
          ),
          refresh_token: this.jwtService.sign(
            { ...payload, token_type: 'REFRESH' },
            {
              expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN')}m`,
            },
          ),
        };
      }
    }

    throw new UnauthorizedException(`El login o contraseña no son válidos`);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const payload = this.verifyToken(refreshTokenDto.refresh_token, 'REFRESH');

    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        role: true,
        fullname: true,
        email: true,
        phone: true,
      },
      where: {
        login: refreshTokenDto.login,
      },
    });
    if (user) {
      const payload = {
        ...user,
        token_type: 'ACCESS'
      };

      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN')}m`,
        }),
      };
    }

    throw new UnauthorizedException(`El login no es válido`);
  }

  verifyToken(token: string, tokenType: string): any {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      if (payload.token_type != tokenType) {
        throw new UnauthorizedException('El Token es inválido');
      }
      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El Token está expirado');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('El Token es inválido');
      } else {
        throw new UnauthorizedException('La validación del token ha fallado');
      }
    }
  }
}
