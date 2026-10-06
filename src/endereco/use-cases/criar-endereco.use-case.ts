import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Endereco } from "../entities/endereco.entity.js";
import { Repository } from "typeorm";
import { CreateEnderecoDto } from "../dto/create-endereco.dto.js";

@Injectable()
export class CriarEnderecoUseCase{
    constructor(@InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>){}

    async executar(dto: CreateEnderecoDto, usuarioId: string){
        const endereco = await this.enderecoRepository.create({
            cep: dto.cep,
            cidade: dto.cidade,
            uf: dto.uf,
            bairro: dto.bairro,
            rua: dto.rua,
            numero: dto.numero,
            latitude: dto.latitude,
            longitude: dto.longitude,
            ativo: dto.ativo,
            usuario: { id: usuarioId}
        })

        return await this.enderecoRepository.save(endereco);
    }
}