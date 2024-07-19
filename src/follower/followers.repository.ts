import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Follower } from './domain/follower.entity';
import { User } from 'src/users/domain/user.entity';
import { UsersRepository } from 'src/users/user.repository';

@Injectable()
export class FollowersRepository {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
    private userService: UsersRepository,
  ) {}

  async follow(followerId: number, followeeId: number): Promise<Follower> {
    const foundFollower = await this.userService.findOne(followerId);
    const foundFollowee = await this.userService.findOne(followeeId);
    if (!foundFollower || !foundFollowee)
      throw new NotFoundException('User not found');

    if (foundFollower.id === foundFollowee.id)
      throw new BadRequestException('Cannot follow yourself');

    const existingFollower = await this.followersRepository.findOne({
      where: { follower: foundFollower, followee: foundFollowee },
    });
    if (existingFollower) throw new BadRequestException('Already following');

    const follower = this.followersRepository.create({
      follower: foundFollower,
      followee: foundFollowee,
    });
    return await this.followersRepository.save(follower);
  }

  async unfollow(followerId: number, followeeId: number): Promise<void> {
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

  async getMutualFollowers(
    userId1: number,
    userId2: number,
  ): Promise<Follower[]> {
    const user1Followers = await this.followersRepository.find({
      where: { followee: { id: userId1 } },
      relations: ['follower', 'followee'],
    });
    const user2Followers = await this.followersRepository.find({
      where: { followee: { id: userId2 } },
      relations: ['follower', 'followee'],
    });

    const mutualFollowers = user1Followers.filter((f1) =>
      user2Followers.some((f2) => f2.follower.id === f1.follower.id),
    );
    return mutualFollowers;
  }

  async getNewFollowersInLast24Hours(userId: number): Promise<number> {
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    return this.followersRepository.count({
      where: {
        followee: { id: userId },
        createdAt: MoreThan(last24Hours),
      },
    });
  }
}
