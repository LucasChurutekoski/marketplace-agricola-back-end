import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity.js';
import { CriarUsuarioUseCase } from './use-cases/criar-usuario.use-case.js';
import { BuscarUsuarioPorIdUseCase } from './use-cases/buscar-usuario-por-id.use-case.js';
import { BuscarUsuariosUseCase } from './use-cases/buscar-usuarios.use-case.js';
import { AtualizarUsuarioPorIdUseCase } from './use-cases/atualizar-usuario-por-id.use-case.js';
import { DesativarUsuarioPorIdUseCase } from './use-cases/desativar-usuario-por-id.use-case.js';
import { BuscarVendedoresUseCase } from './use-cases/buscar-todos-vendedores.use-case.js';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsersController],
  providers: [
    CriarUsuarioUseCase,
    BuscarUsuarioPorIdUseCase,
    BuscarUsuariosUseCase,
    BuscarVendedoresUseCase,
    AtualizarUsuarioPorIdUseCase,
    DesativarUsuarioPorIdUseCase
  ],
})
export class UsersModule {}
