import { Module } from '@nestjs/common';
import { AnuncioController } from './anuncio.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from './entities/anuncio.entity.js';
import { CriarAnuncioUseCase } from './use-cases/criar-anuncio.use-case.js';
import { BuscarAnunciosUseCase } from './use-cases/buscar-anuncios.use-case.js';
import { EditarAnuncioPorIdUseCase } from './use-cases/editar-anuncio-por-id.use-case.js';
import { AlterarStatusAnuncioPorIdUseCase } from './use-cases/alterar-status-anuncio-por-id.use-case.js';
import { ExcluirAnuncioPorIdUseCase } from './use-cases/excluir-anuncio-por-id.use-case.js';
import { buscarAnuncioPorIdUseCase } from './use-cases/buscar-anuncio-por-id.use-case.js';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnuncioController],
  providers: [
    CriarAnuncioUseCase,
    BuscarAnunciosUseCase,
    buscarAnuncioPorIdUseCase,
    EditarAnuncioPorIdUseCase,
    AlterarStatusAnuncioPorIdUseCase,
    ExcluirAnuncioPorIdUseCase
  ],
})
export class AnuncioModule {}
