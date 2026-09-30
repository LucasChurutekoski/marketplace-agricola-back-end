import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { CriarCategoriaUseCase } from './use-cases/criar-categoria.use-case.js';
import { BuscarCategoriasUseCase } from './use-cases/buscar-categorias.use-case.js';
import { BuscarCategoriaPorIdUseCase } from './use-cases/buscar-categoria-por-id.use-case.js';
import { AtualizarCategoriaPorIdUseCase } from './use-cases/atualizar-categoria-por-id.use-case.js';
import { DesativarCategoriaPorIdUseCase } from './use-cases/desativar-categoria-por-id.use-case.js';

@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly criarCategoriaUseCase: CriarCategoriaUseCase,
    private readonly buscarCategoriaUseCase: BuscarCategoriasUseCase,
    private readonly buscarCategoriaPorIdUseCase: BuscarCategoriaPorIdUseCase,
    private readonly atualizarCategoriaPorIdUseCase: AtualizarCategoriaPorIdUseCase,
    private readonly desativarCategoriaPorIdUseCase: DesativarCategoriaPorIdUseCase
  ) { }

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.criarCategoriaUseCase.executar(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.buscarCategoriaUseCase.executar();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string) {
    return this.buscarCategoriaPorIdUseCase.executar(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.atualizarCategoriaPorIdUseCase.executar(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desativarCategoriaPorIdUseCase.executar(id);
  }
}
