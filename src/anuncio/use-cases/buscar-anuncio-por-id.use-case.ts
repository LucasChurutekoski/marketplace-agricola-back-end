import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class buscarAnuncioPorIdUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>) {}

    async executar(id: string){
        const anuncio = await this.anuncioRepository.findOneBy({id: id});
        if(!anuncio){
            throw new NotFoundException("O anúncio não foi encontrado");
        }
        return anuncio;
    }
}