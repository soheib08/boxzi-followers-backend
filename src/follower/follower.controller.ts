import { Controller, Post, Body, Delete, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FollowDto } from './domain/follow.dto';
import { FollowService } from './command/follow.service';
import { UnFollowService } from './command/unfollow.service';
import { MutualFollowersService } from './query/mutualFollowers.service';
import { DailyFollowersService } from './query/dailyFollowers.service';

@Controller('followers')
@ApiTags('users')
export class FollowersController {
  constructor(
    private readonly followService: FollowService,
    private readonly unfollowService: UnFollowService,
    private readonly mutualService: MutualFollowersService,
    private readonly dailyService: DailyFollowersService,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Follow a user',
    summary: 'Follow a user',
  })
  async follow(@Body() body: FollowDto) {
    return this.followService.execute(body.followerId, body.followeeId);
  }

  @Delete()
  @ApiOperation({
    description: 'Unfollow a user',
    summary: 'Unfollow a user',
  })
  async unfollow(@Body() body: FollowDto) {
    return this.unfollowService.execute(body.followerId, body.followeeId);
  }

  @Get('mutual')
  @ApiOperation({
    description: 'Get mutual followers',
    summary: 'Get mutual followers',
  })
  async getMutualFollowers(
    @Query('userId1') userId1: number,
    @Query('userId2') userId2: number,
  ) {
    return this.mutualService.execute(userId1, userId2);
  }

  @Get('daily')
  @ApiOperation({
    description: 'Get daily followers',
    summary: 'Get daily followers',
  })
  async getDailyFollowers(@Query('userId') userId: number) {
    return this.dailyService.execute(userId);
  }
}
