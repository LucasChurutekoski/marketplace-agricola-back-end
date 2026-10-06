import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Venda } from "../entities/venda.entity.js";
import { Repository } from "typeorm";
import { CreateVendaDto } from "../dto/create-venda.dto.js";
import { Anuncio } from "../../anuncio/entities/anuncio.entity.js";

@Injectable()
export class CriarVendaUseCase {

    constructor(
        @InjectRepository(Venda) private readonly vendaRepository: Repository<Venda>,
        @InjectRepository(Anuncio) private readonly anuncioRepository: Repository<Anuncio>
    ) { }

    async executar(dto: CreateVendaDto, vendedorId: string) {
        const anuncio = await this.anuncioRepository.findOneBy({ id: dto.anuncioId, usuario: { id: vendedorId}})
        if (!anuncio) {
            throw new NotFoundException("Anúncio não encontrado, não foi possível registrar uma venda");
        }

        if (anuncio.quantidadeDisponivel < dto.quantidade) {
            throw new BadRequestException("Quantidade de venda maior que a quantidade disponível");
        }

        const valorTotal = anuncio.valorUnitario * dto.quantidade;

        const venda = await this.vendaRepository.create({
            vendedor: { id: vendedorId },
            comprador: dto.compradorId
                ? { id: dto.compradorId }
                : null,
            quantidade: dto.quantidade,
            valorUnitario: anuncio.valorUnitario,
            valorTotal: valorTotal,
            anuncio: { id: anuncio.id },
            status: dto.status
        })

        anuncio.quantidadeDisponivel = anuncio.quantidadeDisponivel - dto.quantidade;

        await this.vendaRepository.save(venda);
        await this.anuncioRepository.save(anuncio);
        return "Venda registrada com sucesso";

    }
}