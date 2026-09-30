import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.criar(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/vendedores')
  buscaTodosVendedores(){
    return this.usersService.buscarTodosVendedores();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string){
    return this.usersService.buscarPorId(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({
    exceptionFactory: (errors) => new BadRequestException("O id informado não é valido")
  })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.atualizar(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.desativar(id);
  }
}
