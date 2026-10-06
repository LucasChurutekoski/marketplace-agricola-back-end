import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEnderecoDto {
    
    @IsOptional()
    @IsString()
    cep!: string;

    @IsString()
    uf!: string;

    @IsString()
    cidade!: string;

    @IsString()
    bairro!: string;

    @IsString()
    rua!: string;

    @IsString()
    numero!: string;

    @IsNumber()
    latitude!: number;

    @IsNumber()
    longitude!: number;

    @IsBoolean()
    ativo!: boolean;
}
