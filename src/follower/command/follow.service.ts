import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from '../domain/follower.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/users/user.repository';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
    private userService: UsersRepository,
  ) {}

  async execute(followerId: number, followeeId: number): Promise<Follower> {
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
}
