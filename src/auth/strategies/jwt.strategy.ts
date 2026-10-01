import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { tipoUsuarioEnum } from '../../users/enum/userRole.enum.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService,
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET não configurado');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: {
        sub: string;
        email: string;
        tipoUsuario: tipoUsuarioEnum;
    }) {
        return {
            id: payload.sub,
            email: payload.email,
            tipoUsuario: payload.tipoUsuario,
        };
    }
}