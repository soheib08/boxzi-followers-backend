import { User } from './user.entity';

export interface IUsersService {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  create(username: string): Promise<User>;
}
