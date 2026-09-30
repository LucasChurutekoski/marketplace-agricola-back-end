import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { tipoUsuarioEnum } from './enum/userRole.enum.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async criar(createUserDto: CreateUserDto) {

    const usuarioExistente = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    
    if (usuarioExistente) {
      throw new ConflictException('Usuário já existe');
    }
    
    const senhaHash = await bcrypt.hash(createUserDto.senha, 10);

    const usuario = await this.userRepository.create({
      nome: createUserDto.nome,
      email: createUserDto.email,
      telefone: createUserDto.telefone,
      senha: senhaHash,
      tipoUsuario: createUserDto.tipoUsuario
    });
    return await this.userRepository.save(usuario);
  }

  async findAll() {
    const todosUsuarios = await this.userRepository.find()
    return todosUsuarios;
  }

  async buscarPorId(id: string) {
    const usuarioExiste = await this.userRepository.findOneBy({id: id})
    if(!usuarioExiste){
      throw new NotFoundException("Usuário não encontrado")
    }
    return usuarioExiste;
  }

  async atualizar(id: string, dto: UpdateUserDto) {
    const usuarioExiste = await this.userRepository.findBy({id: id})

    if (!usuarioExiste){
      throw new NotFoundException('Usuário não encontrado')
    }

    const usuarioAtualizado = await this.userRepository.update({ id: id}, {
      nome: dto.nome,
      email: dto.email,
      telefone: dto.telefone,
      tipoUsuario: dto.tipoUsuario
    })

    return "Usuário atualizado com sucesso";
  }

  async desativar(id: string) {
    const usuario = await this.userRepository.findOneBy({id: id})

    if (!usuario){
      throw new NotFoundException("Usuário não encontrado")
    }
    usuario.ativo = false;
    usuario.atualizadoEm = new Date();
    await this.userRepository.save(usuario);
    return 'Usuário desativado com sucesso';
  }

  async buscarTodosVendedores(){
    return await this.userRepository.find({where: {tipoUsuario : tipoUsuarioEnum.VENDEDOR} });
  }
}
