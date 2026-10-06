import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Endereco } from "../entities/endereco.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class ExcluirEnderecoPorIdUseCase{
    constructor(@InjectRepository(Endereco) private readonly enderecoRepository: Repository<Endereco>){}

    async executar(id: string){
        const endereco = await this.enderecoRepository.findOneBy({id: id});
        if(!endereco){
            throw new Error("Endereço não encontrado");
        }
        await this.enderecoRepository.remove(endereco);
        return "Endereço excluído com sucesso";
    }

}