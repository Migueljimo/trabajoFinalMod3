import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conﬁgService: ConfigService) => ({
        type: 'postgres',
        host: conﬁgService.get<string>('DB_HOST'),
        port: conﬁgService.get<number>('DB_PORT'),
        username: conﬁgService.get<string>('DB_USER'),
        password: conﬁgService.get<string>('DB_PASS'),
        database: conﬁgService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: conﬁgService.get<boolean>('DB_SYNCHRONIZE'),
        extra: {
          timezone: 'America/La_Paz',
        },
        logging: true,
      }),
    }),
    AuthorsModule,
    BooksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
