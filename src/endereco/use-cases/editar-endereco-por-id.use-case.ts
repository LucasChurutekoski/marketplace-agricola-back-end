import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Endereco } from "../entities/endereco.entity.js";
import { Repository } from "typeorm";
import { UpdateEnderecoDto } from "../dto/update-endereco.dto.js";

@Injectable()
export class EditarEnderecoPorIdUseCase{
    constructor(@InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>) {}

    async executar(id: string, dto: UpdateEnderecoDto){
        const endereco = await this.enderecoRepository.findOneBy({id: id});
        if (!endereco) {
            throw new NotFoundException("Endereço não encontrado");
        }

        Object.assign(endereco, dto);

        await this.enderecoRepository.save(endereco);
        return "Endereço editado com sucesso";
    }
}