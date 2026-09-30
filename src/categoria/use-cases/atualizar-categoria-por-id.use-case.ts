import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity.js";
import { Repository } from "typeorm";
import { UpdateCategoriaDto } from "../dto/update-categoria.dto.js";

@Injectable()
export class AtualizarCategoriaPorIdUseCase{
    constructor(@InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>) {}

    async executar(id: string, dto: UpdateCategoriaDto){
        const categoria = await this.categoriaRepository.findOneBy({id: id});
        if(!categoria){
            throw new NotFoundException("Categoria não encontrada");
        }
        Object.assign(categoria, dto);

        await this.categoriaRepository.save(categoria);
        return "categoria atualizada com sucesso"
    }
}