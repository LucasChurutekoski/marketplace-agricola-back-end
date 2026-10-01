import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  Delete,
} from '@nestjs/common';

import type { Request as ExpressRequest } from 'express';

import { CreateAnuncioDto } from './dto/create-anuncio.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CriarAnuncioUseCase } from './use-cases/criar-anuncio.use-case.js';
import { BuscarAnunciosUseCase } from './use-cases/buscar-anuncios.use-case.js';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto.js';
import { EditarAnuncioPorIdUseCase } from './use-cases/editar-anuncio-por-id.use-case.js';
import { StatusAnuncioEnum } from './enums/StatusAnuncioEnum.js';
import { AlterarStatusAnuncioPorIdUseCase } from './use-cases/alterar-status-anuncio-por-id.use-case.js';
import { ExcluirAnuncioPorIdUseCase } from './use-cases/excluir-anuncio-por-id.use-case.js';
import { buscarAnuncioPorIdUseCase } from './use-cases/buscar-anuncio-por-id.use-case.js';

@Controller('anuncios')
export class AnuncioController {
  constructor(
    private readonly criarAnuncioUseCase: CriarAnuncioUseCase,
    private readonly buscarAnunciosUseCase: BuscarAnunciosUseCase,
    private readonly editarAnuncioPorIdUseCase: EditarAnuncioPorIdUseCase,
    private readonly alterarStatusAnuncioPorIdUseCase: AlterarStatusAnuncioPorIdUseCase,
    private readonly excluirAnuncioPorIdUseCase: ExcluirAnuncioPorIdUseCase,
    private readonly buscarAnuncioPorIdUseCase: buscarAnuncioPorIdUseCase
  ) { }

  @Get()
  buscarTodos() {
    return this.buscarAnunciosUseCase.executar();
  }

  @Get(':id')
  buscar(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
    })) id: string
  ) {
    return this.buscarAnuncioPorIdUseCase.executar(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createAnuncioDto: CreateAnuncioDto,
    @Request() req: ExpressRequest,
  ) {
    return this.criarAnuncioUseCase.executar(
      createAnuncioDto,
      req.user!.id,
      req.user!.tipoUsuario
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  editar(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
    })) id: string,
    @Body() updateAnuncioDto: UpdateAnuncioDto,
    @Request() req: ExpressRequest
  ) {
    return this.editarAnuncioPorIdUseCase.executar(id, updateAnuncioDto, req.user!.id)
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  alterarStatus(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
    })) id: string,
    @Body('status') status: StatusAnuncioEnum,
    @Request() req: ExpressRequest
  ) {
    return this.alterarStatusAnuncioPorIdUseCase.executar(id, req.user!.id, status)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  excluirAnuncio(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string,
    @Request() req: ExpressRequest
  ) {
    return this.excluirAnuncioPorIdUseCase.executar(id, req.user!.id)
  }
}