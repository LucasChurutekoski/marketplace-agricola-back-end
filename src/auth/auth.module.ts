import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Usuario } from '../users/entities/user.entity.js';
import { AuthController } from './auth.controller.js';
import { LoginUseCase } from './use-cases/login-use-case.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Usuario]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: (configService: ConfigService) => {
                const jwtSecret = configService.get<string>('JWT_SECRET');

                if (!jwtSecret) {
                    throw new Error('JWT_SECRET não configurado');
                }

                return {
                    secret: jwtSecret,
                    signOptions: {
                        expiresIn: '1d',
                    },
                };
            },
        }),
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        LoginUseCase,
        JwtStrategy
    ],

    exports: [
        JwtModule,
        PassportModule,
    ],
})
export class AuthModule {}