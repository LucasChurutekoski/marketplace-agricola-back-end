import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/user.entity.js";
import { Repository } from "typeorm";
import { tipoUsuarioEnum } from "../enum/userRole.enum.js";

@Injectable()
export class BuscarVendedoresUseCase{
    constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>){}
    
    async executar(){
        return await this.usuarioRepository.find({where : {tipoUsuario: tipoUsuarioEnum.VENDEDOR }})
    }
}