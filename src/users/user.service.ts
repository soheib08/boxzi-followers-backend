import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './domain/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(username: string): Promise<User> {
    const user = this.usersRepository.create({
      username,
      followers: [],
      following: [],
    });
    return this.usersRepository.save(user);
  }
}
