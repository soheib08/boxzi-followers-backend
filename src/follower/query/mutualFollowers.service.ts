import { Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';
import { FollowersRepository } from '../followers.repository';

@Injectable()
export class MutualFollowersService {
  constructor(private followersRepository: FollowersRepository) {}

  async execute(
    userId1: number,
    userId2,
  ): Promise<{ id: number; username: string }[]> {
    const followers = await this.followersRepository.getMutualFollowers(
      userId1,
      userId2,
    );
    return followers.map((f) => {
      return { username: f.follower.username, id: f.follower.id };
    });
  }
}
