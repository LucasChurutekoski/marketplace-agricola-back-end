import { IsNotEmpty } from "class-validator";

export class CreateCategoriaDto {
    @IsNotEmpty()
    nome!: string;

    @IsNotEmpty()
    descricao!: string;

    @IsNotEmpty()
    ativo: boolean;
}
