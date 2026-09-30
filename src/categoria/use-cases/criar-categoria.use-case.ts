import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity.js";
import { Repository } from "typeorm";
import { CreateCategoriaDto } from "../dto/create-categoria.dto.js";

@Injectable()
export class CriarCategoriaUseCase{

    constructor(@InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>){}

    async executar(dto: CreateCategoriaDto){
        const categoriaNova = await this.categoriaRepository.create({
            nome: dto.nome,
            descricao: dto.descricao,
            ativo: dto.ativo
        })

        await this.categoriaRepository.save(categoriaNova);
        return `Categoria criada com sucesso: ${categoriaNova}`
    }
}