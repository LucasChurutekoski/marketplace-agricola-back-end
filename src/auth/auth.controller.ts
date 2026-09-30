import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto.js';
import { LoginUseCase } from './use-cases/login-use-case.js';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.executar(dto);
    }
}