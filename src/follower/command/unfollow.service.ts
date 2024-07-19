import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from '../domain/follower.entity';
import { UsersRepository } from 'src/users/user.repository';

@Injectable()
export class UnFollowService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
    private userService: UsersRepository,
  ) {}

  async execute(followerId: number, followeeId: number): Promise<void> {
    if (followerId === followeeId)
      throw new BadRequestException('Cannot unfollow yourself');

    const follower = await this.userService.findOne(followerId);
    const followee = await this.userService.findOne(followeeId);

    if (!follower || !followee) throw new NotFoundException('User not found');

    const followToDelete = await this.followersRepository.findOne({
      where: { follower, followee },
    });
    if (!followToDelete) return;

    await this.followersRepository.remove(followToDelete);
  }
}
