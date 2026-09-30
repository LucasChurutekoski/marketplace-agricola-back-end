import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity.js";
import { Repository } from "typeorm";
import { NotFoundError } from "rxjs";

@Injectable()
export class BuscarCategoriaPorIdUseCase{
    constructor(@InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>) {}

    async executar(id: string){
        const categoria = await this.categoriaRepository.findOneBy({id: id});
        if(!categoria){
            throw new NotFoundException("Categoria não encontrada");
        }
        return categoria;
    }
}