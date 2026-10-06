import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Venda } from "../entities/venda.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class BuscarVendaPorIdUseCase{
    constructor(@InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>) {}

    async executar(id: string, vendedorId: string){
        const venda = await this.vendaRepository.findOneBy({id: id, vendedor: {id: vendedorId}});
        if(!venda){
            throw new NotFoundException("Venda não encontrada");
        }
        return venda;
    }
}