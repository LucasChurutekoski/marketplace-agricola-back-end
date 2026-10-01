import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";
import { StatusAnuncioEnum } from "../enums/StatusAnuncioEnum.js";

@Injectable()
export class AlterarStatusAnuncioPorIdUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>){}

    async executar(id: string, usuarioId: string, status: StatusAnuncioEnum){
        const anuncioExiste = await this.anuncioRepository.findOneBy({id: id, usuario: {id: usuarioId}})
        if(!anuncioExiste){
            throw new NotFoundException("Anuncio não encontrado");
        }
        anuncioExiste.status = status;
        return await this.anuncioRepository.save(anuncioExiste);
    }
}