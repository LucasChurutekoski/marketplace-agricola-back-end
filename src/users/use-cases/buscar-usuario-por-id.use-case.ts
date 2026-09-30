import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarUsuarioPorIdUseCase {
    constructor(@InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>) { }

    async executar(id: string) {
        const usuarioExiste = await this.userRepository.findOneBy({ id: id })
        if (!usuarioExiste) {
            throw new NotFoundException("Usuário não encontrado")
        }
        return usuarioExiste;
    }
}