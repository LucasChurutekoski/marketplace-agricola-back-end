import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CriarUsuarioUseCase } from './use-cases/criar-usuario.use-case.js';
import { BuscarUsuarioPorIdUseCase } from './use-cases/buscar-usuario-por-id.use-case.js';
import { BuscarUsuariosUseCase } from './use-cases/buscar-usuarios.use-case.js';
import { AtualizarUsuarioPorIdUseCase } from './use-cases/atualizar-usuario-por-id.use-case.js';
import { BuscarVendedoresUseCase } from './use-cases/buscar-todos-vendedores.use-case.js';
import { DesativarUsuarioPorIdUseCase } from './use-cases/desativar-usuario-por-id.use-case.js';

@Controller('usuarios')
export class UsersController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly buscarUsuarioPorIdUseCase: BuscarUsuarioPorIdUseCase,
    private readonly buscarUsuariosUseCase: BuscarUsuariosUseCase,
    private readonly atualizarUsuarioPorIdUseCase: AtualizarUsuarioPorIdUseCase,
    private readonly buscarVendedoresUseCase: BuscarVendedoresUseCase,
    private readonly desativarUsuarioPorIdUseCase: DesativarUsuarioPorIdUseCase
  ) { }

  @Get()
  buscarTodos() {
    return this.buscarUsuariosUseCase.executar();
  }
  @Get('/vendedores')
  buscaTodosVendedores() {
    return this.buscarVendedoresUseCase.executar();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string) {
    return this.buscarUsuarioPorIdUseCase.executar(id);
  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.criarUsuarioUseCase.executar(createUserDto);
  }


  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.atualizarUsuarioPorIdUseCase.executar(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string) {
    return this.desativarUsuarioPorIdUseCase.executar(id);
  }
}
