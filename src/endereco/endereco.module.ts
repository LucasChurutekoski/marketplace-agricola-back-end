import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity.js';
import { CriarEnderecoUseCase } from './use-cases/criar-endereco.use-case.js';
import { BuscarEnderecoPorIdUseCase } from './use-cases/buscar-endereco-por-id.use-case.js';
import { BuscarEnderecoPorUsuarioIdUseCase } from './use-cases/buscar-endereco-por-usuario-id.use-case.js';
import { EditarEnderecoPorIdUseCase } from './use-cases/editar-endereco-por-id.use-case.js';
import { ExcluirEnderecoPorIdUseCase } from './use-cases/excluir-endereco-por-id.use-case.js';

@Module({
  imports:[TypeOrmModule.forFeature([Endereco])],
  controllers: [EnderecoController],
  providers: [
    CriarEnderecoUseCase,
    BuscarEnderecoPorIdUseCase,
    BuscarEnderecoPorUsuarioIdUseCase,
    EditarEnderecoPorIdUseCase,
    ExcluirEnderecoPorIdUseCase
  ],
})
export class EnderecoModule {}
