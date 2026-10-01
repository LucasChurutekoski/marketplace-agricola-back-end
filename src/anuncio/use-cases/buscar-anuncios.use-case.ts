import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";
import { Usuario } from "../../users/entities/user.entity.js";

@Injectable()
export class BuscarAnunciosUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>){}

    async executar(){
        return await this.anuncioRepository.find({relations: { usuario: true}});
    }

}