import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

// import { CreateUserDto } from '../dto/create-user.dto';
// // import { CreateUserUseCase } from '../use-cases/create-user.use-case';

// @Controller('users')
// export class UsersController {
//   constructor(
//     private readonly createUserUseCase: CreateUserUseCase,
//   ) {}

//   @Post()
//   async create(@Body() data: CreateUserDto) {
//     return this.createUserUseCase.execute(data);
//   }
// }