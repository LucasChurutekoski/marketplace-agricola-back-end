import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto.js';
import { UpdateEnderecoDto } from './dto/update-endereco.dto.js';
import { CriarEnderecoUseCase } from './use-cases/criar-endereco.use-case.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { Request as ExpressRequest } from 'express';
import { BuscarEnderecoPorIdUseCase } from './use-cases/buscar-endereco-por-id.use-case.js';
import { BuscarEnderecoPorUsuarioIdUseCase } from './use-cases/buscar-endereco-por-usuario-id.use-case.js';
import { EditarEnderecoPorIdUseCase } from './use-cases/editar-endereco-por-id.use-case.js';
import { ExcluirEnderecoPorIdUseCase } from './use-cases/excluir-endereco-por-id.use-case.js';

@Controller('enderecos')
export class EnderecoController {
  constructor(
    private readonly criarEnderecoUseCase: CriarEnderecoUseCase, 
    private readonly buscarEnderecoPorIdUseCase: BuscarEnderecoPorIdUseCase,
    private readonly buscarEnderecoPorUsuarioIdUseCase: BuscarEnderecoPorUsuarioIdUseCase,
    private readonly editarEnderecoPorIdUsecase: EditarEnderecoPorIdUseCase,
    private readonly excluirEnderecoPorIdUseCase: ExcluirEnderecoPorIdUseCase
  ){}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createEnderecoDto: CreateEnderecoDto,
    @Request() req: ExpressRequest
  ) {
    return this.criarEnderecoUseCase.executar(createEnderecoDto, req.user!.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: ExpressRequest) {
    return this.buscarEnderecoPorUsuarioIdUseCase.executar(req.user!.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buscarEnderecoPorIdUseCase.executar(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.editarEnderecoPorIdUsecase.executar(id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excluirEnderecoPorIdUseCase.executar(id);
  }
}
