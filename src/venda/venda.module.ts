import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity.js';
import { CriarVendaUseCase } from './use-cases/criar-venda.use-case.js';
import { Anuncio } from '../anuncio/entities/anuncio.entity.js';
import { BuscarVendaPorIdUseCase } from './use-cases/buscar-venda-por-id.use-case.js';
import { BuscarVendasPorVendedorIdUseCase } from './use-cases/buscar-vendas-por-vendedor-id.use-case.js';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, Anuncio]),],
  controllers: [VendaController],
  providers: [
    CriarVendaUseCase,
    BuscarVendaPorIdUseCase,
    BuscarVendasPorVendedorIdUseCase

  ],
})
export class VendaModule {}
