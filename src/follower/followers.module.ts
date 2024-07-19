import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './domain/follower.entity';
import { FollowersRepository } from './followers.repository';
import { FollowersController } from './follower.controller';
import { UsersModule } from 'src/users/users.module';
import { DailyFollowersService } from './query/dailyFollowers.service';
import { MutualFollowersService } from './query/mutualFollowers.service';
import { FollowService } from './command/follow.service';
import { UnFollowService } from './command/unfollow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follower]), UsersModule],
  controllers: [FollowersController],
  providers: [
    FollowersRepository,
    DailyFollowersService,
    MutualFollowersService,
    FollowService,
    UnFollowService,
  ],
})
export class FollowersModule {}
