import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Anuncio } from "../entities/anuncio.entity.js";
import { Repository } from "typeorm";
import { CreateAnuncioDto } from "../dto/create-anuncio.dto.js";
import { BuscarUsuarioPorIdUseCase } from "../../users/use-cases/buscar-usuario-por-id.use-case.js";
import { tipoUsuarioEnum } from "../../users/enum/userRole.enum.js";

@Injectable()
export class CriarAnuncioUseCase{
    constructor(@InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>){}

    async executar(dto: CreateAnuncioDto, usuarioId: string, tipoUsuario: string){
        if(tipoUsuario !== tipoUsuarioEnum.VENDEDOR){
            throw new ForbiddenException("Apenas agricultores podem vender na plataforma");
        }
        const anuncio =  await this.anuncioRepository.create({
            titulo: dto.titulo,
            descricao: dto.descricao,
            quantidade: dto.quantidadeDisponivel,
            quantidadeDisponivel: dto.quantidadeDisponivel,
            valorUnitario: dto.valorUnitario,
            unidadeMedida: dto.unidadeMedida,
            status: dto.status,
            usuario: {id: usuarioId},
            categoria: {id: dto.categoriaId}
        })

        return await this.anuncioRepository.save(anuncio);
    }
}