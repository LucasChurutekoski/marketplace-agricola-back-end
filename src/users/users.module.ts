import { Module } from '@nestjs/common';

// import { UsersController } from './controllers/users.controller';
// import { CreateUserUseCase } from './use-cases/create-user.use-case';
// import { UsersRepository } from './repositories/users.repository';

@Module({
  controllers: [
    // UsersController
  ],

  providers: [
    // UsersRepository,
    // CreateUserUseCase,
  ],

  exports: [
    // UsersRepository,
  ],
})
export class UsersModule {}