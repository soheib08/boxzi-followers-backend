import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../user.service';
import { CreateUserDto } from '../domain/user.dto';

@Injectable()
export class CreateUserService {
  constructor(public readonly usersService: UsersRepository) {}

  async execute(body: CreateUserDto) {
    const foundUser = await this.usersService.findOneByUsername(body.username);
    if (foundUser) throw new BadRequestException('User already exists');

    return await this.usersService.create(body.username);
  }
}
