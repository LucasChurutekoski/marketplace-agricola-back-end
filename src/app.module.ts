import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module.js';
import { CategoriaModule } from './categoria/categoria.module.js';
import { AnuncioModule } from './anuncio/anuncio.module.js';
import { AuthModule } from './auth/auth.module.js';
import { EnderecoModule } from './endereco/endereco.module.js';
import { VendaModule } from './venda/venda.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UsersModule, AuthModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    UsersModule,
    CategoriaModule,
    AnuncioModule,
    EnderecoModule,
    VendaModule,
  ],
})
export class AppModule { }