import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class ExcluirAnuncioPorIdUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>){}

    async executar(id: string, usuarioId: string){
        const anuncio = await this.anuncioRepository.findOneBy({id: id, usuario: {id: usuarioId}})
        if(!anuncio){
            throw new NotFoundException("Anúncio não encontrado");
        }

        await this.anuncioRepository.remove(anuncio);
        return "Anúncio excluído com sucesso";
    }
}