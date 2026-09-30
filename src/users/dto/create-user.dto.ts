import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { tipoUsuarioEnum } from "../enum/userRole.enum.js";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    telefone!: string;

    @IsNotEmpty()
    senha!: string;

    @IsOptional()
    @IsEnum(tipoUsuarioEnum)
    tipoUsuario: tipoUsuarioEnum;

}
