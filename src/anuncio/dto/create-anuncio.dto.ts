import { IsEnum, IsNumber, IsString } from "class-validator";
import { UnidadeMedidaEnum } from "../enums/UnidadeMedidaEnum.js";
import { StatusAnuncioEnum } from "../enums/StatusAnuncioEnum.js";

export class CreateAnuncioDto {
    @IsString()
    titulo!: string;

    @IsString()
    descricao!: string;

    @IsNumber()
    quantidadeDisponivel!: number;

    @IsEnum(UnidadeMedidaEnum)
    unidadeMedida!: UnidadeMedidaEnum;

    @IsNumber()
    valorUnitario!: number;

    @IsEnum(StatusAnuncioEnum)
    status!: StatusAnuncioEnum;

    @IsString()
    categoriaId!: string;
}
