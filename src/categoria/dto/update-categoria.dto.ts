import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCategoriaDto {

    @IsOptional()
    @IsString()
    nome?: string;
    
    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}