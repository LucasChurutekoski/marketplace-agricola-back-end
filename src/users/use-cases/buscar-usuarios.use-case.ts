import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarUsuariosUseCase{
    constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>){}

    async executar(){
        return await this.usuarioRepository.find()
    }
}