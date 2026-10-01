import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";
import { UpdateAnuncioDto } from "../dto/update-anuncio.dto.js";

@Injectable()
export class EditarAnuncioPorIdUseCase{

    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>){}

    async executar(id: string, dto: UpdateAnuncioDto, usuarioId: string){
        const anuncioExiste = await this.anuncioRepository.findOneBy({id: id, usuario: {id: usuarioId }})
        if (!anuncioExiste){
            throw new NotFoundException("Anúncio não encontrado");
        }

        Object.assign(anuncioExiste, dto);

        return await this.anuncioRepository.save(anuncioExiste);
    }
}