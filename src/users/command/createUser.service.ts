import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../user.repository';
import { CreateUserDto } from '../domain/user.dto';

@Injectable()
export class CreateUserService {
  constructor(public readonly usersService: UsersRepository) {}

  async execute(body: CreateUserDto) {
    const foundUser = await this.usersService.findOneByUsername(body.username);
    if (!foundUser) throw new NotFoundException('User not found');

    return await this.usersService.create(body.username);
  }
}
