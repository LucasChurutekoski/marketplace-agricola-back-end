import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { userRole } from "../enum/userRole.enum.js";

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

    @IsNotEmpty()
    @IsEnum(userRole)
    role: userRole

    
}
