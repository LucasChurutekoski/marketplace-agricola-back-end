import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-usuario.dto.js";
import * as bcrypt from 'bcrypt'

@Injectable()
export class CriarUsuarioUseCase {
    constructor(@InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>) { }

    async executar(dto: CreateUserDto) {
        const usuarioExistente = await this.userRepository.findOne({ where: { email: dto.email } });

        if (usuarioExistente) {
            throw new ConflictException('Usuário já existe');
        }

        const senhaHash = await bcrypt.hash(dto.senha, 10);

        const usuario = await this.userRepository.create({
            nome: dto.nome,
            email: dto.email,
            telefone: dto.telefone,
            senha: senhaHash,
            tipoUsuario: dto.tipoUsuario
        });
        return await this.userRepository.save(usuario);
    }
}