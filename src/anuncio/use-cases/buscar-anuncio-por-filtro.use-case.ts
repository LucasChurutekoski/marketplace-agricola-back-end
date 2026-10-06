import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarAnuncioPorFiltroUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>) {}

    async executar(){
        return "buscar anuncio filtrado"
    }
}