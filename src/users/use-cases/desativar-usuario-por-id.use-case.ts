import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class DesativarUsuarioPorIdUseCase {
    constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>) { }

    async executar(id: string) {
        const usuario = await this.usuarioRepository.findOneBy({ id: id })

        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado")
        }
        usuario.ativo = false;
        usuario.atualizadoEm = new Date();
        await this.usuarioRepository.save(usuario);
        return 'Usuário desativado com sucesso';
    }
}