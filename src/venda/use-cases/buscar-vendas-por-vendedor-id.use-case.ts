import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Venda } from "../entities/venda.entity.js";
import { Repository } from "typeorm";
import { Anuncio } from "../../anuncio/entities/anuncio.entity.js";

@Injectable()
export class BuscarVendasPorVendedorIdUseCase {

    constructor(@InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>) { }

    async executar(vendedorId: string) {
        const vendas = await this.vendaRepository.find({
            where: {
                vendedor: {id: vendedorId} ,
            },
            relations: {
                anuncio: true,
            },
        });
        if (!vendas) {
            throw new NotFoundException("Nenhuma venda registrada para esse vendedor");
        }
        return vendas;
    }
}