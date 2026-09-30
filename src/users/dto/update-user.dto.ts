import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-usuario.dto.js';
import { tipoUsuarioEnum } from '../enum/userRole.enum.js';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    nome?: string | undefined; 
    email?: string | undefined;
    telefone?: string | undefined;
    @IsOptional()
    @IsEnum(tipoUsuarioEnum)
    tipoUsuario?: tipoUsuarioEnum
}
 