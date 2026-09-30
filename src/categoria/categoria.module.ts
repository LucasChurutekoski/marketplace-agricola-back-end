import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller.js';
import { CriarCategoriaUseCase } from './use-cases/criar-categoria.use-case.js';
import { Categoria } from './entities/categoria.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscarCategoriasUseCase } from './use-cases/buscar-categorias.use-case.js';
import { BuscarCategoriaPorIdUseCase } from './use-cases/buscar-categoria-por-id.use-case.js';
import { AtualizarCategoriaPorIdUseCase } from './use-cases/atualizar-categoria-por-id.use-case.js';
import { DesativarCategoriaPorIdUseCase } from './use-cases/desativar-categoria-por-id.use-case.js';

@Module({
  imports:[TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [
    CriarCategoriaUseCase,
    BuscarCategoriasUseCase,
    BuscarCategoriaPorIdUseCase,
    AtualizarCategoriaPorIdUseCase,
    DesativarCategoriaPorIdUseCase
  ],
})
export class CategoriaModule {}
