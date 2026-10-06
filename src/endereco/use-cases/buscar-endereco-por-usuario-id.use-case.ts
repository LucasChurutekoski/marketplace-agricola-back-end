import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Endereco } from "../entities/endereco.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarEnderecoPorUsuarioIdUseCase{
    constructor(@InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>) {}

    async executar(id: string){
        return await this.enderecoRepository.findBy({usuario: { id: id}});
    }


}