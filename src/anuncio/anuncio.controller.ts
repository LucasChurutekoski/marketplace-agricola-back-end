import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto.js';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto.js';

@Controller('anuncios')
export class AnuncioController {
  constructor() {}

  // @Post()
  // create(@Body() createAnuncioDto: CreateAnuncioDto) {
  //   return this.anuncioService.create(createAnuncioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.anuncioService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.anuncioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
  //   return this.anuncioService.update(+id, updateAnuncioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.anuncioService.remove(+id);
  // }
}
