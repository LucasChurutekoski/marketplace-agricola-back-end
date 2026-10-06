import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CriarVendaUseCase } from './use-cases/criar-venda.use-case.js';
import { CreateVendaDto } from './dto/create-venda.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { Request as ExpressRequest } from 'express';
import { BuscarVendaPorIdUseCase } from './use-cases/buscar-venda-por-id.use-case.js';
import { BuscarVendasPorVendedorIdUseCase } from './use-cases/buscar-vendas-por-vendedor-id.use-case.js';


@Controller('vendas')
export class VendaController {
  constructor(
    private readonly criarVendaUseCase: CriarVendaUseCase,
    private readonly buscaVendaPorIdUseCase: BuscarVendaPorIdUseCase,
    private readonly buscarVendasPorVendedorIdUseCase: BuscarVendasPorVendedorIdUseCase

  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createVendaDto: CreateVendaDto,
    @Request() req: ExpressRequest
 ) {
    return this.criarVendaUseCase.executar(createVendaDto, req.user!.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: ExpressRequest) {
    return this.buscarVendasPorVendedorIdUseCase.executar(req.user!.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.buscaVendaPorIdUseCase.executar(id, req.user!.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
  //   return this.vendaService.update(+id, updateVendaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vendaService.remove(+id);
  // }
}
