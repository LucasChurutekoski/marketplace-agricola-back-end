import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarCategoriasUseCase{
    constructor(@InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>){}

    async executar(){
        return await this.categoriaRepository.find();
    }
}