import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { StatusVendaEnum } from "../enum/StatusVendaEnum.js";

export class CreateVendaDto {

    @IsUUID()
    anuncioId!: string;

    @IsNumber()
    quantidade!: number;

    @IsOptional()
    compradorId!: string;

    @IsEnum(StatusVendaEnum)
    status!: StatusVendaEnum;
    
}
