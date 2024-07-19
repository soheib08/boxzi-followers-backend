import { Injectable } from '@nestjs/common';
import { FollowersRepository } from '../followers.repository';

@Injectable()
export class DailyFollowersService {
  constructor(private followersRepository: FollowersRepository) {}

  async execute(userId1: number): Promise<number> {
    return await this.followersRepository.getNewFollowersInLast24Hours(userId1);
  }
}
