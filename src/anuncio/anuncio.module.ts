import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service.js';
import { AnuncioController } from './anuncio.controller.js';

@Module({
  controllers: [AnuncioController],
  providers: [AnuncioService],
})
export class AnuncioModule {}
