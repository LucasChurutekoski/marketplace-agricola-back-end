import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class AtualizarUsuarioPorIdUseCase {
    constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>) { }

    async executar(id: string, dto: UpdateUserDto) {
        const usuarioExiste = await this.usuarioRepository.findBy({ id: id })

        if (!usuarioExiste) {
            throw new NotFoundException('Usuário não encontrado')
        }

        const usuarioAtualizado = await this.usuarioRepository.update({ id: id }, {
            nome: dto.nome,
            email: dto.email,
            telefone: dto.telefone,
            tipoUsuario: dto.tipoUsuario
        })

        return "Usuário atualizado com sucesso";
    }
}

