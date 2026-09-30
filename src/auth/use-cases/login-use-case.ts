import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Usuario } from '../../users/entities/user.entity.js';
import { LoginDto } from '../dto/login.dto.js';

@Injectable()
export class LoginUseCase {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        private readonly jwtService: JwtService,
    ) { }

    async executar(dto: LoginDto) {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                email: dto.email,
            },
        });

        if (!usuario) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(
            dto.senha,
            usuario.senha,
        );

        if (!senhaValida) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        if (!usuario.ativo) {
            throw new UnauthorizedException('Usuário inativo');
        }

        const payload = {
            sub: usuario.id,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}