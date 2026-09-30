import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class DesativarCategoriaPorIdUseCase{
    constructor(@InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>){}

    async executar(id: string){
        const categoria = await this.categoriaRepository.findOneBy({id: id})
        if (!categoria){
            throw new NotFoundException("Categoria não encontrada");
        }

        categoria.ativo = false;
        await this.categoriaRepository.save(categoria);
        return "categoria desativada com sucesso";
    }
}