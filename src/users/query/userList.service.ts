import { Injectable } from '@nestjs/common';
import { UserDto } from '../domain/user.dto';
import { UsersRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersListService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async execute(): Promise<Array<UserDto>> {
    const users = await this.usersRepository.find({
      relations: [
        'followers',
        'followers.follower',
        'following',
        'following.followee',
      ],
    });

    return users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        followers: user.followers.map((follower) => {
          return {
            username: follower.follower.username,
            id: follower.follower.id,
          };
        }),
        followings: user.following.map((follower) => {
          return {
            username: follower.followee.username,
            id: follower.followee.id,
          };
        }),
      };
    });
  }
}
