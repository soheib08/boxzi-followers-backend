import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { UsersController } from './users.controller';
import { User } from './domain/user.entity';
import { CreateUserService } from './command/createUser.service';
import { UsersListService } from './query/userList.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersRepository, CreateUserService, UsersListService],
  exports: [UsersRepository],
})
export class UsersModule {}
