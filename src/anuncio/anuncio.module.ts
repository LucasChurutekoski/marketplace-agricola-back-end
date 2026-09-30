import { Module } from '@nestjs/common';
import { AnuncioController } from './anuncio.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from './entities/anuncio.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnuncioController],
  providers: [],
})
export class AnuncioModule {}
